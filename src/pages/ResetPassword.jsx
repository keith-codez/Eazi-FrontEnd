import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const { uid, token } = useParams(); // Get UID and token from URL
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            // Call the backend to confirm the password reset
            const response = await fetch("http://127.0.0.1:8000/api/staff/auth/users/reset_password_confirm/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uid,
                    token,
                    new_password: newPassword,
                }),
            });

            if (response.ok) {
                setMessage("Password successfully reset! Redirecting...");
                setTimeout(() => navigate("/login"), 3000); // Redirect to login page after success
            } else {
                const data = await response.json();
                setMessage(data.error || "Error resetting password.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;
