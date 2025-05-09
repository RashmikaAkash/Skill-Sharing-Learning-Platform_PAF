import React, { useState } from "react";

const SharePost = () => {
    const [post, setPost] = useState({
        title: "",
        description: "",
        slogan: "",
        category: "",
        tags: "",
        image: null
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [charCount, setCharCount] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);
        
        // Validation
        if (post.description.length < 20) {
            setError("Description must be at least 20 characters long");
            setIsSubmitting(false);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            setSuccess("Post shared successfully!");
            setPost({ title: "", description: "", slogan: "", category: "", tags: "", image: null });
            setPreviewImage(null);
            setCharCount(0);
            setIsSubmitting(false);
        }, 1500);
    };

    const handleDescriptionChange = (e) => {
        const text = e.target.value;
        setCharCount(text.length);
        setPost({ ...post, description: text });
    };

    const handleImageChange = (e) => {
        // This would normally process a file upload
        // For this example, we'll just create a preview URL
        setPreviewImage("/api/placeholder/600/400");
        setPost({ ...post, image: "image-file" });
    };

    const styles = {
        container: {
            maxWidth: "800px",
            margin: "2rem auto",
            padding: "0",
            fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
            color: "#333",
        },
        header: {
            backgroundColor: "#4a154b",
            color: "white",
            padding: "2rem",
            borderRadius: "8px 8px 0 0",
            margin: "0",
            textAlign: "center",
            position: "relative",
        },
        title: {
            fontSize: "28px",
            margin: "0 0 8px 0",
            fontWeight: "600",
        },
        subtitle: {
            fontSize: "16px",
            fontWeight: "normal",
            opacity: "0.9",
            margin: "0",
        },
        formContainer: {
            backgroundColor: "#ffffff",
            borderRadius: "0 0 8px 8px",
            padding: "2rem",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
        },
        formGroup: {
            marginBottom: "1.5rem",
        },
        label: {
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "500",
            fontSize: "14px",
            color: "#444",
        },
        input: {
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "1rem",
            transition: "border-color 0.2s ease",
            boxSizing: "border-box",
        },
        focusedInput: {
            borderColor: "#4a154b",
            outline: "none",
            boxShadow: "0 0 0 2px rgba(74, 21, 75, 0.2)",
        },
        textarea: {
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "1rem",
            transition: "border-color 0.2s ease",
            minHeight: "120px",
            resize: "vertical",
            boxSizing: "border-box",
        },
        select: {
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "1rem",
            backgroundColor: "#fff",
            cursor: "pointer",
            boxSizing: "border-box",
        },
        imageUploadContainer: {
            border: "2px dashed #ddd",
            borderRadius: "4px",
            padding: "1.5rem",
            textAlign: "center",
            marginBottom: "1.5rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
        },
        imageUploadContainerHover: {
            borderColor: "#4a154b",
            backgroundColor: "rgba(74, 21, 75, 0.05)",
        },
        imagePreviewContainer: {
            marginTop: "1rem",
            position: "relative",
        },
        imagePreview: {
            width: "100%",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        },
        removeImageButton: {
            position: "absolute",
            top: "8px",
            right: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "16px",
        },
        charCount: {
            textAlign: "right",
            fontSize: "12px",
            color: charCount > 500 ? "#e74c3c" : "#888",
            marginTop: "4px",
        },
        buttonGroup: {
            display: "flex",
            gap: "1rem",
            marginTop: "2rem",
        },
        button: {
            flex: "1",
            padding: "1rem",
            border: "none",
            borderRadius: "4px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontWeight: "500",
        },
        primaryButton: {
            backgroundColor: "#4a154b",
            color: "white",
        },
        primaryButtonHover: {
            backgroundColor: "#3a0d3b",
        },
        secondaryButton: {
            backgroundColor: "#f5f5f5",
            color: "#333",
        },
        secondaryButtonHover: {
            backgroundColor: "#e5e5e5",
        },
        disabledButton: {
            backgroundColor: "#7d5e7e",
            cursor: "not-allowed",
        },
        message: {
            padding: "1rem",
            marginTop: "1rem",
            borderRadius: "4px",
            textAlign: "center",
        },
        error: {
            backgroundColor: "#fdecea",
            color: "#e74c3c",
        },
        success: {
            backgroundColor: "#edf7ed",
            color: "#4caf50",
        },
        tagsInput: {
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "1rem",
        },
        tagsNote: {
            fontSize: "12px",
            color: "#888",
            marginTop: "4px",
        },
        flexRow: {
            display: "flex",
            gap: "1rem",
        },
        flexHalf: {
            flex: "1",
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Share Your Ideas</h1>
                <p style={styles.subtitle}>Create a post that will inspire the community</p>
            </header>
            
            <div style={styles.formContainer}>
                <div onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Post Title</label>
                        <input
                            type="text"
                            placeholder="Enter a catchy title for your post"
                            value={post.title}
                            onChange={(e) => setPost({ ...post, title: e.target.value })}
                            style={styles.input}
                            onFocus={(e) => e.target.style.borderColor = "#4a154b"}
                            onBlur={(e) => e.target.style.borderColor = "#ddd"}
                        />
                    </div>
                    
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Description</label>
                        <textarea
                            placeholder="Share your thoughts, ideas, or insights..."
                            value={post.description}
                            onChange={handleDescriptionChange}
                            style={styles.textarea}
                            onFocus={(e) => e.target.style.borderColor = "#4a154b"}
                            onBlur={(e) => e.target.style.borderColor = "#ddd"}
                        />
                        <div style={styles.charCount}>
                            {charCount}/1000 characters
                        </div>
                    </div>
                    
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Memorable Slogan</label>
                        <input
                            type="text"
                            placeholder="A short, catchy phrase summarizing your post"
                            value={post.slogan}
                            onChange={(e) => setPost({ ...post, slogan: e.target.value })}
                            style={styles.input}
                            onFocus={(e) => e.target.style.borderColor = "#4a154b"}
                            onBlur={(e) => e.target.style.borderColor = "#ddd"}
                        />
                    </div>
                    
                    <div style={styles.flexRow}>
                        <div style={{...styles.formGroup, ...styles.flexHalf}}>
                            <label style={styles.label}>Category</label>
                            <select
                                value={post.category}
                                onChange={(e) => setPost({ ...post, category: e.target.value })}
                                style={styles.select}
                            >
                                <option value="" disabled>Select a category</option>
                                <option value="technology">Technology</option>
                                <option value="design">Design</option>
                                <option value="business">Business</option>
                                <option value="lifestyle">Lifestyle</option>
                                <option value="health">Health & Wellness</option>
                                <option value="education">Education</option>
                            </select>
                        </div>
                        
                        <div style={{...styles.formGroup, ...styles.flexHalf}}>
                            <label style={styles.label}>Tags</label>
                            <input
                                type="text"
                                placeholder="Enter tags separated by commas"
                                value={post.tags}
                                onChange={(e) => setPost({ ...post, tags: e.target.value })}
                                style={styles.tagsInput}
                                onFocus={(e) => e.target.style.borderColor = "#4a154b"}
                                onBlur={(e) => e.target.style.borderColor = "#ddd"}
                            />
                            <div style={styles.tagsNote}>
                                Example: webdev, design, productivity
                            </div>
                        </div>
                    </div>
                    
                    <div 
                        style={styles.imageUploadContainer}
                        onClick={() => document.getElementById('image-upload').click()}
                        onMouseOver={(e) => {
                            e.currentTarget.style.borderColor = "#4a154b";
                            e.currentTarget.style.backgroundColor = "rgba(74, 21, 75, 0.05)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.borderColor = "#ddd";
                            e.currentTarget.style.backgroundColor = "transparent";
                        }}
                    >
                        <input
                            id="image-upload"
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                        <div>
                            <svg style={{ width: "48px", height: "48px", color: "#888", margin: "0 auto 16px" }} viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
                            </svg>
                            <p style={{ margin: 0 }}>
                                {post.image ? "Change image" : "Upload an image for your post"}
                            </p>
                            <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#888" }}>
                                Support formats: JPEG, PNG, GIF (max 5MB)
                            </p>
                        </div>
                        
                        {previewImage && (
                            <div style={styles.imagePreviewContainer}>
                                <img 
                                    src={previewImage} 
                                    alt="Preview" 
                                    style={styles.imagePreview} 
                                />
                                <button 
                                    style={styles.removeImageButton}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPreviewImage(null);
                                        setPost({...post, image: null});
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        )}
                    </div>
                    
                    <div style={styles.buttonGroup}>
                        <button
                            style={{
                                ...styles.button,
                                ...styles.secondaryButton
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = styles.secondaryButtonHover.backgroundColor}
                            onMouseOut={(e) => e.target.style.backgroundColor = styles.secondaryButton.backgroundColor}
                            onClick={() => {
                                setPost({ title: "", description: "", slogan: "", category: "", tags: "", image: null });
                                setPreviewImage(null);
                                setCharCount(0);
                            }}
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            style={{
                                ...styles.button,
                                ...styles.primaryButton,
                                ...(isSubmitting ? styles.disabledButton : {})
                            }}
                            onMouseOver={(e) => !isSubmitting && (e.target.style.backgroundColor = styles.primaryButtonHover.backgroundColor)}
                            onMouseOut={(e) => !isSubmitting && (e.target.style.backgroundColor = styles.primaryButton.backgroundColor)}
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            type="button"
                        >
                            {isSubmitting ? "Sharing..." : "Share Post"}
                        </button>
                    </div>
                </div>
                
                {error && <div style={{ ...styles.message, ...styles.error }}>{error}</div>}
                {success && <div style={{ ...styles.message, ...styles.success }}>{success}</div>}
            </div>
        </div>
    );
};

export default SharePost;