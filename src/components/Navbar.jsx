import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box,
  IconButton,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  DirectionsCar as CarIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useState } from 'react';

const Navbar = ({ onOpenSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mapOpen, setMapOpen] = useState(false);
  const open = Boolean(anchorEl);
  const handleOpenMenu = (e) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const handleOpenMap = () => setMapOpen(true);
  const handleCloseMap = () => setMapOpen(false);

  return (
    <AppBar 
      position="static" 
      elevation={3}
      sx={{ 
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        borderBottom: '3px solid #ff9800'
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton 
            size="large" 
            edge="start" 
            color="inherit" 
            aria-label="menu" 
            onClick={onOpenSidebar}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5,
            background: 'rgba(255,255,255,0.15)',
            px: 2,
            py: 0.5,
            borderRadius: 3
          }}>
            <CarIcon sx={{ fontSize: 32 }} />
            <Box>
              <Typography variant="h6" component="div" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
                🚗 Adventure Tracker
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.95, fontWeight: 500 }}>
                Track your road adventures
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip 
            label="🗺️ Route Tracking" 
            size="small" 
            onClick={handleOpenMap}
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.2)', 
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.3)',
                transform: 'scale(1.05)'
              },
              transition: 'all 0.2s'
            }} 
          />
          <Chip 
            label="📈 Analytics" 
            size="small" 
            sx={{ 
              bgcolor: 'rgba(255,152,0,0.8)', 
              color: 'white',
              fontWeight: 600
            }} 
          />
          
          <Tooltip title="Notifications">
            <IconButton 
              color="inherit" 
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
              }}
            >
              <NotificationsIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Profile">
            <IconButton color="inherit" onClick={handleOpenMenu}>
              <Avatar sx={{ width: 36, height: 36, bgcolor: '#ff9800', fontWeight: 700 }}>VT</Avatar>
            </IconButton>
          </Tooltip>
          
          <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
            <MenuItem onClick={handleCloseMenu}>
              <PersonIcon sx={{ mr: 1 }} fontSize="small" />
              Profile
            </MenuItem>
            <MenuItem onClick={handleCloseMenu}>
              <SettingsIcon sx={{ mr: 1 }} fontSize="small" />
              Settings
            </MenuItem>
            <MenuItem onClick={handleCloseMenu}>
              <LogoutIcon sx={{ mr: 1 }} fontSize="small" />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>

      {/* Google Maps Modal */}
      <Dialog 
        open={mapOpen} 
        onClose={handleCloseMap}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            minHeight: '80vh'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          color: 'white',
          fontWeight: 700
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            🗺️ Google Maps - Route Tracking
          </Box>
          <IconButton 
            onClick={handleCloseMap}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0, height: '70vh' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373631531654!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sau!4v1234567890123!5m2!1sen!2sau"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, bgcolor: '#f5f5f5' }}>
          <Button 
            onClick={handleCloseMap}
            variant="contained"
            color="primary"
            sx={{ fontWeight: 600 }}
          >
            Close Map
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Navbar;