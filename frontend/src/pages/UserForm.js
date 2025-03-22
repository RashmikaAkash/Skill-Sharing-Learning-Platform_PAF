import React, { useState } from "react";
import { createUser } from "../api";

const UserForm = () => {
    const [user, setUser] = useState({ name: "", email: "" ,age:""});

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createUser(user);
        alert("User Created!");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Name" 
                onChange={(e) => setUser({ ...user, name: e.target.value })} 
            />
            <input 
                type="email" 
                placeholder="Email" 
                onChange={(e) => setUser({ ...user, email: e.target.value })} 
            />
             <input
      type="number"
      placeholder="Age"
      value={user.age} // Ensure controlled input
      onChange={(e) => setUser({ ...user, age: e.target.value })}
      min="1" // Optional: Prevent negative values
    />


            <button type="submit">Create User</button>
        </form>
    );
};

export default UserForm;
