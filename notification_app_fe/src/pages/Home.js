import React, { useState, useEffect } from 'react';
import { fetchNotifications } from '../api';
import NotificationList from '../components/NotificationList';
import { Typography, Box, CircularProgress } from '@mui/material';

export default function Home() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifs();
  }, []);

  const loadNotifs = async () => {
    setLoading(true);
    const data = await fetchNotifications();
    setNotifications(data);
    setLoading(false);
  };

  return (
    <Box>
      <Typography variant="h5" mb={3} fontWeight="bold">All Notifications</Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>
      ) : (
        <NotificationList notifications={notifications} />
      )}
    </Box>
  );
}