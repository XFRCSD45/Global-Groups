import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './components/Auth/Login';
import UserList from './components/Users/UserList';
import UserEdit from './components/Users/UserEdit';
import { Toaster } from 'react-hot-toast';

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen w-5/6 bg-gray-700 mx-auto">
          <Toaster position="top-right" reverseOrder={false} />
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <UserList />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <PrivateRoute>
                  <UserEdit />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
