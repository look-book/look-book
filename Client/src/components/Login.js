import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider";
import Nav from 'react-bootstrap/Nav';
import {
    Link
} from "react-router-dom";

//This is the login page.

import axios from 'axios';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [email, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const google = () => {
        window.open("http://localhost:5000/auth/google", "_self");
      };
    
      const facebook = () => {
        window.open("http://localhost:5000/auth/facebook", "_self");
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/app/Login",
                JSON.stringify({ username:email, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log("response", response);
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ email, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
            console.log("Complete!");
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Login Successful!');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Email or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed', err);
            }
            errRef.current.focus();
        }
    }

    return (
        <div>
            <br/>
            {success ? (                
                <section>
                    <h1>You are logged in!</h1>
                </section>
            ) : (
                <section className="contentBox">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            name="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={email}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <br/>
                        <button>Sign In</button>

                        
                    </form>
                    <button onClick={google}>Login With Google</button>
        <button onClick={facebook}>Login With Facebook</button>
        <br/><br/>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                        <Nav.Link as={Link} to={'/Register'}>Register</Nav.Link>
                        </span>
                    </p>
                </section>
            )}

        </div>
    )
}

export default Login