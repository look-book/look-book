import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from 'react-bootstrap/Nav';
import {
    Link
} from "react-router-dom";
import axios from 'axios';

//This is the registration page.


const USER_REGEX = /^(?=.*[@.]).{4,30}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,20}$/;
//const REGISTER_URL = 'http://localhost:5000/app/signup';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidName] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [firstName, setFirstName] = useState('');

    const [lastName, setLastName] = useState('');

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(email);
        setValidName(result);
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(email);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        
        try {
            const registered = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: pwd
              }
            axios.post('http://localhost:5000/app/signup', registered)
            .then(response => console.log(response.data));

            setSuccess(true);
            setEmail('');
            setPwd('');
            setMatchPwd('');
            setFirstName('');
            setLastName('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Success!');
            } else if (err.response?.status === 409) {
                setErrMsg('Email Already Used');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }
    return (
        <div>
            <div>
            {success ? (
                <section>
                    <h1>Success!</h1>
                </section>
            ) : (
                        <section className="contentBox">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h2>Register</h2>

                <form onSubmit={handleSubmit}>

                    <label htmlFor="email">
                        Email:
                        <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="email"
                        id="email"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />

                    <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        <br />
                        Must be an email address with an @ sign.<br />
                    </p>

            <label htmlFor="firstName">
                        First Name:
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        aria-describedby="uidnote"

                    />

                    <label htmlFor="lastName">
                        Last Name:
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        aria-describedby="uidnote"
                    />


                    <label htmlFor="password">
                        Password:
                        <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        <br />
                        2 to 20 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>


                    <label htmlFor="confirm_pwd">
                        Confirm Password:
                        <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        <br />
                        Must match the first password input field.
                    </p>

                    <button disabled={!validEmail || !validPwd || !validMatch ? true : false}>Sign Up</button>
                </form>

                <p>
                    Already registered?<br />
                    <span className="line">
                    
                        <Nav.Link as={Link} to={'/Login'}>Login</Nav.Link>
                    </span>
                </p>
            </section>
            )}
</div>
        </div>
    )
}

export default Register;