import React from 'react';
import HomeScreen from './home/home';
import Login from '../(auth)/login';
import { useAuth } from '../context/auth-context';
import { AuthProvider } from '../context/auth-context';

const HomePage: React.FC = () => {

  return (
    <AuthProvider>
      <HomeScreen />
    </AuthProvider>
  );
};

export default HomePage;