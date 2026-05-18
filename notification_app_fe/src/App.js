import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Home from './pages/Home';
import Priority from './pages/Priority';

const theme = createTheme({
  palette: {
    primary: { main: '#4caf50' }, 
    secondary: { main: '#1976d2' },
    background: { default: '#f4f6f8' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  }
});

function NavLinks() {
  const location = useLocation();
  
  return (
    <>
      <Button 
        color="inherit" 
        component={Link} 
        to="/"
        sx={{ fontWeight: location.pathname === '/' ? 'bold' : 'normal', borderBottom: location.pathname === '/' ? '2px solid white' : 'none' }}
      >
        All Notifications
      </Button>
      <Button 
        color="inherit" 
        component={Link} 
        to="/priority"
        sx={{ ml: 2, fontWeight: location.pathname === '/priority' ? 'bold' : 'normal', borderBottom: location.pathname === '/priority' ? '2px solid white' : 'none' }}
      >
        Priority Inbox
      </Button>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="sticky" elevation={1}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Affordmed Notifications
            </Typography>
            <NavLinks />
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/priority" element={<Priority />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;