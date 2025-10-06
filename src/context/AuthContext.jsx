import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

// Seed demo user for testing
const seedDemoUser = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const demoExists = users.find(u => u.email === 'demo@trip.com');
  
  if (!demoExists) {
    const demoUser = {
      id: 'demo-user-001',
      username: 'demo',
      email: 'demo@trip.com',
      password: 'demo123',
      fullName: 'Demo User',
      avatar: null,
      createdAt: new Date().toISOString()
    };
    users.push(demoUser);
    localStorage.setItem('users', JSON.stringify(users));
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    // Seed demo user
    seedDemoUser();
    
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Register new user
  const register = (userData) => {
    const { username, email, password, fullName } = userData;

    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if user already exists
    const existingUser = users.find(u => u.email === email || u.username === username);
    if (existingUser) {
      if (existingUser.email === email) {
        return { success: false, message: 'Email already registered' };
      }
      if (existingUser.username === username) {
        return { success: false, message: 'Username already taken' };
      }
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password, // In production, this should be hashed
      fullName,
      avatar: null,
      createdAt: new Date().toISOString()
    };

    // Save to users array
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Auto login after registration
    const userToStore = { ...newUser };
    delete userToStore.password; // Don't store password in current user
    setUser(userToStore);
    localStorage.setItem('currentUser', JSON.stringify(userToStore));

    return { success: true, message: 'Registration successful' };
  };

  // Login user
  const login = (credentials) => {
    const { emailOrUsername, password } = credentials;

    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Find user
    const foundUser = users.find(u => 
      (u.email === emailOrUsername || u.username === emailOrUsername) && u.password === password
    );

    if (!foundUser) {
      return { success: false, message: 'Invalid credentials' };
    }

    // Set current user
    const userToStore = { ...foundUser };
    delete userToStore.password;
    setUser(userToStore);
    localStorage.setItem('currentUser', JSON.stringify(userToStore));

    return { success: true, message: 'Login successful' };
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  // Update user profile
  const updateProfile = (updates) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, ...updates } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    const updatedUser = { ...user, ...updates };
    delete updatedUser.password;
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

