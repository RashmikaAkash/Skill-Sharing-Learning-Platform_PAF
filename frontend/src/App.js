import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserForm from "./pages/UserForm";
import SkillSharingPlatform from "./pages/SkillSharingPlatform";
import CourseCard from "./pages/CourseCard";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/user" element={<UserForm />} />
                <Route path="/" element={<SkillSharingPlatform />} />
                <Route path="/course" element={<CourseCard />} />
            </Routes>
        </Router>
    );
}

export default App;