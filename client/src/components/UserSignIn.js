import { useRef, useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import UserContext from '../context/UserContext';

// component that renders sign in form
const UserSignIn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [errors, setErrors] = useState([]);
    const { actions } = useContext(UserContext);

    // ref values
    const emailAddress = useRef(null);
    const password = useRef(null);

    // event handlers
    const handleSubmit = async (evt) => {
        evt.preventDefault();

        // preserve route user wanted to access
        let from = "/";
        if (location.state) {
            from = location.state.from;
        }

        const credentials = {
            emailAddress: emailAddress.current.value,
            password: password.current.value
        };

        try {
            const user = await actions.signIn(credentials);
            if (user) {
                navigate(from);
            } else {
                setErrors(["Sign-in was unsuccessful"]);
            }
        } catch (error) {
            console.log(error);
            navigate('/error')
        }
    };

    const handleCancel = (evt) => {
        evt.preventDefault();
        navigate('/');
    };

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <div>{errors}</div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" ref={password} />
                    <button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
            </div>
        </main>
    );
};

export default UserSignIn;