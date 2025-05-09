import React, { useEffect, useState } from "react";
import axios from "axios";

const CourseProgress = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState("");
    const [editingCourse, setEditingCourse] = useState(null);

    const fetchCourses = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/courses");
            setCourses(response.data);
        } catch (err) {
            setError("Failed to fetch courses. Please try again.");
        }
    };

    const updateCourse = async (id, updatedCourse) => {
        try {
            await axios.put(`http://localhost:8080/api/courses/${id}`, updatedCourse);
            fetchCourses();
            setEditingCourse(null); // Exit edit mode after update
        } catch (err) {
            setError("Failed to update course. Please try again.");
        }
    };

    const deleteCourse = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/courses/${id}`);
            fetchCourses();
        } catch (err) {
            setError("Failed to delete the course. Please try again.");
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const styles = {
        container: {
            maxWidth: "800px",
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
        courseList: {
            marginBottom: "2rem",
        },
        courseItem: {
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
            marginBottom: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
        },
        progressBarContainer: {
            height: "20px",
            backgroundColor: "#e9ecef",
            borderRadius: "10px",
            overflow: "hidden",
            marginTop: "0.5rem",
        },
        progressBar: {
            height: "100%",
            backgroundColor: "#007bff",
            transition: "width 0.3s ease",
        },
        buttonContainer: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        button: {
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
        },
        deleteButton: {
            backgroundColor: "#dc3545",
            color: "white",
        },
        input: {
            padding: "0.5rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
            width: "100%",
        },
        error: {
            color: "red",
            textAlign: "center",
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Course Progress</h2>
            {error && <p style={styles.error}>{error}</p>}
            <div style={styles.courseList}>
                {courses.map((course) => (
                    <div key={course.id} style={styles.courseItem}>
                        {editingCourse?.id === course.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingCourse.courseName}
                                    onChange={(e) =>
                                        setEditingCourse({ ...editingCourse, courseName: e.target.value })
                                    }
                                    placeholder="Course Name"
                                    style={styles.input}
                                />
                                <input
                                    type="text"
                                    value={editingCourse.courseLevel}
                                    onChange={(e) =>
                                        setEditingCourse({ ...editingCourse, courseLevel: e.target.value })
                                    }
                                    placeholder="Course Level"
                                    style={styles.input}
                                />
                                <input
                                    type="text"
                                    value={editingCourse.institute}
                                    onChange={(e) =>
                                        setEditingCourse({ ...editingCourse, institute: e.target.value })
                                    }
                                    placeholder="Institute"
                                    style={styles.input}
                                />
                                <input
                                    type="date"
                                    value={editingCourse.startDate}
                                    onChange={(e) =>
                                        setEditingCourse({ ...editingCourse, startDate: e.target.value })
                                    }
                                    placeholder="Start Date"
                                    style={styles.input}
                                />
                                <input
                                    type="number"
                                    value={editingCourse.duration}
                                    onChange={(e) =>
                                        setEditingCourse({ ...editingCourse, duration: e.target.value })
                                    }
                                    placeholder="Duration (weeks)"
                                    style={styles.input}
                                />
                                <input
                                    type="text"
                                    value={editingCourse.courseType}
                                    onChange={(e) =>
                                        setEditingCourse({ ...editingCourse, courseType: e.target.value })
                                    }
                                    placeholder="Course Type"
                                    style={styles.input}
                                />
                                <input
                                    type="number"
                                    value={editingCourse.progress}
                                    onChange={(e) =>
                                        setEditingCourse({ ...editingCourse, progress: e.target.value })
                                    }
                                    placeholder="Progress (%)"
                                    style={styles.input}
                                    min="0"
                                    max="100"
                                />
                                <div style={styles.buttonContainer}>
                                    <button
                                        style={styles.button}
                                        onClick={() => updateCourse(course.id, editingCourse)}
                                    >
                                        Save
                                    </button>
                                    <button
                                        style={styles.button}
                                        onClick={() => setEditingCourse(null)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <h3>{course.courseName}</h3>
                                    <p>Level: {course.courseLevel}</p>
                                    <p>Institute: {course.institute}</p>
                                    <p>Start Date: {course.startDate}</p>
                                    <p>Duration: {course.duration} weeks</p>
                                    <p>Type: {course.courseType}</p>
                                    <p>Progress: {course.progress}%</p>
                                </div>
                                <div style={styles.progressBarContainer}>
                                    <div
                                        style={{
                                            ...styles.progressBar,
                                            width: `${course.progress}%`,
                                        }}
                                    ></div>
                                </div>
                                <div style={styles.buttonContainer}>
                                    <button
                                        style={styles.button}
                                        onClick={() => setEditingCourse(course)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        style={{ ...styles.button, ...styles.deleteButton }}
                                        onClick={() => deleteCourse(course.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseProgress;
