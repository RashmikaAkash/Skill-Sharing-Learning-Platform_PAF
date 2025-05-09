import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import './SkillsPage.css';

const SkillsPage = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [editingSkill, setEditingSkill] = useState(null);
    const [categories, setCategories] = useState([]);
    const [viewMode, setViewMode] = useState('grid'); // grid or list
    const [newSkill, setNewSkill] = useState({
        name: '',
        description: '',
        category: '',
        level: 'Beginner',
        priority: 'Medium',
        dateAdded: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            const initialSkills = [
                {
                    _id: '1',
                    name: 'JavaScript',
                    description: 'Scripting language for web development with strong support for interactive web applications.',
                    category: 'Programming',
                    level: 'Advanced',
                    priority: 'High',
                    dateAdded: '2023-01-15'
                },
                {
                    _id: '2',
                    name: 'React',
                    description: 'JavaScript library for building user interfaces and single-page applications.',
                    category: 'Frontend',
                    level: 'Intermediate',
                    priority: 'High',
                    dateAdded: '2023-02-20'
                },
                {
                    _id: '3',
                    name: 'Node.js',
                    description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine for server-side applications.',
                    category: 'Backend',
                    level: 'Intermediate',
                    priority: 'Medium',
                    dateAdded: '2023-03-05'
                },
                {
                    _id: '4',
                    name: 'CSS',
                    description: 'Stylesheet language used for describing the presentation of a document written in HTML.',
                    category: 'Frontend',
                    level: 'Advanced',
                    priority: 'Medium',
                    dateAdded: '2023-01-10'
                }
            ];
            
            setSkills(initialSkills);
            
            // Extract unique categories
            const uniqueCategories = [...new Set(initialSkills.map(skill => skill.category))];
            setCategories(uniqueCategories);
            
            setLoading(false);
        }, 1000);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingSkill) {
            setEditingSkill(prev => ({
                ...prev,
                [name]: value
            }));
        } else {
            setNewSkill(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingSkill) {
            // Update existing skill
            setSkills(prev => 
                prev.map(skill => 
                    skill._id === editingSkill._id ? editingSkill : skill
                )
            );
            setEditingSkill(null);
        } else {
            // Add new skill
            const fakeId = Date.now().toString(); // Simulated ID
            const skillToAdd = { 
                ...newSkill, 
                _id: fakeId,
                dateAdded: new Date().toISOString().split('T')[0]
            };
            
            setSkills(prev => [...prev, skillToAdd]);
            
            // Update categories if new one
            if (!categories.includes(skillToAdd.category)) {
                setCategories(prev => [...prev, skillToAdd.category]);
            }
        }
        
        // Reset form
        setNewSkill({
            name: '',
            description: '',
            category: '',
            level: 'Beginner',
            priority: 'Medium',
            dateAdded: new Date().toISOString().split('T')[0]
        });
        setShowAddForm(false);
    };

    const handleEdit = (skill) => {
        setEditingSkill(skill);
        setShowAddForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this skill?')) {
            setSkills(prev => prev.filter(skill => skill._id !== id));
        }
    };

    const handleCancelEdit = () => {
        setEditingSkill(null);
        setShowAddForm(false);
    };

    const getLevelCounts = () => {
        const levelMap = {};
        skills.forEach(skill => {
            levelMap[skill.level] = (levelMap[skill.level] || 0) + 1;
        });
        return Object.entries(levelMap).map(([level, count]) => ({
            level,
            count
        }));
    };

    const getCategoryCounts = () => {
        const categoryMap = {};
        skills.forEach(skill => {
            categoryMap[skill.category] = (categoryMap[skill.category] || 0) + 1;
        });
        return Object.entries(categoryMap).map(([category, count]) => ({
            name: category,
            value: count
        }));
    };

    // Filter skills based on search term and category
    const filteredSkills = skills.filter(skill => {
        const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            skill.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === '' || skill.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    // COLORS for pie chart
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    if (loading) return <div className="skills-loading">Loading skills...</div>;
    if (error) return <div className="skills-error">{error}</div>;

    return (
        <div className="skills-container">
            <div className="skills-header">
                <h1>Skills Directory</h1>
                <div className="header-actions">
                    <button 
                        className="view-toggle-btn"
                        onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                    >
                        {viewMode === 'grid' ? 'List View' : 'Grid View'}
                    </button>
                    <button 
                        className="add-skill-btn"
                        onClick={() => {
                            if (editingSkill) {
                                handleCancelEdit();
                            } else {
                                setShowAddForm(!showAddForm);
                            }
                        }}
                    >
                        {showAddForm ? 'Cancel' : 'Add New Skill'}
                    </button>
                </div>
            </div>

            <div className="filter-container">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="category-filter">
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>

            {showAddForm && (
                <form className="add-skill-form" onSubmit={handleSubmit}>
                    <h2>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h2>
                    <div className="form-group">
                        <label htmlFor="name">Skill Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={editingSkill ? editingSkill.name : newSkill.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={editingSkill ? editingSkill.description : newSkill.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="category">Category:</label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={editingSkill ? editingSkill.category : newSkill.category}
                                onChange={handleInputChange}
                                required
                                list="categories"
                            />
                            <datalist id="categories">
                                {categories.map(category => (
                                    <option key={category} value={category} />
                                ))}
                            </datalist>
                        </div>

                        <div className="form-group">
                            <label htmlFor="level">Proficiency Level:</label>
                            <select
                                id="level"
                                name="level"
                                value={editingSkill ? editingSkill.level : newSkill.level}
                                onChange={handleInputChange}
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Expert">Expert</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="priority">Priority:</label>
                        <select
                            id="priority"
                            name="priority"
                            value={editingSkill ? editingSkill.priority : newSkill.priority}
                            onChange={handleInputChange}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div className="form-buttons">
                        <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
                            Cancel
                        </button>
                        <button type="submit" className="submit-btn">
                            {editingSkill ? 'Update Skill' : 'Add Skill'}
                        </button>
                    </div>
                </form>
            )}

            {filteredSkills.length === 0 ? (
                <div className="no-skills">
                    <p>No skills found matching your criteria.</p>
                </div>
            ) : viewMode === 'grid' ? (
                <div className="skills-grid">
                    {filteredSkills.map((skill) => (
                        <div key={skill._id} className={`skill-card priority-${skill.priority.toLowerCase()}`}>
                            <div className="skill-header">
                                <h3>{skill.name}</h3>
                                <div className="skill-actions">
                                    <button className="edit-btn" onClick={() => handleEdit(skill)}>
                                        Edit
                                    </button>
                                    <button className="delete-btn" onClick={() => handleDelete(skill._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <p className="skill-description">{skill.description}</p>
                            <div className="skill-details">
                                <span className="skill-category">{skill.category}</span>
                                <span className={`skill-level level-${skill.level.toLowerCase()}`}>
                                    {skill.level}
                                </span>
                            </div>
                            <div className="skill-meta">
                                <span className={`skill-priority priority-${skill.priority.toLowerCase()}`}>
                                    {skill.priority} Priority
                                </span>
                                <span className="skill-date">Added: {skill.dateAdded}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="skills-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Level</th>
                                <th>Priority</th>
                                <th>Date Added</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSkills.map((skill) => (
                                <tr key={skill._id}>
                                    <td>
                                        <div className="skill-name-cell">
                                            <strong>{skill.name}</strong>
                                            <p className="cell-description">{skill.description}</p>
                                        </div>
                                    </td>
                                    <td><span className="skill-category">{skill.category}</span></td>
                                    <td><span className={`skill-level level-${skill.level.toLowerCase()}`}>{skill.level}</span></td>
                                    <td><span className={`skill-priority priority-${skill.priority.toLowerCase()}`}>{skill.priority}</span></td>
                                    <td>{skill.dateAdded}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="edit-btn" onClick={() => handleEdit(skill)}>Edit</button>
                                            <button className="delete-btn" onClick={() => handleDelete(skill._id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="skills-dashboard">
                <h2>Skills Analytics Dashboard</h2>
                
                <div className="charts-container">
                    <div className="chart-box">
                        <h3>Skill Levels Overview</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={getLevelCounts()}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="level" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#3498db" name="Number of Skills" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    
                    <div className="chart-box">
                        <h3>Skills by Category</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={getCategoryCounts()}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={true}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {getCategoryCounts().map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                
                <div className="skills-summary">
                    <div className="summary-card">
                        <h4>Total Skills</h4>
                        <p className="summary-value">{skills.length}</p>
                    </div>
                    <div className="summary-card">
                        <h4>Categories</h4>
                        <p className="summary-value">{categories.length}</p>
                    </div>
                    <div className="summary-card">
                        <h4>Advanced/Expert Skills</h4>
                        <p className="summary-value">
                            {skills.filter(s => s.level === 'Advanced' || s.level === 'Expert').length}
                        </p>
                    </div>
                    <div className="summary-card">
                        <h4>High Priority</h4>
                        <p className="summary-value">
                            {skills.filter(s => s.priority === 'High').length}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillsPage;