import React, { useState } from "react";
import axios from "axios";

const SharePost = () => {
    const [post, setPost] = useState({
        title: "",
        description: "",
        slogan: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
    
        try {
            const formData = new FormData();
            formData.append("title", post.title);
            formData.append("description", post.description);
            formData.append("slogan", post.slogan);
    
            const response = await axios.post("http://localhost:8080/api/posts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setSuccess("Post shared successfully!");
            setPost({ title: "", description: "", slogan: "" });
        } catch (err) {
            setError("Failed to share the post. Please try again.");
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
        message: {
            textAlign: "center",
            marginTop: "1rem",
            fontSize: "1rem",
        },
        error: {
            color: "red",
        },
        success: {
            color: "green",
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Share a Post</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Title"
                    value={post.title}
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                    style={styles.input}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={post.description}
                    onChange={(e) => setPost({ ...post, description: e.target.value })}
                    style={styles.input}
                    rows="4"
                    required
                />
                <input
                    type="text"
                    placeholder="Slogan"
                    value={post.slogan}
                    onChange={(e) => setPost({ ...post, slogan: e.target.value })}
                    style={styles.input}
                    required
                />
                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Share Post
                </button>
            </form>
            {error && <p style={{ ...styles.message, ...styles.error }}>{error}</p>}
            {success && <p style={{ ...styles.message, ...styles.success }}>{success}</p>}
        </div>
    );
};

export default SharePost;
