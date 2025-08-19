import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isHovered, setIsHovered] = useState(false);



    const handleLogin = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/user/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('access_token', data.access); // save token
                alert('✅ Login successful!');
                window.location.href = "/posts"; // redirect to posts page
            } else {
                alert('❌ Invalid username or password');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('⚠️ Server error. Try again.');
        }
    };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            height: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'Poppins, sans-serif'
        }}>
            <div style={{
                backgroundColor: '#d8b4fe', padding: '40px 30px', borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center', width: '320px'
            }}>
                <div style={{ fontSize: '26px', fontWeight: '700', marginBottom: '10px', color: '#333' }}>
                    Weblog
                </div>
                <div style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>
                    Login to your account
                </div>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                        width: '100%', padding: '12px 15px', margin: '12px 0',
                        borderRadius: '8px', border: '1px solid #ccc', fontSize: '14px'
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: '100%', padding: '12px 15px', margin: '12px 0',
                        borderRadius: '8px', border: '1px solid #ccc', fontSize: '14px'
                    }}
                />

                <button
                    onClick={handleLogin}
                    style={{
                        width: '100%', padding: '12px',
                        backgroundColor: isHovered ? '#357ABD' : '#4a90e2',
                        color: 'white', border: 'none', borderRadius: '8px',
                        fontSize: '16px', fontWeight: '600', cursor: 'pointer',
                        marginTop: '15px', transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
