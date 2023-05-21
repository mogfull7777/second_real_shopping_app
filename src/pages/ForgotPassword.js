import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axios from "axios";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    const passwordChangeSubmitHendle = async (e) => {
        e.preventDefault()

        try {

            const emailList = {
                email : email
            }

            const changeInfo = await axios.post('http://localhost:3000/api/auth/find/password', emailList)

            console.log("#########", changeInfo)

            if (changeInfo.status === 201) {

                alert('Done!')

            }

        } catch (err) {

            console.log(err)

        }
    }

    return (
        <Container>
            <Row className={'justify-content-center'}>
                <Col xs={12} md={6} className={'mt-5'}>

                    <h1>Forgot Password</h1>

                    <Form onSubmit={passwordChangeSubmitHendle}>

                        <Form.Group>
                            <Form.Text className="text-muted mt-3">
                                가입 시 사용한 이메일을 입력해주세요.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="jystore@jystore.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="dark" type="submit">
                            Submit
                        </Button>

                    </Form>

                </Col>
            </Row>
        </Container>
    );
};

export default ForgotPassword;