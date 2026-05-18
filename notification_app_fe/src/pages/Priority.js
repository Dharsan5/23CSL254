import React, { useState, useEffect } from 'react';
import { fetchNotifications } from '../api';
import NotificationList from '../components/NotificationList';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem, TextField, CircularProgress } from '@mui/material';

const priorityMap = { 'Placement': 3, 'Result': 2, 'Event': 1 };

export default function Priority() {
  const [notifications, setNotifications] = useState([]);
  const [limit, setLimit] = useState(10);
  const [filterType, setFilterType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPriorityNotifs();
  }, [limit, filterType]);

  const loadPriorityNotifs = async () => {
    setLoading(true);
    const params = {};
    if (filterType) {
      params.notification_type = filterType;
    }
    
    const data = await fetchNotifications(params);
    
    const sorted = data.sort((a, b) => {
      const wA = priorityMap[a.Type] || 0;
      const wB = priorityMap[b.Type] || 0;
      if (wA !== wB) return wB - wA;
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    }).slice(0, Math.max(1, limit));

    setNotifications(sorted);
    setLoading(false);
  };

  return (
    <Box>
      <Typography variant="h5" mb={3} fontWeight="bold">Priority Inbox</Typography>
      
      <Box display="flex" gap={2} mb={3} alignItems="center" flexWrap="wrap">
        <TextField 
          label="Top 'n' Limit" 
          type="number" 
          value={limit} 
          onChange={(e) => setLimit(Number(e.target.value))} 
          size="small"
          InputProps={{ inputProps: { min: 1, max: 100 } }}
          sx={{ width: 120 }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Type Filter</InputLabel>
          <Select 
            value={filterType} 
            label="Type Filter"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value=""><em>All Types</em></MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>
      ) : (
        <NotificationList notifications={notifications} />
      )}
    </Box>
  );
}