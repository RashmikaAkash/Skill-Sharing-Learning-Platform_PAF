import React, { useState } from "react";
import { createUser } from "../api";
import Swal from "sweetalert2";

const UserForm = () => {
    const [user, setUser] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
        age: "",
        location: "",
        bio: "",
        profilePhoto: null,
        coverPhoto: null
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [preview, setPreview] = useState({
        profilePhoto: null,
        coverPhoto: null
    });

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            setUser({ ...user, [type]: file });
            const previewUrl = URL.createObjectURL(file);
            setPreview(prev => ({ ...prev, [type]: previewUrl }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const formData = new FormData();
            formData.append("name", user.name);
            formData.append("username", user.username);
            formData.append("password", user.password);
            formData.append("email", user.email);
            formData.append("age", user.age);
            if (user.location) formData.append("location", user.location);
            if (user.bio) formData.append("bio", user.bio);
            if (user.profilePhoto) formData.append("profilePhoto", user.profilePhoto);
            if (user.coverPhoto) formData.append("coverPhoto", user.coverPhoto);

            console.log("Sending form data:", Object.fromEntries(formData.entries()));

            const response = await createUser(formData);
            console.log("Created user:", response);

            localStorage.setItem("userEmail", user.email);
            setSuccess("Profile Created Successfully!");

            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Profile Created Successfully!",
            });

            setUser({
                name: "",
                username: "",
                password: "",
                email: "",
                age: "",
                location: "",
                bio: "",
                profilePhoto: null,
                coverPhoto: null
            });

            setPreview({
                profilePhoto: null,
                coverPhoto: null
            });

            document.querySelectorAll('input[type="file"]').forEach(input => input.value = '');

        } catch (error) {
            console.error("Error details:", error);
            let errorMessage = "Error creating profile. Please try again.";
            if (error.response) {
                if (error.response.status === 409) {
                    errorMessage = "This email is already registered. Please use a different email.";
                } else if (error.response.data?.message) {
                    errorMessage = error.response.data.message;
                } else {
                    errorMessage = `Server error: ${error.response.status}. Please try again.`;
                }
            } else if (error.request) {
                errorMessage = "No response from server. Please check your internet connection.";
            }

            setError(errorMessage);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: errorMessage,
            });
        }
    };

    // Inline styles
    const styles = {
        pageContainer: {
            backgroundColor: '#f9fafb',
            minHeight: '100vh',
            padding: '2rem 1rem',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
            color: '#333',
            lineHeight: 1.5
        },
        formCard: {
            maxWidth: '36rem',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            overflow: 'hidden'
        },
        formHeader: {
            background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
            padding: '1.5rem 2rem'
        },
        formTitle: {
            color: '#ffffff',
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '0.5rem'
        },
        formSubtitle: {
            color: '#bfdbfe',
            fontSize: '0.875rem'
        },
        formContent: {
            padding: '2rem'
        },
        formSection: {
            marginBottom: '1.5rem',
            animation: 'fadeIn 0.4s ease-out'
        },
        sectionTitle: {
            fontSize: '1.125rem',
            fontWeight: 500,
            color: '#1f2937',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid #e5e7eb',
            marginBottom: '1rem'
        },
        inputGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '1.5rem',
            '@media (min-width: 768px)': {
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
            }
        },
        inputGroup: {
            marginBottom: '1rem'
        },
        inputLabel: {
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: '#4b5563',
            marginBottom: '0.25rem'
        },
        inputField: {
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            color: '#374151',
            backgroundColor: '#fff',
            transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out'
        },
        textArea: {
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            color: '#374151',
            backgroundColor: '#fff',
            transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
            resize: 'none',
            minHeight: '100px'
        },
        photoContainer: {
            marginBottom: '1.5rem'
        },
        photoUploadLabel: {
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: '#4b5563',
            marginBottom: '0.5rem'
        },
        profilePhotoPreviewContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem'
        },
        photoPreview: {
            flexShrink: 0,
            width: '5rem',
            height: '5rem',
            borderRadius: '50%',
            backgroundColor: '#f3f4f6',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        profilePreviewImg: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        coverPhotoPreview: {
            height: '8rem',
            width: '100%',
            borderRadius: '0.5rem',
            backgroundColor: '#f3f4f6',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.5rem'
        },
        coverPreviewImg: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        uploadInfo: {
            flexGrow: 1
        },
        fileInput: {
            display: 'none'
        },
        uploadButton: {
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.5rem 1rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            backgroundColor: '#ffffff',
            color: '#4b5563',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background-color 0.15s ease-in-out'
        },
        uploadTip: {
            marginTop: '0.25rem',
            fontSize: '0.75rem',
            color: '#6b7280'
        },
        submitButton: {
            width: '100%',
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(to right, #2563eb, #4f46e5)',
            color: 'white',
            fontSize: '1rem',
            fontWeight: 500,
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
            marginTop: '2rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        },
        placeholderIcon: {
            width: '3rem',
            height: '3rem',
            color: '#d1d5db'
        },
        errorText: {
            color: '#ef4444',
            fontSize: '0.75rem',
            marginTop: '0.25rem'
        },
        successText: {
            color: '#10b981',
            fontSize: '0.75rem',
            marginTop: '0.25rem'
        }
    };

    // For responsive designs
    const mediaStyles = window.matchMedia("(min-width: 768px)").matches ? {
        inputGrid: {
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
        }
    } : {};

    // Combine styles with media queries
    const responsiveStyles = {
        ...styles,
        inputGrid: {
            ...styles.inputGrid,
            ...(mediaStyles.inputGrid || {})
        }
    };

    return (
        <div style={responsiveStyles.pageContainer}>
            <div style={responsiveStyles.formCard}>
                <div style={responsiveStyles.formHeader}>
                    <h2 style={responsiveStyles.formTitle}>Create Your Profile</h2>
                    <p style={responsiveStyles.formSubtitle}>Join our community and set up your personal profile</p>
                </div>
                
                <form onSubmit={handleSubmit} style={responsiveStyles.formContent}>
                    {/* Personal Information Section */}
                    <div style={responsiveStyles.formSection}>
                        <h3 style={responsiveStyles.sectionTitle}>Personal Information</h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: window.matchMedia("(min-width: 768px)").matches ? '1fr 1fr' : '1fr',
                            gap: '1.5rem',
                            marginTop: '1rem'
                        }}>
                            <div style={responsiveStyles.inputGroup}>
                                <label style={responsiveStyles.inputLabel} htmlFor="name">
                                    Full Name <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input
                                    style={responsiveStyles.inputField}
                                    type="text"
                                    id="name"
                                    value={user.name}
                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    required
                                />
                            </div>
                            
                            <div style={responsiveStyles.inputGroup}>
                                <label style={responsiveStyles.inputLabel} htmlFor="username">
                                    Username <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input
                                    style={responsiveStyles.inputField}
                                    type="text"
                                    id="username"
                                    value={user.username}
                                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                                    required
                                />
                            </div>
                            
                            <div style={responsiveStyles.inputGroup}>
                                <label style={responsiveStyles.inputLabel} htmlFor="email">
                                    Email <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input
                                    style={responsiveStyles.inputField}
                                    type="email"
                                    id="email"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    required
                                />
                            </div>
                            
                            <div style={responsiveStyles.inputGroup}>
                                <label style={responsiveStyles.inputLabel} htmlFor="password">
                                    Password <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input
                                    style={responsiveStyles.inputField}
                                    type="password"
                                    id="password"
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    required
                                />
                            </div>
                            
                            <div style={responsiveStyles.inputGroup}>
                                <label style={responsiveStyles.inputLabel} htmlFor="age">
                                    Age <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input
                                    style={responsiveStyles.inputField}
                                    type="number"
                                    id="age"
                                    min="1"
                                    value={user.age}
                                    onChange={(e) => setUser({ ...user, age: e.target.value })}
                                    required
                                />
                            </div>
                            
                            <div style={responsiveStyles.inputGroup}>
                                <label style={responsiveStyles.inputLabel} htmlFor="location">
                                    Location
                                </label>
                                <input
                                    style={responsiveStyles.inputField}
                                    type="text"
                                    id="location"
                                    value={user.location}
                                    onChange={(e) => setUser({ ...user, location: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Bio Section */}
                    <div style={responsiveStyles.formSection}>
                        <h3 style={responsiveStyles.sectionTitle}>About You</h3>
                        <div style={{ marginTop: '1rem' }}>
                            <label style={responsiveStyles.inputLabel} htmlFor="bio">
                                Bio
                            </label>
                            <textarea
                                style={responsiveStyles.textArea}
                                id="bio"
                                value={user.bio}
                                onChange={(e) => setUser({ ...user, bio: e.target.value })}
                                rows="4"
                                placeholder="Tell us about yourself..."
                            />
                        </div>
                    </div>
                    
                    {/* Photo Upload Section */}
                    <div style={responsiveStyles.formSection}>
                        <h3 style={responsiveStyles.sectionTitle}>Profile Photos</h3>
                        
                        {/* Profile Photo */}
                        <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
                            <label style={responsiveStyles.photoUploadLabel}>
                                Profile Photo
                            </label>
                            <div style={responsiveStyles.profilePhotoPreviewContainer}>
                                <div style={responsiveStyles.photoPreview}>
                                    {preview.profilePhoto ? (
                                        <img 
                                            src={preview.profilePhoto} 
                                            alt="Profile preview" 
                                            style={responsiveStyles.profilePreviewImg} 
                                        />
                                    ) : (
                                        <svg style={responsiveStyles.placeholderIcon} viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    )}
                                </div>
                                <div style={responsiveStyles.uploadInfo}>
                                    <input
                                        style={responsiveStyles.fileInput}
                                        type="file"
                                        id="profilePhoto"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, "profilePhoto")}
                                    />
                                    <label 
                                        style={responsiveStyles.uploadButton} 
                                        htmlFor="profilePhoto"
                                    >
                                        Upload Photo
                                    </label>
                                    <p style={responsiveStyles.uploadTip}>
                                        Recommended: Square image, at least 400x400px
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Cover Photo */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={responsiveStyles.photoUploadLabel}>
                                Cover Photo
                            </label>
                            <div style={responsiveStyles.coverPhotoPreview}>
                                {preview.coverPhoto ? (
                                    <img 
                                        src={preview.coverPhoto} 
                                        alt="Cover preview" 
                                        style={responsiveStyles.coverPreviewImg} 
                                    />
                                ) : (
                                    <svg style={responsiveStyles.placeholderIcon} viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                )}
                            </div>
                            <div style={{ marginTop: '0.5rem' }}>
                                <input
                                    style={responsiveStyles.fileInput}
                                    type="file"
                                    id="coverPhoto"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, "coverPhoto")}
                                />
                                <label 
                                    style={responsiveStyles.uploadButton} 
                                    htmlFor="coverPhoto"
                                >
                                    Upload Cover Image
                                </label>
                                <p style={responsiveStyles.uploadTip}>
                                    Recommended: 1200x400px
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Display error/success messages */}
                    {error && <p style={responsiveStyles.errorText}>{error}</p>}
                    {success && <p style={responsiveStyles.successText}>{success}</p>}
                    
                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        style={responsiveStyles.submitButton}
                    >
                        Create Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserForm;