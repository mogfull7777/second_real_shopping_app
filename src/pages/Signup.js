import React, {useCallback, useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import data from "bootstrap/js/src/dom/data";
import {signup} from "../actions/userActions";

const Signup = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhoneNumber] = useState("");

    // const [allCheck, setAllCheck] = useState(false);
    // const [fourtin, setFourtin] = useState(false);
    // const [yesIUsed, setyesIUsed] = useState(false);
    // const [agreed, setagreed] = useState(false);

    const [phoneVerufication, setPhoneVerufication] = useState(false);

    const checkData = [
        {id : 1, title : '만 14세 이상입니다.(필수)', value : false},
        {id : 2, title : '이용약관 (필수)', value : false},
        {id : 3, title : '개인정보수집 및 이용동의 (필수)', value : false},
        {id : 4, title : '개인정보 마케팅 활용 동의 (선택)'},
        {id : 5, title : '이벤트, 쿠폰, 특가 알림 메일 및 SMS 등 수신 (선택)'}
    ]

    const [checkItems, setCheckItems] = useState([]);

    const handleSingleCheck = (checked, id) => {
        if (checked) {
            setCheckItems(prev => [...prev, id]);
        } else {
            setCheckItems(checkItems.filter((el) => el !== id));
        }
    };

    const hendleAllCheck = (checked) => {
        if (checked) {
            const idArray = [];
            checkData.forEach((el) => idArray.push(el.id));
            setCheckItems(idArray);
        } else {
            setCheckItems([]);
        }
    }

    const [open, setOpen] = useState(false);
    const [code, setCode] = useState(0);


    const sendSNS = async (e) => {
        e.preventDefault()

        try {

            const findEmailList = {phone: phone}

            console.log(findEmailList)

            const findEmailInfo = await axios.post("http://localhost:3000/api/auth/phone/verification", findEmailList)

            console.log("&&&&&&&&&&&", findEmailInfo)

            if (findEmailInfo.status === 201) {

                setOpen(true)

            }

        } catch (err) {
            console.log(err.message)
        }
    }

    const verificationCodeByPhone = async (e) => {
        e.preventDefault()

        const userInput = {
            phone: phone,
            code : code
        }

        console.log(userInput)

        const codeSucces = await axios.post('http://localhost:3000/api/auth/phone/check', userInput)

        if (codeSucces.status === 201) {
            alert("인증되었습니다.")
            setPhoneVerufication(true)
        }

    }


    const userSignUp = useSelector((state) => state.userSignUp)
    const {loading, error, result} = userSignUp

    useEffect(() => {
        if (result) {
            navigate('/login')
        }
    }, [ navigate, result ])


    const signupSubmitHendle = (e) => {
        e.preventDefault()
        dispatch(signup (email, password, username, phone))
    }



    // const signupSubmitHendle = async (e) => {
    //     e.preventDefault()
    //
    //
    //     try{
    //
    //         const signUpList = {
    //             email : email,
    //             password : password,
    //             confirm : confirm,
    //             username : username,
    //             phone : phoneNumber
    //
    //         }
    //
    //         // 조건
    //
    //         if (!checkData.id(0) === false || !checkData.id(1) === false || !checkData.id(2) === false ) {
    //             alert("회원가입이 되지 않습니다.")
    //             return;
    //         } else if (email === "" || password === "" || username === "" || phoneNumber === ""){
    //             alert("입력되지 않은 항목이 있습니다.")
    //             return;
    //         } else if (password !== confirm) {
    //             alert("패스워드를 확인해주세요.")
    //             return;
    //         } else if (!phoneVerufication) {
    //             alert("핸드폰을 인증해주셔야합니다.")
    //             return;
    //         }
    //
    //
    //
    //
    //         const signUpInfo = await axios.post('http://localhost:3000/api/auth/signup', signUpList)
    //
    //         console.log('$$$$$$$$$$$$$$', signUpInfo)
    //
    //         if (signUpInfo.status === 201) {
    //
    //             alert( 'Welcome!' )
    //
    //             navigate('/login')
    //
    //         }


    //     } catch (err) {
    //         console.log(err.massage)
    //     }
    //
    // }

    // useEffect(() => {
    //     if (userInfo) {
    //         navigate('/profile')
    //     }
    // }, [userInfo])

    return (
        <Container>
            <Row className={"justify-content-center"}>
                <Col xs={12} md={6} className={'mt-5'}>
                    <Form onSubmit={signupSubmitHendle}>

                        <h1>회원가입</h1>

                        <Form.Group className="mb-4" controlId="formBasicEmail">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='이메일을 입력해주세요.'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Text>
                                영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
                            </Form.Text>
                            <Form.Control
                                type='password'
                                placeholder='비밀번호를 설정해주세요.'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="fromBasicPassword">
                            <Form.Label>비밀번호 확인</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='비밀번호를 재입력해주세요.'
                                value={confirm}
                                onChange={e => setConfirm(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="Username">
                            <Form.Label>닉네임</Form.Label>
                            <Form.Text>
                                다른 유저와 겹치지 않도록 입력해주세요. (2~15자)
                            </Form.Text>
                            <Form.Control
                                type='username'
                                placeholder='닉네임을 입력해주세요.'
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="fromBasicUsername">
                            <Form.Label>전화번호</Form.Label>
                            <Form.Control
                                type='phonenumber'
                                placeholder='+82를 포함한 핸드폰 번호를 입력해주세요.'
                                value={phone}
                                onChange={e=> setPhoneNumber(e.target.value)}
                            />
                        </Form.Group>

                        <Button onClick={sendSNS}>보내기</Button>

                        {open ? (
                            <Form.Group className="mb-4" controlId="fromBasicUsername">
                                <Form.Label>인증번호</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='인증번호를 입력해주세요.'
                                    value={code}
                                    onChange={e => setCode(e.target.value)}
                                />
                            </Form.Group>

                        ) : null}

                        <Button onClick={verificationCodeByPhone}>인증하기</Button>


                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check
                                className="my-3 pb-3"
                                type="checkbox"
                                label="전체동의"
                                style={{
                                    borderBottom: '1px solid black'
                                }}
                                onChange={(e) => hendleAllCheck(e.target.checked)}
                                checked={checkItems.length === checkData.length ? true : false}
                            />

                            {checkData?.map((checkData, key) => (
                                <Form.Check
                                    className="my-1"
                                    key={key}
                                    id={checkData.id}
                                    label={checkData.title}
                                    type="checkbox"
                                    onChange={(e) => handleSingleCheck(e.target.checked, checkData.id)}
                                    checked={checkItems.includes(checkData.id) ? true : false}
                                />
                            ))}

                            {/*<Form.Check*/}
                            {/*    id={1}*/}
                            {/*    className="mb-3"*/}
                            {/*    type="checkbox"*/}
                            {/*    label="만 14세 이상입니다.(필수)"*/}
                            {/*/>*/}
                            {/*<Form.Check*/}
                            {/*    id={2}*/}
                            {/*    className="mb-3"*/}
                            {/*    type="checkbox"*/}
                            {/*    label="이용약관 (필수)"*/}
                            {/*/>*/}
                            {/*<Form.Check*/}
                            {/*    id={3}*/}
                            {/*    className="mb-3"*/}
                            {/*    type="checkbox"*/}
                            {/*    label="개인정보수집 및 이용동의 (필수)"*/}
                            {/*/>*/}
                            {/*<Form.Check*/}
                            {/*    id={4}*/}
                            {/*    className="mb-3"*/}
                            {/*    type="checkbox"*/}
                            {/*    label="개인정보 마케팅 활용 동의 (선택)"*/}
                            {/*/>*/}
                            {/*<Form.Check*/}
                            {/*    id={5}*/}
                            {/*    className="mb-3"*/}
                            {/*    type="checkbox"*/}
                            {/*    label="이벤트, 쿠폰, 특가 알림 메일 및 SMS 등 수신 (선택)"*/}
                            {/*/>*/}
                        </Form.Group>



                        <Button variant="primary" type="submit">
                            회원가입
                        </Button>

                        <Form.Group>
                            <Form.Text className="text-muted mt-3">
                                <Link to={'/login'}>
                                    아이디가 있으십니까?
                                </Link>
                            </Form.Text>
                        </Form.Group>

                    </Form>

                </Col>
            </Row>
        </Container>
    );
};

export default Signup;