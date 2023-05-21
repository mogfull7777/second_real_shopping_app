import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const FindEmail = () => {

    const navigate = useNavigate()

    const [phoneNumber, setPhoneNumber] = useState("");

    const findEmailSubmitHendle = async (e) => {
        e.preventDefault()

        try {

            const findEmailList = {
                phone: phoneNumber
            }

            const findEmailInfo = await axios.post("http://localhost:3000/api/auth/phone/verification", findEmailList)

            console.log("&&&&&&&&&&&", findEmailInfo)

            if (findEmailInfo.status === 201) {
                alert(" please chack your phone massage ")

                localStorage.setItem('phone', findEmailInfo.data.to)

                navigate('/sand/phone')

            }

        } catch (err) {

            console.log(err)

        }
    }

    return (
        <Container>
            <Row className={"justify-content-center"}>
                <Col xs={12} md={6}className={'mt-5'}>
                    <Form onSubmit={findEmailSubmitHendle}>

                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>
                                Phone Number
                            </Form.Label>
                            <Form.Text>
                                가입시 사용한 핸드폰 번호를 입력해주세요.
                            </Form.Text>
                            <Form.Control
                                type="phone"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={e=> setPhoneNumber(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Find Email
                        </Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default FindEmail;