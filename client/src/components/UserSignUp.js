import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { apiHelper } from '../utils/apiHelper';

const UserSignUp = () => {
    const navigate = useNavigate();
    const { actions } = useContext(UserContext);

    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null);

    const [errors, setErrors] = useState([]);

    // event handlers
    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value
        }

        const response = await apiHelper('/users', 'POST', user);
        try {
            if (response.status === 201) {
                console.log(`${user.firstName} is successfully signed up and authenticated.`);
                await actions.signIn(user);
                navigate('/');
            } else if (response.status === 400) {
                const data = await response.json()
                setErrors(data.errors);
            } else {
                throw new Error();
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
                <h2>Sign Up</h2>
                
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" ref={firstName} />
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" ref={lastName} />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" ref={password} />
                    <button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
    );
};

export default UserSignUp;