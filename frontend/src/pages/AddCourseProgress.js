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
        pageContainer: {
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            backgroundImage: "linear-gradient(to right, #e0f2fe, #f3e8ff)",
            fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
        },
        container: {
            width: "100%",
            maxWidth: "600px",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            transform: "translateY(0)",
            transition: "transform 0.3s, box-shadow 0.3s",
        },
        headerSection: {
            padding: "1.5rem",
            backgroundImage: "linear-gradient(to right, #2563eb, #9333ea)",
            color: "white",
            textAlign: "center"
        },
        headerText: {
            fontSize: "28px",
            fontWeight: "700",
            margin: 0
        },
        formSection: {
            padding: "2rem"
        },
        errorBox: {
            marginBottom: "1rem",
            padding: "0.75rem",
            backgroundColor: "#fee2e2",
            borderLeftWidth: "4px",
            borderLeftColor: "#ef4444",
            color: "#b91c1c"
        },
        formGroup: {
            marginBottom: "1.5rem"
        },
        label: {
            display: "block",
            marginBottom: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: "500",
            color: "#374151"
        },
        input: {
            width: "100%",
            padding: "0.75rem 1rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            transition: "all 0.3s",
            outline: "none"
        },
        inputFocus: {
            borderColor: "#3b82f6",
            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2)"
        },
        select: {
            width: "100%",
            padding: "0.75rem 1rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            backgroundColor: "white",
            transition: "all 0.3s",
            outline: "none"
        },
        twoColumnLayout: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem"
        },
        progressContainer: {
            marginBottom: "1.5rem"
        },
        progressLabel: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: "500",
            color: "#374151"
        },
        rangeInput: {
            width: "100%",
            height: "8px",
            appearance: "none",
            backgroundColor: "#e5e7eb",
            borderRadius: "9999px",
            outline: "none",
            margin: "1rem 0"
        },
        progressBar: {
            width: "100%",
            height: "8px",
            backgroundColor: "#e5e7eb",
            borderRadius: "9999px",
            overflow: "hidden",
            marginTop: "0.5rem"
        },
        progressFill: {
            height: "100%",
            backgroundImage: "linear-gradient(to right, #3b82f6, #8b5cf6)",
            borderRadius: "9999px",
            transition: "width 0.5s ease"
        },
        submitButton: {
            width: "100%",
            padding: "1rem",
            backgroundImage: "linear-gradient(to right, #2563eb, #9333ea)",
            color: "white",
            fontWeight: "700",
            fontSize: "1rem",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(37, 99, 235, 0.2)",
            transition: "all 0.3s"
        },
        submitButtonHover: {
            transform: "translateY(2px)",
            boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)"
        }
    };

    return (
        <div style={styles.pageContainer}>
            <div 
                style={styles.container}
                onMouseOver={(e) => e.currentTarget.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.15)"}
                onMouseOut={(e) => e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)"}
            >
                <div style={styles.headerSection}>
                    <h2 style={styles.headerText}>Course Progress Tracker</h2>
                </div>
                
                <div style={styles.formSection}>
                    {error && <div style={styles.errorBox}><p style={{margin: 0}}>{error}</p></div>}
                    
                    <form onSubmit={handleSubmit}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Course Name</label>
                            <input
                                type="text"
                                placeholder="Enter course name"
                                value={course.courseName}
                                onChange={(e) => setCourse({ ...course, courseName: e.target.value })}
                                style={styles.input}
                                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "#d1d5db";
                                    e.target.style.boxShadow = "none";
                                }}
                                required
                            />
                        </div>
                        
                        <div style={styles.twoColumnLayout}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Course Level</label>
                                <input
                                    type="text"
                                    placeholder="Beginner, Intermediate..."
                                    value={course.courseLevel}
                                    onChange={(e) => setCourse({ ...course, courseLevel: e.target.value })}
                                    style={styles.input}
                                    onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "#d1d5db";
                                        e.target.style.boxShadow = "none";
                                    }}
                                    required
                                />
                            </div>
                            
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Institute</label>
                                <input
                                    type="text"
                                    placeholder="School or platform name"
                                    value={course.institute}
                                    onChange={(e) => setCourse({ ...course, institute: e.target.value })}
                                    style={styles.input}
                                    onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "#d1d5db";
                                        e.target.style.boxShadow = "none";
                                    }}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div style={styles.twoColumnLayout}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Start Date</label>
                                <input
                                    type="date"
                                    value={course.startDate}
                                    onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
                                    style={styles.input}
                                    onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "#d1d5db";
                                        e.target.style.boxShadow = "none";
                                    }}
                                    required
                                />
                            </div>
                            
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Duration (weeks)</label>
                                <input
                                    type="number"
                                    placeholder="E.g. 12"
                                    value={course.duration}
                                    onChange={(e) => setCourse({ ...course, duration: e.target.value })}
                                    style={styles.input}
                                    onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = "#d1d5db";
                                        e.target.style.boxShadow = "none";
                                    }}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Course Type</label>
                            <select
                                value={course.courseType}
                                onChange={(e) => setCourse({ ...course, courseType: e.target.value })}
                                style={styles.select}
                                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "#d1d5db";
                                    e.target.style.boxShadow = "none";
                                }}
                                required
                            >
                                <option value="">Select Course Type</option>
                                <option value="Online">Online</option>
                                <option value="In-Person">In-Person</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="Self-Paced">Self-Paced</option>
                            </select>
                        </div>
                        
                        <div style={styles.progressContainer}>
                            <div style={styles.progressLabel}>
                                <span>Progress</span>
                                <span>{course.progress}%</span>
                            </div>
                            <input
                                type="range"
                                value={course.progress}
                                onChange={(e) => setCourse({ ...course, progress: parseInt(e.target.value, 10) })}
                                style={styles.rangeInput}
                                min="0"
                                max="100"
                                step="5"
                                required
                            />
                            <div style={styles.progressBar}>
                                <div 
                                    style={{
                                        ...styles.progressFill,
                                        width: `${course.progress}%`
                                    }}
                                ></div>
                            </div>
                        </div>
                        
                        <button
                            type="submit"
                            style={styles.submitButton}
                            onMouseOver={(e) => Object.assign(e.target.style, styles.submitButtonHover)}
                            onMouseOut={(e) => {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "0 4px 6px rgba(37, 99, 235, 0.2)";
                            }}
                        >
                            Add Course
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCourseProgress;