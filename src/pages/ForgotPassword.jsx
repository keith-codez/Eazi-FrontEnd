import { useState } from "react";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/api/staff/auth/users/reset_password/", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            console.log(response); 

            if (response.ok) {
                setMessage("Password reset link sent Check your email.");
            } else {
                setMessage("Error sending reset email.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Something went wrong, Please try again. ");
        }
    };
    
    return (
        <div>
            <h2> Forgot Password</h2>
            <p>Enter your email to recieve a password reset link</p>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <button type="submit">Send Reset Link</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;