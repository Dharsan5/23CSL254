import React, { useState } from 'react';
import { Card, CardContent, Typography, Chip, Box, Badge } from '@mui/material';
import { Log } from 'logging_middleware';

export default function NotificationList({ notifications }) {
  const [viewedIds, setViewedIds] = useState(() => {
    return JSON.parse(localStorage.getItem('viewedNotifs') || '[]');
  });

  const markAsViewed = (id) => {
    if (!viewedIds.includes(id)) {
      const updated = [...viewedIds, id];
      setViewedIds(updated);
      localStorage.setItem('viewedNotifs', JSON.stringify(updated));
      
      const token = localStorage.getItem("access_token") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkaGFyc2Fuc3AuMjNjc2VAa29uZ3UuZWR1IiwiZXhwIjoxNzc5MDgzOTEyLCJpYXQiOjE3NzkwODMwMTIsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI2M2RmYjFmMC0yZWNhLTQxOWMtOTk4MS1kY2EyYWQ3YTgxOTciLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJkaGFyc2FuX3NwIiwic3ViIjoiZjM5MmZjZTQtZDI3OC00NTUwLTk5NTUtMGQ4OWQ0YTcwNDlmIn0sImVtYWlsIjoiZGhhcnNhbnNwLjIzY3NlQGtvbmd1LmVkdSIsIm5hbWUiOiJkaGFyc2FuX3NwIiwicm9sbE5vIjoiMjNjc2wyNTQiLCJhY2Nlc3NDb2RlIjoiUnlaQmN5IiwiY2xpZW50SUQiOiJmMzkyZmNlNC1kMjc4LTQ1NTAtOTk1NS0wZDg5ZDRhNzA0OWYiLCJjbGllbnRTZWNyZXQiOiJBdG1DWHlVSFNlV25xa3VxIn0.PxEkuoMGeB8hkSe7LEiaUjGZr1EMu4juGt-6MqW-OsU";
      Log("frontend", "info", "component", `Notification ${id} marked as viewed`, token);
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'Placement': return 'success';
      case 'Result': return 'info';
      case 'Event': return 'warning';
      default: return 'default';
    }
  };

  if (!notifications || notifications.length === 0) {
    return <Typography color="textSecondary" align="center" mt={4}>No notifications to display.</Typography>;
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {notifications.map((notif, index) => {
        const isNew = !viewedIds.includes(notif.ID);
        return (
          <Card 
            key={`${notif.ID}-${index}`}
            onMouseEnter={() => markAsViewed(notif.ID)}
            onClick={() => markAsViewed(notif.ID)}
            sx={{ 
              borderLeft: isNew ? '4px solid #1976d2' : '4px solid transparent',
              opacity: isNew ? 1 : 0.7,
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              '&:hover': { backgroundColor: 'action.hover' }
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Chip label={notif.Type} color={getColor(notif.Type)} size="small" />
                  {isNew && <Badge color="primary" variant="dot" sx={{ ml: 1 }} />}
                </Box>
                <Typography variant="caption" color="textSecondary">
                  {notif.Timestamp}
                </Typography>
              </Box>
              <Typography variant="body1">
                {notif.Message}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}