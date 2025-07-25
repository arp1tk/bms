import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const containerStyle = {
    maxWidth: '440px',
    margin: '60px auto',
    padding: '32px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    color: '#333',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    transition: '0.3s ease'
};

const headingStyle = {
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '28px',
    fontWeight: '600',
    color: '#007bff'
};

const formGroupStyle = {
    marginBottom: '20px'
};

const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    fontSize: '15px',
    color: '#333'
};

const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: '#f9f9f9',
    color: '#333',
    outline: 'none',
    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
};

const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease-in-out'
};

const messageStyle = {
    marginTop: '20px',
    padding: '12px',
    borderRadius: '6px',
    textAlign: 'center',
    fontWeight: '500'
};

const successMessageStyle = {
    ...messageStyle,
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb'
};

const errorMessageStyle = {
    ...messageStyle,
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb'
};

const userInfoCardStyle = {
    marginTop: '30px',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f1f1f1',
    color: '#333',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
};

const profilePicStyle = {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '15px',
    border: '2px solid #007bff'
};

const footerTextStyle = {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px',
    color: '#555'
};

const linkStyle = {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: '500',
    marginLeft: '4px'
};

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setMessageType('');
        setLoggedInUser(null);
        setLoading(true);
        try {
            const response = await axios.post('https://bms-t46x.onrender.com/api/users/login', {
                email,
                password,
            });

            setMessage('Login successful!');
            setMessageType('success');
            setLoggedInUser(response.data);
            localStorage.setItem('userInfo', JSON.stringify(response.data));
console.log(response.data)
            setEmail('');
            setPassword('');
        if(response.data.isAdmin){
            navigate('/admin');
        }
        else{
            navigate('/dashboard')
        }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Invalid email or password.');
            setMessageType('error');
        }
        finally{
            setLoading(false)
        }
    };

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>Welcome Back</h2>
            <form onSubmit={handleSubmit}>
                <div style={formGroupStyle}>
                    <label style={labelStyle} htmlFor="loginEmail">Email</label>
                    <input
                        type="email"
                        id="loginEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={inputStyle}
                        onFocus={(e) => e.target.style.border = '1px solid #007bff'}
                        onBlur={(e) => e.target.style.border = '1px solid #ccc'}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label style={labelStyle} htmlFor="loginPassword">Password</label>
                    <input
                        type="password"
                        id="loginPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={inputStyle}
                        onFocus={(e) => e.target.style.border = '1px solid #007bff'}
                        onBlur={(e) => e.target.style.border = '1px solid #ccc'}
                    />
                </div>
                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                >
                   {loading? 'loging in...' : 'Log in'}
                </button>
            </form>

            {message && (
                <p style={messageType === 'success' ? successMessageStyle : errorMessageStyle}>
                    {message}
                </p>
            )}

            {loggedInUser && (
                <div style={userInfoCardStyle}>
                    <h3 style={{ marginBottom: '10px' }}>Logged In User</h3>
                    {loggedInUser.pic && <img src={loggedInUser.pic} alt="Profile" style={profilePicStyle} />}
                    <p><strong>Name:</strong> {loggedInUser.name}</p>
                    <p><strong>Email:</strong> {loggedInUser.email}</p>
                    {loggedInUser.isAdmin && <p><strong>Role:</strong> Admin</p>}
                    {loggedInUser.token && <p><strong>Token:</strong> {loggedInUser.token.substring(0, 18)}...</p>}
                </div>
            )}

            <p style={footerTextStyle}>
                Don’t have an account?
                <Link to="/signup" style={linkStyle}>Sign up</Link>
            </p>
        </div>
    );
}

export default Login;
