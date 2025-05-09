import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Comment from "./Comment";

const ManagePosts = () => {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    // New state to track which posts have comments visible
    const [showComments, setShowComments] = useState({});

    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/posts");
            setPosts(response.data);
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to fetch posts. Please try again.",
            });
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/posts/${id}`);
            Swal.fire({
                icon: "success",
                title: "Deleted",
                text: "Post deleted successfully!",
            });
            fetchPosts();
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to delete the post. Please try again.",
            });
        }
    };

    const handleEdit = (post) => {
        setEditingPost(post);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const { id, title, description, slogan } = editingPost;
            await axios.put(`http://localhost:8080/api/posts/${id}`, { title, description, slogan });
            Swal.fire({
                icon: "success",
                title: "Updated",
                text: "Post updated successfully!",
            });
            setEditingPost(null);
            fetchPosts();
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to update the post. Please try again.",
            });
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Toggle comment visibility for a specific post
    const toggleComments = (postId) => {
        setShowComments(prev => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    };

    const styles = {
        commentcon: {
            fontFamily: 'Arial, sans-serif',
            maxWidth: '900px',
            margin: '0 auto',
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            marginTop: '40px'
        },
        container: {
            maxWidth: "800px",
            margin: "2rem auto",
            padding: "2rem",
            borderRadius: "8px",
            fontFamily: "Arial, sans-serif",
        },
        header: {
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "#333",
        },
        postList: {
            marginBottom: "0rem",
        },
        postItem: {
            padding: "1rem",
            borderRadius: "4px",
            marginBottom: "0rem",
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
        editButton: {
            backgroundColor: "#007bff",
            color: "white",
        },
        deleteButton: {
            backgroundColor: "#dc3545",
            color: "white",
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
            <h2 style={styles.header}>Manage Posts</h2>

            <div style={styles.postList}>
                {posts.map((post) => (
                    <div key={post.id} style={styles.commentcon}>
                        <div style={styles.postItem}>
                            <div>
                                <h3>{post.title}</h3>
                                <p>{post.description}</p>
                                <small>{post.slogan}</small>
                            </div>
                            <div>
                                <button
                                    style={{ ...styles.button, ...styles.editButton }}
                                    onClick={() => handleEdit(post)}
                                >
                                    Edit
                                </button>
                                <button
                                    style={{ ...styles.button, ...styles.deleteButton }}
                                    onClick={() => handleDelete(post.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                        {/* Toggle Show/Hide Comments */}
                        <button
                            style={{ ...styles.button, ...styles.editButton }}
                            onClick={() => toggleComments(post.id)}
                        >
                            {showComments[post.id] ? 'Hide Comments' : 'Show Comments'}
                        </button>

                        {/* Conditionally render Comment component */}
                        {showComments[post.id] && <Comment postId={post.id} />}
                    </div>
                ))}
            </div>

            {editingPost && (
                <form onSubmit={handleUpdate} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={editingPost.title}
                        onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={editingPost.description}
                        onChange={(e) => setEditingPost({ ...editingPost, description: e.target.value })}
                        style={styles.input}
                        rows="4"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Slogan"
                        value={editingPost.slogan}
                        onChange={(e) => setEditingPost({ ...editingPost, slogan: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <button type="submit" style={{ ...styles.button, ...styles.editButton }}>
                        Update Post
                    </button>
                </form>
            )}
        </div>
    );
};

export default ManagePosts;