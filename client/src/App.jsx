// App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Home from './pages/Home';
import Login from './pages/Login';
import Conversations from './pages/Conversations';
import Friends from './pages/Friends';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import AuthService from './utils/auth'; // Adjust the import path

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = AuthService.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = AuthService.getToken();
    console.log('Token:', token);
    if (token && !AuthService.isTokenExpired(token)) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = () => {
    console.log('Fetching user data...');
    try {
      const profile = AuthService.getProfile();
      console.log('User Profile:', profile);
      setUser(profile);
      setLoading(false);
    } catch (error) {
      // Handle error fetching user data
      console.error('Error fetching user data:', error);
      AuthService.logout(); // Log out the user if an error occurs
      setLoading(false);
    }
  };

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Routes>
            <Route
              path="/"
              element={user ? <Home user={user} /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login updateUser={setUser} />} />
            <Route path="/conversations" element={<Conversations />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        )}
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
