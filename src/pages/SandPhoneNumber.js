import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import axios from "axios";

const SandPhoneNumber = () => {

    const [codeNumber, setCodeNumber] = useState("");

    const codeSubmitHendle = async (e) => {
        e.preventDefault()

        try {

            const getPhoneNumber = await localStorage.getItem('phone')

            const codeList = {
                phone: `${getPhoneNumber}`,
                code: codeNumber
            }

            const codeInfo = await axios.post('http://localhost:3000/api/auth/phone/check', codeList)

            console.log("$$$$$$$$$$$$$$$$", codeInfo)

            if (codeInfo.status === 201) {

                alert("Done!")

            }

        } catch (err) {
            console.log(err.massage)
        }

    }

    return (
        <Container>
            <Row className={"justify-content-center"}>
                <Col xs={12} md={6}className={'mt-5'}>
                    <Form onSubmit={codeSubmitHendle}>

                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>
                                Code Number
                            </Form.Label>
                            <Form.Text>
                                메세지로 받은 코드를 입력해주세요.
                            </Form.Text>
                            <Form.Control
                                type="codenumber"
                                placeholder="Code Number"
                                value={codeNumber}
                                onChange={e=> setCodeNumber(e.target.value)}
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

export default SandPhoneNumber;