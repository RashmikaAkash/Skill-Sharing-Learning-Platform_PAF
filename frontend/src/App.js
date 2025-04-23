import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserForm from "./pages/UserForm";
import SkillSharingPlatform from "./pages/SkillSharingPlatform";
import CourseCard from "./pages/CourseCard";
import Comment from "./pages/Comment";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/user" element={<UserForm />} />
                <Route path="/" element={<SkillSharingPlatform />} />
                <Route path="/course" element={<CourseCard />} />
                <Route path="/comment" element={<Comment />} />
            </Routes>
        </Router>
    );
}

export default App;