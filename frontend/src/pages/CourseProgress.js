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

    // Enhanced styles
    const styles = {
        pageContainer: {
            minHeight: "100vh",
            padding: "2rem",
            backgroundColor: "#f8fafc",
            backgroundImage: "linear-gradient(120deg, #f0f9ff 0%, #f8f0ff 100%)",
            fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
        },
        container: {
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0",
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
            overflow: "hidden",
            backgroundColor: "#ffffff",
        },
        header: {
            padding: "1.8rem",
            textAlign: "center",
            color: "white",
            background: "linear-gradient(135deg, #2563eb 0%, #9333ea 100%)",
            margin: 0,
            fontSize: "28px",
            fontWeight: "700",
            letterSpacing: "0.5px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            position: "relative",
        },
        headerAfter: {
            content: '""',
            position: "absolute",
            bottom: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60px",
            height: "4px",
            backgroundColor: "#f0f9ff",
            borderRadius: "2px",
        },
        errorContainer: {
            backgroundColor: "#fee2e2",
            borderLeft: "4px solid #ef4444",
            color: "#b91c1c",
            padding: "1rem",
            margin: "1rem",
            borderRadius: "4px",
            fontSize: "0.95rem",
        },
        contentWrapper: {
            padding: "1.5rem",
        },
        courseList: {
            display: "grid",
            gap: "1.5rem",
        },
        courseItem: {
            borderRadius: "12px",
            backgroundColor: "white",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            overflow: "hidden",
            border: "1px solid #e2e8f0",
            transition: "all 0.3s ease",
        },
        courseItemHover: {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
        },
        courseContent: {
            padding: "1.5rem",
        },
        courseHeader: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
        },
        courseTitle: {
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "#1e293b",
            margin: 0,
            marginBottom: "0.25rem",
        },
        courseInfo: {
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "0.75rem",
            marginBottom: "1.25rem",
        },
        infoItem: {
            display: "flex",
            flexDirection: "column",
        },
        infoLabel: {
            fontSize: "0.8rem",
            textTransform: "uppercase",
            letterSpacing: "0.05rem",
            color: "#64748b",
            fontWeight: "600",
            marginBottom: "0.25rem",
        },
        infoValue: {
            fontSize: "1rem",
            color: "#334155",
            fontWeight: "500",
        },
        progressContainer: {
            marginTop: "1.25rem",
            marginBottom: "1.25rem",
        },
        progressLabel: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.5rem",
        },
        progressText: {
            fontSize: "0.9rem",
            fontWeight: "600",
            color: "#334155",
        },
        progressPercentage: {
            fontSize: "1rem",
            fontWeight: "700",
            color: "#2563eb",
        },
        progressBarContainer: {
            height: "8px",
            backgroundColor: "#e2e8f0",
            borderRadius: "999px",
            overflow: "hidden",
        },
        progressBar: {
            height: "100%",
            transition: "width 0.5s ease",
        },
        progressBarGradient: (progress) => {
            // Change color based on progress
            if (progress < 30) {
                return "linear-gradient(90deg, #ef4444 0%, #f97316 100%)"; // Red to orange
            } else if (progress < 70) {
                return "linear-gradient(90deg, #f97316 0%, #facc15 100%)"; // Orange to yellow
            } else {
                return "linear-gradient(90deg, #22c55e 0%, #06b6d4 100%)"; // Green to teal
            }
        },
        buttonsContainer: {
            display: "flex",
            justifyContent: "flex-end",
            gap: "0.75rem",
            marginTop: "1rem",
            borderTop: "1px solid #f1f5f9",
            paddingTop: "1rem",
        },
        buttonBase: {
            padding: "0.625rem 1.25rem",
            fontWeight: "600",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.875rem",
            transition: "all 0.2s ease",
            outline: "none",
        },
        editButton: {
            backgroundColor: "#f1f5f9",
            color: "#334155",
        },
        editButtonHover: {
            backgroundColor: "#e2e8f0",
        },
        deleteButton: {
            backgroundColor: "#fecaca",
            color: "#b91c1c",
        },
        deleteButtonHover: {
            backgroundColor: "#fca5a5",
        },
        saveButton: {
            backgroundColor: "#dcfce7",
            color: "#166534",
        },
        saveButtonHover: {
            backgroundColor: "#bbf7d0",
        },
        cancelButton: {
            backgroundColor: "#f1f5f9",
            color: "#64748b",
        },
        cancelButtonHover: {
            backgroundColor: "#e2e8f0",
        },
        // Edit form styles
        editForm: {
            padding: "1.5rem",
        },
        formGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
            marginBottom: "1rem",
        },
        formGroup: {
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginBottom: "1rem",
        },
        label: {
            fontSize: "0.875rem",
            fontWeight: "600",
            color: "#475569",
        },
        input: {
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
            fontSize: "0.95rem",
            transition: "all 0.2s ease",
            outline: "none",
        },
        inputFocus: {
            borderColor: "#2563eb",
            boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.1)",
        },
        progressSlider: {
            width: "100%",
            height: "8px",
            appearance: "none",
            backgroundColor: "#e2e8f0",
            borderRadius: "999px",
            outline: "none",
            margin: "0.5rem 0",
            transition: "all 0.2s ease",
        },
        noCoursesMessage: {
            textAlign: "center",
            padding: "3rem 1.5rem",
            color: "#64748b",
            fontStyle: "italic",
            fontSize: "1.15rem",
        }
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <h2 style={{ margin: 0 }}>Course Progress Tracker</h2>
                    <div style={styles.headerAfter}></div>
                </div>

                <div style={styles.contentWrapper}>
                    {error && <div style={styles.errorContainer}>{error}</div>}

                    {courses.length === 0 ? (
                        <div style={styles.noCoursesMessage}>
                            No courses found. Add a course to get started.
                        </div>
                    ) : (
                        <div style={styles.courseList}>
                            {courses.map((course) => (
                                <div 
                                    key={course.id} 
                                    style={styles.courseItem}
                                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.courseItemHover)}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.05)";
                                    }}
                                >
                                    {editingCourse?.id === course.id ? (
                                        <div style={styles.editForm}>
                                            <div style={styles.formGrid}>
                                                <div style={styles.formGroup}>
                                                    <label style={styles.label}>Course Name</label>
                                                    <input
                                                        type="text"
                                                        value={editingCourse.courseName}
                                                        onChange={(e) => setEditingCourse({ ...editingCourse, courseName: e.target.value })}
                                                        placeholder="Course Name"
                                                        style={styles.input}
                                                        onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                                                        onBlur={(e) => {
                                                            e.target.style.borderColor = "#cbd5e1";
                                                            e.target.style.boxShadow = "none";
                                                        }}
                                                    />
                                                </div>

                                                <div style={styles.formGroup}>
                                                    <label style={styles.label}>Course Level</label>
                                                    <input
                                                        type="text"
                                                        value={editingCourse.courseLevel}
                                                        onChange={(e) => setEditingCourse({ ...editingCourse, courseLevel: e.target.value })}
                                                        placeholder="Course Level"
                                                        style={styles.input}
                                                        onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                                                        onBlur={(e) => {
                                                            e.target.style.borderColor = "#cbd5e1";
                                                            e.target.style.boxShadow = "none";
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div style={styles.formGrid}>
                                                <div style={styles.formGroup}>
                                                    <label style={styles.label}>Institute</label>
                                                    <input
                                                        type="text"
                                                        value={editingCourse.institute}
                                                        onChange={(e) => setEditingCourse({ ...editingCourse, institute: e.target.value })}
                                                        placeholder="Institute"
                                                        style={styles.input}
                                                        onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                                                        onBlur={(e) => {
                                                            e.target.style.borderColor = "#cbd5e1";
                                                            e.target.style.boxShadow = "none";
                                                        }}
                                                    />
                                                </div>

                                                <div style={styles.formGroup}>
                                                    <label style={styles.label}>Start Date</label>
                                                    <input
                                                        type="date"
                                                        value={editingCourse.startDate}
                                                        onChange={(e) => setEditingCourse({ ...editingCourse, startDate: e.target.value })}
                                                        style={styles.input}
                                                        onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                                                        onBlur={(e) => {
                                                            e.target.style.borderColor = "#cbd5e1";
                                                            e.target.style.boxShadow = "none";
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div style={styles.formGrid}>
                                                <div style={styles.formGroup}>
                                                    <label style={styles.label}>Duration (weeks)</label>
                                                    <input
                                                        type="number"
                                                        value={editingCourse.duration}
                                                        onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                                                        placeholder="Duration (weeks)"
                                                        style={styles.input}
                                                        onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                                                        onBlur={(e) => {
                                                            e.target.style.borderColor = "#cbd5e1";
                                                            e.target.style.boxShadow = "none";
                                                        }}
                                                    />
                                                </div>

                                                <div style={styles.formGroup}>
                                                    <label style={styles.label}>Course Type</label>
                                                    <input
                                                        type="text"
                                                        value={editingCourse.courseType}
                                                        onChange={(e) => setEditingCourse({ ...editingCourse, courseType: e.target.value })}
                                                        placeholder="Course Type"
                                                        style={styles.input}
                                                        onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                                                        onBlur={(e) => {
                                                            e.target.style.borderColor = "#cbd5e1";
                                                            e.target.style.boxShadow = "none";
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div style={styles.formGroup}>
                                                <label style={styles.label}>Progress: {editingCourse.progress}%</label>
                                                <input
                                                    type="range"
                                                    value={editingCourse.progress}
                                                    onChange={(e) => setEditingCourse({ ...editingCourse, progress: e.target.value })}
                                                    style={styles.progressSlider}
                                                    min="0"
                                                    max="100"
                                                    step="5"
                                                />
                                                <div style={styles.progressBarContainer}>
                                                    <div 
                                                        style={{
                                                            ...styles.progressBar,
                                                            width: `${editingCourse.progress}%`,
                                                            background: styles.progressBarGradient(editingCourse.progress)
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>

                                            <div style={styles.buttonsContainer}>
                                                <button
                                                    style={{...styles.buttonBase, ...styles.saveButton}}
                                                    onMouseOver={(e) => Object.assign(e.target.style, styles.saveButtonHover)}
                                                    onMouseOut={(e) => e.target.style.backgroundColor = styles.saveButton.backgroundColor}
                                                    onClick={() => updateCourse(course.id, editingCourse)}
                                                >
                                                    Save Changes
                                                </button>
                                                <button
                                                    style={{...styles.buttonBase, ...styles.cancelButton}}
                                                    onMouseOver={(e) => Object.assign(e.target.style, styles.cancelButtonHover)}
                                                    onMouseOut={(e) => e.target.style.backgroundColor = styles.cancelButton.backgroundColor}
                                                    onClick={() => setEditingCourse(null)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div style={styles.courseContent}>
                                                <div style={styles.courseHeader}>
                                                    <h3 style={styles.courseTitle}>{course.courseName}</h3>
                                                </div>
                                                
                                                <div style={styles.courseInfo}>
                                                    <div style={styles.infoItem}>
                                                        <span style={styles.infoLabel}>Level</span>
                                                        <span style={styles.infoValue}>{course.courseLevel}</span>
                                                    </div>
                                                    <div style={styles.infoItem}>
                                                        <span style={styles.infoLabel}>Institute</span>
                                                        <span style={styles.infoValue}>{course.institute}</span>
                                                    </div>
                                                    <div style={styles.infoItem}>
                                                        <span style={styles.infoLabel}>Start Date</span>
                                                        <span style={styles.infoValue}>{course.startDate}</span>
                                                    </div>
                                                    <div style={styles.infoItem}>
                                                        <span style={styles.infoLabel}>Duration</span>
                                                        <span style={styles.infoValue}>{course.duration} weeks</span>
                                                    </div>
                                                    <div style={styles.infoItem}>
                                                        <span style={styles.infoLabel}>Type</span>
                                                        <span style={styles.infoValue}>{course.courseType}</span>
                                                    </div>
                                                </div>
                                                
                                                <div style={styles.progressContainer}>
                                                    <div style={styles.progressLabel}>
                                                        <span style={styles.progressText}>Course Progress</span>
                                                        <span style={styles.progressPercentage}>{course.progress}%</span>
                                                    </div>
                                                    <div style={styles.progressBarContainer}>
                                                        <div 
                                                            style={{
                                                                ...styles.progressBar,
                                                                width: `${course.progress}%`,
                                                                background: styles.progressBarGradient(course.progress)
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                
                                                <div style={styles.buttonsContainer}>
                                                    <button
                                                        style={{...styles.buttonBase, ...styles.editButton}}
                                                        onMouseOver={(e) => Object.assign(e.target.style, styles.editButtonHover)}
                                                        onMouseOut={(e) => e.target.style.backgroundColor = styles.editButton.backgroundColor}
                                                        onClick={() => setEditingCourse(course)}
                                                    >
                                                        Edit Course
                                                    </button>
                                                    <button
                                                        style={{...styles.buttonBase, ...styles.deleteButton}}
                                                        onMouseOver={(e) => Object.assign(e.target.style, styles.deleteButtonHover)}
                                                        onMouseOut={(e) => e.target.style.backgroundColor = styles.deleteButton.backgroundColor}
                                                        onClick={() => {
                                                            if(window.confirm("Are you sure you want to delete this course?")) {
                                                                deleteCourse(course.id);
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseProgress;