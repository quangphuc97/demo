import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/common.css';
import HeaderSignUp from "../../components/HeaderSignUp";
import FooterSignUp from "../../components/FooterSignUp";
import {Container, Col, Row} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {Eye, EyeSlash, Check,Dot,X } from 'react-bootstrap-icons';
import Feedback from 'react-bootstrap/Feedback';
import Button from 'react-bootstrap/Button';

function SignUp() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [agreeTerm, setAgreeTerm] = useState("");

    const [isValidate, setIsValidate] = useState({
        email:false,
        password:false,
        agreeTerm:false
    });
    const [errors, setErrors] = useState({});

    const [password, setPassword] = useState("");

    const validMessPwd = [
        "At least 8 characters",
        "Uppercase character",
        "Number",
        "Special character (!@# etc)"
    ];

    const [validPwd] = useState([
        false,false,false,false
    ]);



    function clickHandler() {
        setIsShowPassword(!isShowPassword);
    }

    function handleChange(e) {
        let fieldName = e.target.name;
        var isValidateCurrent = isValidate;
        var error = errors;
        switch (fieldName) {
            case 'email':
                let emailInput = e.target.value;
                setEmail(emailInput);
                if(emailInput === ""){
                    error.email = "Email is required.";
                    setErrors(error);
                }
                else if(!validateEmail(emailInput)){
                    error.email = "Please enter a valid email.";
                    setErrors(error);
                } else {
                    error.email = "";
                    setErrors(error);
                }
                isValidateCurrent.email = (error.email === "");
                break;
            case 'password':
                let passwordInput = e.target.value;
                setPassword(passwordInput);
                let validPwdCurrent = validPwd;
                if(passwordInput.length>7){
                    validPwdCurrent[0] = true;
                } else {
                    validPwdCurrent[0] = false;
                }
                if(checkUpperCaseExist(passwordInput)){
                    validPwdCurrent[1] = true;
                }
                else {
                    validPwdCurrent[1] = false;
                }

                if(checkNumberExist(passwordInput)){
                    validPwdCurrent[2] = true;
                }
                else {
                    validPwdCurrent[2] = false;
                }
                if(checkSpecialCharExist(passwordInput)){
                    validPwdCurrent[3] = true;
                }else{
                    validPwdCurrent[3] = false;
                }
                if(!(validPwdCurrent[0]&&
                    validPwdCurrent[1]&&
                    validPwdCurrent[2]&&
                    validPwdCurrent[3])
                ){
                    error.pwd = true;
                    setErrors(error);
                } else {
                    error.pwd = "";
                    setErrors(error);
                }

                isValidateCurrent.password = (error.pwd === "");
                break;
            case 'agree-term':
                setAgreeTerm(e.target.checked);
                isValidateCurrent.agreeTerm = e.target.checked;
                break;
            default:
                break;
        }
        setIsValidate(isValidateCurrent);
    }

    function validateEmail(email) {
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return email.match(mailformat);
    }


    function showMessPWD(){
        document.getElementById("messPWD").style.display = '';
        document.getElementById("msqPwd").style.display = 'none';

    }

    function hiddenMessPWD(){
       document.getElementById("messPWD").style.display = 'none';
        document.getElementById("msqPwd").style.display = '';
    }
    function checkSpecialCharExist(str){
        let  format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return format.test(str);
    }
    function checkUpperCaseExist(str){
        let format = /[A-Z]{1}/;
        return format.test(str);

    }
    function checkNumberExist(str){
        let format = /[0-9]{1}/;
        return format.test(str);
    }
    return (<div>
        <HeaderSignUp/>
        <Form className="sign-up-form">
            <Container>
                    <div className="title">Welcome to Laybuy</div>
                    <Form.Group>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email"
                            className= {errors.email ?  "mb-3 invalid ": "mb-3 invalid"}
                        >
                            <Form.Control name="email" onChange={(e) => handleChange(e)}
                                          type="email"
                                          placeholder="name@example.com"
                                          value={email}
                                          required
                                          isInvalid={errors.email}
                                          className= {errors.email ?  "input-custom invalid-input ": "input-custom"}
                            />
                            <Feedback type="invalid">
                                {errors.email}
                            </Feedback>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                        <FloatingLabel controlId="floatingPassword"
                                       label="Create a password"
                                       className= {errors.pwd ?  "mb-3 invalid ": "mb-3 invalid"}

                        >
                            <Form.Control value={password}
                                          name="password"
                                          onChange={(e) => handleChange(e)}
                                          type={isShowPassword ? "text" : "password"}
                                          placeholder="Create a password"
                                          onBlur={hiddenMessPWD}
                                          onFocus={showMessPWD}
                                          isInvalid={errors.pwd}
                                          className= {errors.pwd ?  "input-custom invalid-input ": "input-custom"}
                                          required/>

                            {isShowPassword ?
                                <Eye className="eye-button" onClick={clickHandler} color="royalblue"
                                     size={30}/> :
                                <EyeSlash className="eye-button" onClick={clickHandler} color="royalblue" size={30}/>}

                            <Feedback id="msqPwd" style={{"display":"none"}} type="invalid">
                                Missing password requirements:
                                {validPwd.map((item,index)=>{
                                    if(item === false){
                                        return (<div><X size={15}></X>{validMessPwd[index]}</div>);
                                    }
                                })}
                            </Feedback>
                            <div id="messPWD" style={{"display":"none"}}>
                                {validPwd.map((item,index)=>{
                                    if(item === true){
                                        return (<div className="mss-pwd-valid"><Check size={30}></Check>{validMessPwd[index]}</div>);
                                    } else {
                                        return (<div className="mss-pwd-invalid"><Dot size={30}></Dot>{validMessPwd[index]}</div>);

                                    }
                                })}
                            </div>
                        </FloatingLabel>
                    </Form.Group>
                    <div className="term">
                        <Row>
                            <Col sm={1}>
                                <Form.Check name="agree-term" onChange={(e) => handleChange(e) }
                                             className="check-term" aria-label="option 1" required/>
                            </Col>
                            <Col sm={11} style={{"fontWeight": "bold"}}>
                                <div>I have read &amp; agreed to Laybuy's <a className="link-term"
                                                                             href="#" target="_blank">privacy policy</a>
                                </div>
                                <div>and understand how this is applied.</div>
                            </Col>
                        </Row>
                    </div>
                    <Button className="submit" variant="secondary" size="sm"
                            disabled={!isValidate.email || !isValidate.password || !isValidate.agreeTerm? true:""}
                    >
                        Get started
                    </Button>
            </Container>
        </Form>
        <div style={{"margin": "2% 0 2% 50%"}}>
            <a style={{    "color": "rgb(120, 109, 255)",
                "fontSize":" 12px",
                "textDecoration": "none",
               "borderRight": "1px solid rgb(212, 212, 220)",
                "paddingRight": "0.5rem",
                "marginRight": "0.5rem"}}>Cookie Preferences</a>

            <a style={{
               "color": "rgb(120, 109, 255)",
                "fontSize": "12px",
               "textDecoration": "none"
            }} href="#">Need help?</a>
        </div>
        <FooterSignUp/>
    </div>)
        ;
}

export default SignUp;