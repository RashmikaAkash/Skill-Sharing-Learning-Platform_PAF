import React, { useState } from "react";
import web from '../images/web.jpg';

const CourseDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [enrollData, setEnrollData] = useState({
    name: "",
    email: "",
  });
  const [isEnrolling, setIsEnrolling] = useState(false);
  
  const handleEnroll = (e) => {
    e.preventDefault();
    // Simulate success message
    setIsEnrolling(true);
    setTimeout(() => {
      setIsEnrolling(false);
      alert(`Thank you ${enrollData.name}! You've been enrolled in Introduction to Web Development.`);
      setEnrollData({ name: "", email: "" });
    }, 1500);
  };

  // Inline styles
  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f7f9fc",
      minHeight: "100vh",
      padding: "0 0 40px 0",
      margin: 0,
    },
    header: {
      backgroundColor: "#172b4d",
      color: "white",
      padding: "30px 20px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
    },
    headerContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "24px"
    },
    courseLabel: {
      backgroundColor: "#ffab00",
      color: "#172b4d",
      fontWeight: "bold",
      padding: "5px 12px",
      borderRadius: "20px",
      fontSize: "14px",
      display: "inline-block",
      marginBottom: "8px"
    },
    courseTitle: {
      fontSize: "36px",
      fontWeight: "800",
      margin: "0 0 16px 0",
    },
    ratingContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "12px"
    },
    starRating: {
      color: "#ffab00",
      fontSize: "20px"
    },
    ratingNumber: {
      fontWeight: "bold",
      marginLeft: "8px"
    },
    ratingCount: {
      color: "#b3bac5",
      marginLeft: "8px"
    },
    banner: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "30px",
      flexWrap: "wrap"
    },
    courseImage: {
      width: "300px",
      height: "200px",
      objectFit: "cover",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)"
    },
    mainContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      display: "flex",
      flexDirection: "row",
      gap: "30px",
      flexWrap: "wrap"
    },
    leftColumn: {
      flex: "1 1 650px",
    },
    rightColumn: {
      flex: "0 0 350px",
    },
    tabNav: {
      display: "flex",
      borderBottom: "1px solid #e1e4e8",
      marginBottom: "24px"
    },
    tab: {
      padding: "12px 24px",
      cursor: "pointer",
      fontWeight: "500",
      color: "#5e6c84",
      borderBottom: "3px solid transparent"
    },
    activeTab: {
      color: "#0052cc",
      borderBottom: "3px solid #0052cc"
    },
    tabContent: {
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
    },
    enrollCard: {
      backgroundColor: "white",
      padding: "24px",
      borderRadius: "8px",
      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
      position: "sticky",
      top: "20px"
    },
    priceSection: {
      marginBottom: "24px"
    },
    currentPrice: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#172b4d"
    },
    originalPrice: {
      textDecoration: "line-through",
      color: "#5e6c84",
      marginLeft: "10px"
    },
    discount: {
      backgroundColor: "#e6fcf5",
      color: "#00875a",
      padding: "4px 8px",
      borderRadius: "4px",
      fontWeight: "bold",
      fontSize: "14px",
      marginLeft: "10px"
    },
    enrollButton: {
      backgroundColor: "#0052cc",
      color: "white",
      border: "none",
      padding: "14px 0",
      borderRadius: "4px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      width: "100%",
      marginBottom: "16px",
      transition: "background-color 0.2s"
    },
    enrollButtonHover: {
      backgroundColor: "#003d99"
    },
    courseIncludes: {
      marginTop: "24px"
    },
    includesTitle: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "16px"
    },
    includesList: {
      listStyle: "none",
      padding: 0,
      margin: 0
    },
    includesItem: {
      display: "flex",
      alignItems: "center",
      marginBottom: "12px",
      fontSize: "14px"
    },
    icon: {
      marginRight: "10px",
      color: "#0052cc"
    },
    formGroup: {
      marginBottom: "16px"
    },
    input: {
      width: "100%",
      padding: "12px",
      fontSize: "14px",
      border: "1px solid #dfe1e6",
      borderRadius: "4px",
      boxSizing: "border-box"
    },
    tabItem: {
      marginBottom: "20px"
    },
    sectionHeading: {
      fontSize: "20px",
      fontWeight: "600",
      marginBottom: "16px",
      color: "#172b4d"
    },
    learningPoints: {
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
      marginBottom: "24px"
    },
    learningItem: {
      flex: "1 1 45%",
      display: "flex",
      alignItems: "center",
      padding: "8px 0"
    },
    instructorSection: {
      display: "flex",
      alignItems: "flex-start",
      gap: "20px",
      padding: "20px 0",
      borderTop: "1px solid #e1e4e8",
      marginTop: "20px"
    },
    instructorImage: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      objectFit: "cover"
    },
    instructorName: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "4px"
    },
    instructorTitle: {
      color: "#5e6c84",
      marginBottom: "12px"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.banner}>
            <div>
              <span style={styles.courseLabel}>BESTSELLER</span>
              <h1 style={styles.courseTitle}>Introduction to Web Development</h1>
              <div style={styles.ratingContainer}>
                <span style={styles.starRating}>★★★★★</span>
                <span style={styles.ratingNumber}>4.8</span>
                <span style={styles.ratingCount}>(1,245 students)</span>
              </div>
              <p>Master the essentials of HTML, CSS, and JavaScript for modern web development</p>
            </div>
            <img 
              src={web} 
              alt="Web Development Course" 
              style={styles.courseImage}
            />
          </div>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.leftColumn}>
          <div style={styles.tabNav}>
            <div 
              style={{...styles.tab, ...(activeTab === "about" ? styles.activeTab : {})}}
              onClick={() => setActiveTab("about")}
            >
              About
            </div>
            <div 
              style={{...styles.tab, ...(activeTab === "curriculum" ? styles.activeTab : {})}}
              onClick={() => setActiveTab("curriculum")}
            >
              Curriculum
            </div>
            <div 
              style={{...styles.tab, ...(activeTab === "instructor" ? styles.activeTab : {})}}
              onClick={() => setActiveTab("instructor")}
            >
              Instructor
            </div>
            <div 
              style={{...styles.tab, ...(activeTab === "reviews" ? styles.activeTab : {})}}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </div>
          </div>

          <div style={styles.tabContent}>
            {activeTab === "about" && (
              <div>
                <div style={styles.tabItem}>
                  <h3 style={styles.sectionHeading}>Course Description</h3>
                  <p>
                    This comprehensive course is designed for beginners who want to learn web development from the ground up. 
                    You'll master the core technologies that power the modern web: HTML for structure, CSS for styling, and 
                    JavaScript for interactivity. By the end of this course, you'll have the skills to build responsive 
                    websites and have a solid foundation for more advanced web development frameworks.
                  </p>
                </div>

                <div style={styles.tabItem}>
                  <h3 style={styles.sectionHeading}>What You'll Learn</h3>
                  <div style={styles.learningPoints}>
                    <div style={styles.learningItem}>
                      <span style={styles.icon}>✓</span> HTML5 document structure and semantics
                    </div>
                    <div style={styles.learningItem}>
                      <span style={styles.icon}>✓</span> CSS styling and responsive design
                    </div>
                    <div style={styles.learningItem}>
                      <span style={styles.icon}>✓</span> JavaScript fundamentals and DOM manipulation
                    </div>
                    <div style={styles.learningItem}>
                      <span style={styles.icon}>✓</span> Creating interactive web forms
                    </div>
                    <div style={styles.learningItem}>
                      <span style={styles.icon}>✓</span> Modern CSS frameworks
                    </div>
                    <div style={styles.learningItem}>
                      <span style={styles.icon}>✓</span> Web accessibility principles
                    </div>
                    <div style={styles.learningItem}>
                      <span style={styles.icon}>✓</span> Version control with Git
                    </div>
                    <div style={styles.learningItem}>
                      <span style={styles.icon}>✓</span> Deploying websites to production
                    </div>
                  </div>
                </div>

                <div style={styles.tabItem}>
                  <h3 style={styles.sectionHeading}>Prerequisites</h3>
                  <p>
                    No prior programming experience required! Just bring your computer (Windows, Mac, or Linux), 
                    a modern web browser, and a text editor. This course starts from absolute basics and progressively 
                    builds your skills.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "curriculum" && (
              <div>
                <h3 style={styles.sectionHeading}>Course Curriculum</h3>
                <div style={{marginBottom: "20px"}}>
                  <h4 style={{fontWeight: "600", marginBottom: "10px"}}>Module 1: HTML Fundamentals</h4>
                  <ul style={{paddingLeft: "20px"}}>
                    <li>Introduction to Web Development</li>
                    <li>Setting Up Your Development Environment</li>
                    <li>HTML Document Structure</li>
                    <li>Working with Text Elements</li>
                    <li>Lists, Links and Images</li>
                    <li>HTML Tables and Forms</li>
                    <li>HTML5 Semantic Elements</li>
                    <li>Project: Building a Personal Profile Page</li>
                  </ul>
                </div>
                
                <div style={{marginBottom: "20px"}}>
                  <h4 style={{fontWeight: "600", marginBottom: "10px"}}>Module 2: CSS Styling</h4>
                  <ul style={{paddingLeft: "20px"}}>
                    <li>CSS Syntax and Selectors</li>
                    <li>Working with Colors and Backgrounds</li>
                    <li>Text Styling and Typography</li>
                    <li>Box Model and Layout</li>
                    <li>Flexbox and Grid Systems</li>
                    <li>Responsive Design and Media Queries</li>
                    <li>CSS Transitions and Animations</li>
                    <li>Project: Styling Your Profile Page</li>
                  </ul>
                </div>
                
                <div style={{marginBottom: "20px"}}>
                  <h4 style={{fontWeight: "600", marginBottom: "10px"}}>Module 3: JavaScript Basics</h4>
                  <ul style={{paddingLeft: "20px"}}>
                    <li>Introduction to JavaScript</li>
                    <li>Variables, Data Types, and Operators</li>
                    <li>Control Flow: Conditionals and Loops</li>
                    <li>Functions and Scope</li>
                    <li>DOM Manipulation</li>
                    <li>Event Handling</li>
                    <li>Working with Arrays and Objects</li>
                    <li>Project: Adding Interactivity to Your Website</li>
                  </ul>
                </div>
                
                <div>
                  <h4 style={{fontWeight: "600", marginBottom: "10px"}}>Module 4: Final Project</h4>
                  <ul style={{paddingLeft: "20px"}}>
                    <li>Project Planning and Wireframing</li>
                    <li>Building the HTML Structure</li>
                    <li>Styling with CSS</li>
                    <li>Implementing JavaScript Functionality</li>
                    <li>Testing and Debugging</li>
                    <li>Optimizing for Different Devices</li>
                    <li>Deployment and Publishing</li>
                    <li>Next Steps in Web Development</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "instructor" && (
              <div>
                <div style={styles.instructorSection}>
                  <img 
                    src="/api/placeholder/200/200" 
                    alt="Sarah Johnson" 
                    style={styles.instructorImage}
                  />
                  <div>
                    <h3 style={styles.instructorName}>Sarah Johnson</h3>
                    <p style={styles.instructorTitle}>Senior Web Developer & Instructor</p>
                    <p>
                      Sarah has over 10 years of experience in web development and has worked with companies 
                      like Google, Amazon, and various startups. She specializes in front-end development 
                      and is passionate about teaching others the skills they need to succeed in tech.
                    </p>
                    <p style={{marginTop: "12px"}}>
                      Sarah has taught over 50,000 students worldwide and maintains a 4.8 instructor rating 
                      across all her courses. Her teaching style focuses on real-world applications and 
                      building projects that can be added to your portfolio.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h3 style={styles.sectionHeading}>Student Reviews</h3>
                
                <div style={{borderBottom: "1px solid #e1e4e8", paddingBottom: "20px", marginBottom: "20px"}}>
                  <div style={{display: "flex", alignItems: "center", marginBottom: "8px"}}>
                    <span style={{color: "#ffab00", marginRight: "8px"}}>★★★★★</span>
                    <span style={{fontWeight: "600"}}>James W.</span>
                    <span style={{color: "#5e6c84", marginLeft: "8px", fontSize: "14px"}}>2 weeks ago</span>
                  </div>
                  <p>
                    This course was exactly what I needed to start my journey in web development. 
                    Sarah explains everything in a clear and concise way. The projects were challenging 
                    but achievable, and I feel confident in my skills now.
                  </p>
                </div>
                
                <div style={{borderBottom: "1px solid #e1e4e8", paddingBottom: "20px", marginBottom: "20px"}}>
                  <div style={{display: "flex", alignItems: "center", marginBottom: "8px"}}>
                    <span style={{color: "#ffab00", marginRight: "8px"}}>★★★★★</span>
                    <span style={{fontWeight: "600"}}>Maria G.</span>
                    <span style={{color: "#5e6c84", marginLeft: "8px", fontSize: "14px"}}>1 month ago</span>
                  </div>
                  <p>
                    I've tried other web development courses before, but this one finally made things 
                    click for me. The curriculum is well-structured, and the instructor is very 
                    responsive to questions. Highly recommend!
                  </p>
                </div>
                
                <div>
                  <div style={{display: "flex", alignItems: "center", marginBottom: "8px"}}>
                    <span style={{color: "#ffab00", marginRight: "8px"}}>★★★★☆</span>
                    <span style={{fontWeight: "600"}}>David T.</span>
                    <span style={{color: "#5e6c84", marginLeft: "8px", fontSize: "14px"}}>2 months ago</span>
                  </div>
                  <p>
                    Great course overall. I would have liked more advanced JavaScript topics covered, 
                    but for a beginner course, it's excellent. The projects are practical and I was 
                    able to build a portfolio website by the end.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={styles.rightColumn}>
          <div style={styles.enrollCard}>
            <div style={styles.priceSection}>
              <span style={styles.currentPrice}>$49.99</span>
              <span style={styles.originalPrice}>$99.99</span>
              <span style={styles.discount}>50% OFF</span>
            </div>
            
            <form onSubmit={handleEnroll}>
              <div style={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={enrollData.name}
                  onChange={(e) => setEnrollData({ ...enrollData, name: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={enrollData.email}
                  onChange={(e) => setEnrollData({ ...enrollData, email: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
              <button
                type="submit"
                style={styles.enrollButton}
                onMouseOver={(e) => (e.target.style.backgroundColor = styles.enrollButtonHover.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = styles.enrollButton.backgroundColor)}
                disabled={isEnrolling}
              >
                {isEnrolling ? "Processing..." : "Enroll Now"}
              </button>
              <p style={{textAlign: "center", fontSize: "14px", color: "#5e6c84"}}>
                30-day money-back guarantee
              </p>
            </form>
            
            <div style={styles.courseIncludes}>
              <h4 style={styles.includesTitle}>This course includes:</h4>
              <ul style={styles.includesList}>
                <li style={styles.includesItem}>
                  <span style={styles.icon}>📹</span> 42 hours of on-demand video
                </li>
                <li style={styles.includesItem}>
                  <span style={styles.icon}>📄</span> 20 articles and resources
                </li>
                <li style={styles.includesItem}>
                  <span style={styles.icon}>💻</span> 15 coding exercises
                </li>
                <li style={styles.includesItem}>
                  <span style={styles.icon}>📱</span> Access on mobile and desktop
                </li>
                <li style={styles.includesItem}>
                  <span style={styles.icon}>🏆</span> Certificate of completion
                </li>
                <li style={styles.includesItem}>
                  <span style={styles.icon}>⏱️</span> Lifetime access
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;