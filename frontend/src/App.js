
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserForm from "./pages/UserForm";
import SkillSharingPlatform from "./pages/SkillSharingPlatform";
import CourseCard from "./pages/CourseCard";
import Comment from "./pages/Comment";
import Layout from './components/Layout/Layout';
import ProfileView from './pages/ProfileView';
import UserForm from './pages/UserForm';
import SkillsPage from './pages/SkillsPage';
import './App.css';


const App = () => {
    const isAuthenticated = !!localStorage.getItem('userEmail');

    return (
        <Router>
            <Routes>
                <Route path="/user" element={<UserForm />} />
                <Route path="/" element={<SkillSharingPlatform />} />
                <Route path="/course" element={<CourseCard />} />
                <Route path="/comment" element={<Comment />} />
                
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
