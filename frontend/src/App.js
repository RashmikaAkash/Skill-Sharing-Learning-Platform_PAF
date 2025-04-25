import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ProfileView from './pages/ProfileView';
import UserForm from './pages/UserForm';
import SkillsPage from './pages/SkillsPage';
import SkillSharingPlatform from './pages/SkillSharingPlatform';
import './App.css';

const App = () => {
    const isAuthenticated = !!localStorage.getItem('userEmail');

    return (
        <Router>
            <Routes>
                <Route 
                    path="/login" 
                    element={
                        isAuthenticated ? 
                            <Navigate to="/" replace /> : 
                            <UserForm />
                    } 
                />
                
                {/* Protected Routes */}
                <Route
                    path="/*"
                    element={
                        isAuthenticated ? (
                            <Layout>
                                <Routes>
                                    <Route path="/" element={<SkillSharingPlatform />} />
                                    <Route path="/profile" element={<ProfileView />} />
                                    <Route path="/skills" element={<SkillsPage />} />
                                    {/* Add more routes here */}
                                </Routes>
                            </Layout>
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
