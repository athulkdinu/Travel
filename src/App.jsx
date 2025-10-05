import { useState, useEffect, useMemo } from 'react';
import {
  Container, Grid, Box, Fab, Typography, Paper,
  ThemeProvider, createTheme, CssBaseline
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TripCard from './components/TripCard';
import TripForm from './components/TripForm';
import FilterBar from './components/FilterBar';
import TripGalleryModal from './components/TripGalleryModal';

// Theme setup
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#ff9800' },
    background: { default: '#f5f5f5', paper: '#fff' },
  },
  typography: { fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' },
  shape: { borderRadius: 12 },
});

function App() {
  // State
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  // Load trips from localStorage
  useEffect(() => {
    const savedTrips = localStorage.getItem('vehicleTrips');
    if (savedTrips) setTrips(JSON.parse(savedTrips));
  }, []);

  // Save trips to localStorage
  useEffect(() => localStorage.setItem('vehicleTrips', JSON.stringify(trips)), [trips]);

  // Filter & sort trips
  useEffect(() => {
    let result = [...trips];

    if (searchTerm) {
      result = result.filter(t =>
        t.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.vehicleType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') result = result.filter(t => t.vehicleType === filterType);

    result.sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'distance') return b.distance - a.distance;
      if (sortBy === 'favorites') return b.isFavorite - a.isFavorite;
      return 0;
    });

    setFilteredTrips(result);
  }, [trips, searchTerm, filterType, sortBy]);

  // Trip operations
  const addTrip = tripData => {
    setTrips([{ id: Date.now().toString(), ...tripData, images: [], highlightImage: 0, isFavorite: false, createdAt: new Date().toISOString() }, ...trips]);
    setShowModal(false);
  };

  const updateTrip = tripData => {
    setTrips(trips.map(t => t.id === editingTrip.id ? { ...t, ...tripData } : t));
    setEditingTrip(null);
    setShowModal(false);
  };

  const deleteTrip = tripId => setTrips(trips.filter(t => t.id !== tripId));
  const toggleFavorite = tripId => setTrips(trips.map(t => t.id === tripId ? { ...t, isFavorite: !t.isFavorite } : t));

  const openAddModal = () => { setEditingTrip(null); setShowModal(true); };
  const openEditModal = trip => { setEditingTrip(trip); setShowModal(true); };
  const openGalleryModal = trip => { setSelectedTrip(trip); setGalleryOpen(true); };

  // Stats
  const stats = useMemo(() => {
    const total = trips.length;
    const totalDistance = trips.reduce((sum, t) => sum + Number(t.distance || 0), 0);
    const favorites = trips.filter(t => t.isFavorite).length;
    const byType = trips.reduce((acc, t) => ({ ...acc, [t.vehicleType]: (acc[t.vehicleType] || 0) + 1 }), {});
    return { total, totalDistance, favorites, byType };
  }, [trips]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e3f2fd 0%, #fff3e0 50%, #e8f5e9 100%)', backgroundAttachment: 'fixed' }}>
        <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <Box sx={{ display: 'flex', gap: 3, px: 3, py: 4 }}>
          {/* Main Content */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: '#1565c0' }}>Your Trips</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.125rem', mb: 3 }}>Track and manage your vehicle journeys with ease</Typography>

            <FilterBar
              searchTerm={searchTerm} setSearchTerm={setSearchTerm}
              filterType={filterType} setFilterType={setFilterType}
              sortBy={sortBy} setSortBy={setSortBy}
            />

            <Grid container spacing={3} sx={{ mt: 2 }}>
              {filteredTrips.map(trip => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={trip.id}>
                  <TripCard
                    trip={trip}
                    onEdit={() => openEditModal(trip)}
                    onDelete={() => deleteTrip(trip.id)}
                    onToggleFavorite={() => toggleFavorite(trip.id)}
                    onOpenGallery={() => openGalleryModal(trip)}
                  />
                </Grid>
              ))}
            </Grid>

            {filteredTrips.length === 0 && (
              <Paper elevation={0} sx={{ textAlign: 'center', py: 8, mt: 4, backgroundColor: 'transparent' }}>
                <Typography variant="h1" sx={{ fontSize: '4rem', mb: 2 }}>🚗</Typography>
                <Typography variant="h5" sx={{ mb: 1, color: 'text.secondary' }}>
                  {trips.length === 0 ? 'No trips yet' : 'No trips match your filters'}
                </Typography>
              </Paper>
            )}
          </Box>

          {/* Stats Sidebar */}
          <Box sx={{ width: 300, display: { xs: 'none', lg: 'block' }, position: 'sticky', top: 20, height: 'fit-content' }}>
            <Paper elevation={3} sx={{ p: 3, background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)', color: 'white', borderRadius: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}>📊 Trip Statistics</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>Total Trips</Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}>{stats.total}</Typography>

              <Typography variant="body2" sx={{ opacity: 0.9 }}>Total Distance</Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, textAlign: 'center' }}>{stats.totalDistance}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, textAlign: 'center' }}>kilometers</Typography>

              <Typography variant="body2" sx={{ opacity: 0.9, mt: 2 }}>⭐ Favorites</Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, textAlign: 'center' }}>{stats.favorites}</Typography>
            </Paper>

            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1565c0' }}>🚗 Vehicle Types</Typography>
              {Object.entries(stats.byType).length > 0 ? Object.entries(stats.byType).map(([type, count]) => (
                <Box key={type} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, p: 1.5, borderRadius: 2, bgcolor: '#e3f2fd' }}>
                  <Typography sx={{ textTransform: 'capitalize', fontWeight: 500 }}>{type}</Typography>
                  <Typography sx={{ fontWeight: 700, color: '#1976d2' }}>{count}</Typography>
                </Box>
              )) : <Typography variant="body2" color="text.secondary">No trips recorded yet</Typography>}
            </Paper>
          </Box>
        </Box>

        {/* Add Trip Button */}
        <Fab
          color="primary" onClick={openAddModal}
          sx={{
            position: 'fixed', bottom: 32, right: 32, zIndex: 1000,
            width: 64, height: 64,
            background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
            boxShadow: '0 8px 24px rgba(25,118,210,0.4)',
            '&:hover': { background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)', transform: 'scale(1.1) rotate(90deg)', boxShadow: '0 12px 32px rgba(25,118,210,0.6)' },
            transition: 'all 0.3s ease'
          }}
        >
          <AddIcon sx={{ fontSize: 32 }} />
        </Fab>

        {/* Modals */}
        {showModal && <TripForm trip={editingTrip} onSave={editingTrip ? updateTrip : addTrip} onClose={() => { setShowModal(false); setEditingTrip(null); }} />}
        {galleryOpen && selectedTrip && <TripGalleryModal trip={selectedTrip} onClose={() => setGalleryOpen(false)} onUpdateTrip={updatedTrip => setTrips(trips.map(t => t.id === updatedTrip.id ? updatedTrip : t))} />}
      </Box>
    </ThemeProvider>
  );
}

export default App;
