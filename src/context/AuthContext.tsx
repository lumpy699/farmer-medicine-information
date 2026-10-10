import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, SearchHistoryItem } from '../types';
import { INITIAL_USERS } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (identifier: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (farmerData: Omit<User, 'id' | 'role' | 'createdAt'>) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  switchToFarmerDemo: () => void;
  switchToAdminDemo: () => void;
  searchHistory: SearchHistoryItem[];
  addSearchHistory: (query: string, cropName: string, diseaseName?: string) => void;
  clearSearchHistory: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Pre-seed with the farmer test account so user enters directly into an authenticated flow if desired,
  // or can switch easily.
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('farmer_app_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_USERS[0];
      }
    }
    return INITIAL_USERS[0]; // Default logged in as Farmer Sadashivrao Patil
  });

  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('farmer_app_all_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_USERS;
      }
    }
    return INITIAL_USERS;
  });

  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>(() => {
    const saved = localStorage.getItem('farmer_app_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [
          {
            id: 'hist-1',
            query: 'कापूस गुलाबी बोंडअळी',
            cropName: 'कापूस',
            diseaseName: 'गुलाबी बोंडअळी',
            timestamp: 'काल दुपारी ३:३०',
          },
          {
            id: 'hist-2',
            query: 'कांदा जांभळा करपा औषध',
            cropName: 'कांदा',
            diseaseName: 'जांभळा करपा',
            timestamp: '३ दिवसांपूर्वी',
          },
        ];
      }
    }
    return [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('farmer_app_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('farmer_app_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('farmer_app_all_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('farmer_app_history', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const login = async (identifier: string, _pass: string): Promise<{ success: boolean; error?: string }> => {
    // In our client system, identify by mobile or email
    const trimmed = identifier.trim().toLowerCase();
    const found = allUsers.find(
      u => u.mobile === trimmed || u.email.toLowerCase() === trimmed
    );

    if (found) {
      setUser(found);
      return { success: true };
    }

    // Allow flexible test login if user enters demo credentials
    if (trimmed.includes('admin') || trimmed === '9422001122') {
      setUser(INITIAL_USERS[1]);
      return { success: true };
    }

    // If generic mobile provided, log in as farmer
    if (trimmed.length >= 10) {
      const demoFarmer: User = {
        ...INITIAL_USERS[0],
        mobile: trimmed,
      };
      setUser(demoFarmer);
      return { success: true };
    }

    return { success: false, error: 'मोबाईल क्रमांक किंवा ईमेल जुळत नाही. कृपया तपासा.' };
  };

  const register = async (farmerData: Omit<User, 'id' | 'role' | 'createdAt'>): Promise<{ success: boolean; error?: string }> => {
    if (!farmerData.name || !farmerData.mobile) {
      return { success: false, error: 'कृपया नाव आणि मोबाईल क्रमांक भरा.' };
    }

    const newUser: User = {
      ...farmerData,
      id: `user-${Date.now()}`,
      role: 'FARMER',
      createdAt: new Date().toISOString().split('T')[0],
      primaryCrops: farmerData.primaryCrops || ['crop-cotton', 'crop-onion'],
    };

    setAllUsers(prev => [newUser, ...prev]);
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    setAllUsers(prev => prev.map(u => (u.id === user.id ? updated : u)));
  };

  const switchToFarmerDemo = () => {
    setUser(INITIAL_USERS[0]);
  };

  const switchToAdminDemo = () => {
    setUser(INITIAL_USERS[1]);
  };

  const addSearchHistory = (query: string, cropName: string, diseaseName?: string) => {
    const newItem: SearchHistoryItem = {
      id: `hist-${Date.now()}`,
      query,
      cropName,
      diseaseName,
      timestamp: 'आत्ताच',
    };
    setSearchHistory(prev => [newItem, ...prev.filter(h => h.query !== query).slice(0, 7)]);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        switchToFarmerDemo,
        switchToAdminDemo,
        searchHistory,
        addSearchHistory,
        clearSearchHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
