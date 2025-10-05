# Vehicle Trip / Road Adventure Tracker

A complete React application for tracking vehicle trips and road adventures with full CRUD functionality, filtering, sorting, and search capabilities. Built with Material UI for a modern, professional interface.

## Features

### 🚗 Trip Management
- **Add Trips**: Create new trips with vehicle type, route, distance, date, notes, and images
- **Edit Trips**: Update existing trip details through a modal dialog
- **Delete Trips**: Remove trips with confirmation
- **View Trips**: Display trips in an attractive card layout with hover effects

### 🔍 Search & Filter
- **Search**: Find trips by route or vehicle name with real-time filtering
- **Filter**: Filter by vehicle type (Car, Bike, Truck, Motorcycle, Other)
- **Sort**: Sort by date, distance, or favorites

### ❤️ Favorites
- **Favorite Toggle**: Mark trips as favorites with a heart icon
- **Favorite Sorting**: Sort trips to show favorites first

### 🖼️ Image Support
- **Image URLs**: Add images via URL with live preview
- **Default Icons**: Automatic vehicle icons when no image is provided
- **Image Fallback**: Graceful handling of broken image links

### 🎨 UI/UX Features
- **Material Design**: Modern, professional interface using Material UI
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Dialog Forms**: Intuitive modal dialogs for add/edit operations
- **Floating Action Button**: Easy access to add new trips
- **Card Layout**: Beautiful trip cards with elevation and shadows

## Tech Stack

- **React 19** - Modern React with hooks
- **Material UI (MUI)** - Professional component library
- **Emotion** - CSS-in-JS styling
- **Local Storage** - Data persistence
- **Vite** - Fast build tool and dev server

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to `https://travel-ten-roan.vercel.app/`

## Usage

1. **Add Your First Trip**
   - Click the floating "+" button (bottom right)
   - Fill in trip details (route, distance, date are required)
   - Optionally add an image URL or notes
   - Click "Add Trip"

2. **Manage Your Trips**
   - Use the search bar to find specific trips
   - Filter by vehicle type using the dropdown
   - Sort by date, distance, or favorites
   - Click the heart icon to mark trips as favorites
   - Use Edit/Delete buttons on each trip card

3. **Image Support**
   - Paste image URLs in the form
   - Images are previewed in real-time
   - Default vehicle icons are shown when no image is provided

## Material UI Components Used

- **AppBar** - Navigation header
- **Card/CardContent/CardActions** - Trip display cards
- **Dialog** - Modal forms
- **TextField** - Form inputs
- **Select/MenuItem** - Dropdown filters
- **Fab** - Floating action button
- **Chip** - Vehicle type badges
- **Avatar** - Image previews
- **Grid** - Responsive layout
- **Typography** - Text styling

## Data Storage

All trip data is stored locally in your browser's localStorage, so your trips persist between sessions. No backend server is required!

## Features Implemented

✅ Complete CRUD operations  
✅ Search and filtering  
✅ Sorting by multiple criteria  
✅ Favorites system  
✅ Image support with preview  
✅ Responsive Material Design  
✅ Professional UI/UX  
✅ Local storage persistence  
✅ Modal dialogs  
✅ Smooth animations and transitions  
✅ Hover effects and micro-interactions

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation header
│   ├── TripCard.jsx        # Individual trip cards
│   ├── TripForm.jsx        # Add/edit modal dialog
│   └── FilterBar.jsx       # Search and filter controls
├── App.jsx                 # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles
```

The application is now fully functional with Material UI components, providing a modern, professional interface for tracking your vehicle trips and road adventures! 🚗✨