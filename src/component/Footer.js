import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

const Footer = () => {
    return (
        <Container>
            <Row className={'text-center'}>
                <Col className={'mt-5 mb-5'}>
                    copyright &copy; Junyoung An
                </Col>
            </Row>
        </Container>
    );
};

export default Footer;