import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginSubmitHendle = async (e) => {
        e.preventDefault()

        try {

            const loginList = {
                email : email,
                password : password
            }

            const loginInfo = await axios.post("http://localhost:3000/api/auth/login", loginList)

            console.log("^^^^^^^^^^^^^", loginInfo)

            if (loginInfo.status === 200) {

                alert('login success')

                localStorage.setItem("token", loginInfo.data.currentHashedRefreshToken)

                navigate('/profile')

            }

        //      쿠키에서 어떻게 토큰을 빼올까?

        } catch (err) {
            console.log(err)

        }
    }



    return (
        <Container>
            <Row className={"justify-content-center"}>
                <Col xs={12} md={6}className={'mt-5'}>
                    <Form onSubmit={loginSubmitHendle}>

                        <h1>Login</h1>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>

                        <Form.Text className="text-muted mt-3">
                            <Link to={'/find/email'}>
                                아이디를 잊어버리셨습니까?
                            </Link>
                            <Link to={'/forgot/password'} className={'ml-2'}>
                                비밀번호를 잊어버리셨습니까?
                            </Link>
                        </Form.Text>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;