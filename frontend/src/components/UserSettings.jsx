import { useState } from "react";

// Always capitalize component names in React
function UserSettings() {
    // State to hold the user's settings
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Function to handle form submission
    const handleSave = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        alert("Settings saved!");
    };


return (
    <div>
        {/* Page Title */}
        <h1>User Settings</h1>
        <div>
            <label>Name:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
            />
        </div>
    
    {/* Browser will validate it's an email format automatically */}
    <div>
        <label>Email:</label>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
        />
    </div>

    {/* Hides the characters for password input automatically */}
    <div>
        <label>New Password:</label>
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
        />
    </div>
    {/* Same as above, tied to confirmPassword state instead */}
    <div>
        <label>Confirm Password:</label>
        <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
        />
    </div>

    <button onClick={handleSave}>Save Changes</button>
    </div>
);
}

export default UserSettings;