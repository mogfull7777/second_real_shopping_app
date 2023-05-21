import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {

    const params = useParams();

    const [newPassword, setNewPassword] = useState("")

    const changePasswordSubmitHendle = async () => {

        try {

            const changePasswordList = {
                token : {params},
                newPassword : newPassword
            }

            const changePasswordParams = await axios.put(`http://localhost:3000/api/auth/change/password${params}`)

            console.log('%%%%%%%%%%%%%' , changePasswordParams)
            console.log('^^^^^^^^^^^^^^' , changePasswordList)

        //     이메일에 도착한 url이랑 어떻게 연결시키지...
        //     쿠키값에서 어떻게 토큰값을 들고오지...


        } catch (err) {

            console.log(err.massage)

        }

    }


    return (
        <Container>
            <Row className={"justify-content-center"}>
                <Col xs={12} md={6}className={'mt-5'}>
                    <Form>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>
                                New Password
                            </Form.Label>
                            <Form.Text>
                                변경하실 비밀번호를 입력해주세요.
                            </Form.Text>
                            <Form.Control
                                type="password"
                                placeholder="new password"
                            >
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            create new password
                        </Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ChangePassword;