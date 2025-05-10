
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserForm from "./pages/UserForm";
import SkillSharingPlatform from "./pages/SkillSharingPlatform";
import CourseCard from "./pages/CourseCard";
import Comment from "./pages/Comment";
import Layout from './components/Layout/Layout';
import ProfileView from './pages/ProfileView';
import SkillsPage from './pages/SkillsPage';
import Login from './pages/Login';
import SharePost from "./pages/SharePost";
import ManagePosts from "./pages/ManagePosts";
import EnrollPage from "./pages/EnrollPage";
import CourseProgress from "./pages/CourseProgress";
import AddCourseProgress from "./pages/AddCourseProgress";
import './App.css';


const App = () => {
    const isAuthenticated = !!localStorage.getItem('jwtToken');

    return (
        <Router>
            <Routes>
                <Route path="/user" element={<UserForm />} />
                <Route path="/course" element={<CourseCard />} />
                <Route path="/login" element={<Login />} />
                
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
                                    <Route path="/comment" element={<Comment />} />
                                    <Route path="/share-post" element={<SharePost />} />
                                    <Route path="/manage-posts" element={<ManagePosts />} />
                                    <Route path="/enroll" element={<EnrollPage />} />
                                    {/* Add more routes here */}
                                    <Route path="/course-progress" element={<CourseProgress />} />
                                    {/* Redirect to home if no match */}
                                    <Route path="/addcourse" element={<AddCourseProgress />} />

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
