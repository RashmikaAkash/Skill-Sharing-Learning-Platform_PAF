import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddCourseProgress = () => {
    const [course, setCourse] = useState({
        courseName: "",
        courseLevel: "",
        institute: "",
        startDate: "",
        duration: "",
        courseType: "",
        progress: 0, // Default progress as 0%
    });

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await axios.post("http://localhost:8080/api/courses", course);
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Course added successfully!",
            });
            setCourse({
                courseName: "",
                courseLevel: "",
                institute: "",
                startDate: "",
                duration: "",
                courseType: "",
                progress: 0,
            });
        } catch (err) {
            setError("Failed to add course. Please try again.");
        }
    };

    const styles = {
        container: {
            maxWidth: "600px",
            margin: "2rem auto",
            padding: "2rem",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            fontFamily: "Arial, sans-serif",
        },
        header: {
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "#333",
        },
        form: {
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
        },
        input: {
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "1rem",
        },
        select: {
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "1rem",
        },
        button: {
            padding: "1rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.2s",
        },
        buttonHover: {
            backgroundColor: "#0056b3",
        },
        error: {
            color: "red",
            textAlign: "center",
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Add Course Progress</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Course Name"
                    value={course.courseName}
                    onChange={(e) => setCourse({ ...course, courseName: e.target.value })}
                    style={styles.input}
                    required
                />
                <input
                    type="text"
                    placeholder="Course Level"
                    value={course.courseLevel}
                    onChange={(e) => setCourse({ ...course, courseLevel: e.target.value })}
                    style={styles.input}
                    required
                />
                <input
                    type="text"
                    placeholder="Institute"
                    value={course.institute}
                    onChange={(e) => setCourse({ ...course, institute: e.target.value })}
                    style={styles.input}
                    required
                />
                <input
                    type="date"
                    placeholder="Start Date"
                    value={course.startDate}
                    onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
                    style={styles.input}
                    required
                />
                <input
                    type="number"
                    placeholder="Duration (weeks)"
                    value={course.duration}
                    onChange={(e) => setCourse({ ...course, duration: e.target.value })}
                    style={styles.input}
                    required
                />
                <input
                    type="text"
                    placeholder="Course Type (e.g., Online, In-Person)"
                    value={course.courseType}
                    onChange={(e) => setCourse({ ...course, courseType: e.target.value })}
                    style={styles.input}
                    required
                />
                <input
                    type="number"
                    placeholder="Progress (%)"
                    value={course.progress}
                    onChange={(e) => setCourse({ ...course, progress: parseInt(e.target.value, 10) })}
                    style={styles.input}
                    min="0"
                    max="100"
                    required
                />
                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Add Course
                </button>
            </form>
        </div>
    );
};

export default AddCourseProgress;
