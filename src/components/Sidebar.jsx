import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography,
  Box,
  Divider
} from '@mui/material';
import { 
  Home as HomeIcon,
  DirectionsCar as CarIcon,
  Favorite as FavoriteIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
  History as HistoryIcon
} from '@mui/icons-material';

const Sidebar = ({ open, onClose }) => {
  const menuItems = [
    { text: 'Dashboard', icon: <HomeIcon /> },
    { text: 'All Trips', icon: <CarIcon /> },
    { text: 'Favorites', icon: <FavoriteIcon /> },
    { text: 'Analytics', icon: <AnalyticsIcon /> },
    { text: 'History', icon: <HistoryIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
  ];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #1976d2 0%, #1565c0 25%, #ffffff 25%)',
        },
      }}
    >
      <Box sx={{ 
        p: 3,
        background: 'transparent',
        color: 'white'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            border: '2px solid rgba(255,255,255,0.3)'
          }}>
            🚗
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
              Adventure
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Trip Tracker
            </Typography>
          </Box>
        </Box>
      </Box>
      
      <List sx={{ px: 2 }}>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              sx={{
                borderRadius: 2,
                py: 1.5,
                '&:hover': {
                  bgcolor: '#e3f2fd',
                  transform: 'translateX(4px)',
                  '& .MuiListItemIcon-root': {
                    color: '#1976d2'
                  }
                },
                transition: 'all 0.2s'
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: 40,
                color: '#1976d2',
                transition: 'color 0.2s'
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: 600,
                  fontSize: '0.95rem'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ 
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        p: 2,
        borderRadius: 2,
        background: 'linear-gradient(135deg, #e3f2fd 0%, #fff3e0 100%)',
        border: '2px solid #1976d2'
      }}>
        <Typography variant="caption" sx={{ fontWeight: 600, color: '#1565c0', display: 'block', mb: 0.5 }}>
          🎯 Quick Stats
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
          Your adventure awaits!
        </Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar;