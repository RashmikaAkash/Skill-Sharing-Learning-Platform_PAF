import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EnrollPage = () => {
    const [enrollData, setEnrollData] = useState({
        name: "",
        moduleKey: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!enrollData.name || !enrollData.moduleKey) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please fill in all fields.",
            });
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:8080/api/enrollments", {
                name: enrollData.name,
                moduleKey: enrollData.moduleKey,
            });
            Swal.fire({
                icon: "success",
                title: "Enrolled Successfully",
                text: `You have been enrolled in ${response.data.moduleKey}!`,
            });
            setEnrollData({ name: "", moduleKey: "" });
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.response?.data?.message || "Failed to enroll. Please try again.",
            });
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
        moduleKeyDisplay: {
            fontSize: "0.9rem",
            color: "#555",
            marginTop: "0.5rem",
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
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Enroll in a Module</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={enrollData.name}
                    onChange={(e) => setEnrollData({ ...enrollData, name: e.target.value })}
                    style={styles.input}
                    required
                />
                <select
                    value={enrollData.moduleKey}
                    onChange={(e) => setEnrollData({ ...enrollData, moduleKey: e.target.value })}
                    style={styles.select}
                    required
                >
                    <option value="" disabled>
                        Select a Module
                    </option>
                    <option value="IT2030">Introduction to Web Development</option>
                    <option value="DM3080">Digital Marketing Fundamentals</option>
                    <option value="IM4060">UI/UX Design Principles</option>
                    <option value="CA2929">Spanish for Beginners</option>
                </select>
                {enrollData.moduleKey && (
                    <p style={styles.moduleKeyDisplay}>
                        Selected Module Key: <strong>{enrollData.moduleKey}</strong>
                    </p>
                )}
                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Enroll
                </button>
            </form>
        </div>
    );
};

export default EnrollPage;
