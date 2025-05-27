
import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import './Login.css';
import { AuthService } from '../../service/Auth.service';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        if (!email && !password) {
            toast.error("Email and password required.");
            return;
        }
        await AuthService.login({ email: email, password: password }).then((res) => {
            if (res.status === 200) {
                toast.success("Login Successfully")
                localStorage.setItem("authKey", res.data)
                navigate('/dashboard');
            }
        }).catch(err => {
            console.log(err)
        })
    };

    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100">
            <Card className="login-card shadow-lg p-4 ">
                <Card.Body className="p-4">
                    <div className="text-center mb-4">
                        <div className="user-icon-container d-inline-block p-3 rounded-circle">
                            <FaUser size={30} color="#58327e" />
                        </div>
                        <h2  style={{color:"#58327e"}}>Welcome Back</h2>
                        <p className="text-muted" style={{ color:"#58327e",fontSize: '0.9rem' }}>Please enter your credentials to login</p>
                    </div>

                    <Form.Group className="mb-4">
                        <Form.Label className="text-muted" style={{ fontSize: '0.9rem' }}>Email address</Form.Label>
                        <div className="input-group input-container">
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="form-input"
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="text-muted" style={{ fontSize: '0.9rem' }}>Password</Form.Label>
                        <div className="input-group input-container">
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="form-input"
                            />
                        </div>
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100 mb-3 login-button"
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}
