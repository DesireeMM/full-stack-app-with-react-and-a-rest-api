import { useRef, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const UserSignIn = () => {
    const navigate = useNavigate();
    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);
    const { actions } = useContext(UserContext);

    // event handlers
    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const credentials = {
            emailAddress: emailAddress.current.value,
            password: password.current.value
        };

        try {
            const user = await actions.signIn(credentials);
            if (user) {
                navigate('/');
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
        <div className="form--centered">
            <h2>Sign In</h2>
            <div>{errors}</div>
            <form>
                <label htmlFor="emailAddress">Email Address</label>
                <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress} />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" ref={password} />
                <button className="button" type="submit" onSubmit={handleSubmit}>Sign In</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
            <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
        </div>
    );
};

export default UserSignIn;