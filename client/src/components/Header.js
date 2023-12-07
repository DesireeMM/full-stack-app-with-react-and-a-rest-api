import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from "../context/UserContext";

// navigation bar header component
const Header = () => {
    const { authUser } = useContext(UserContext);

    return (
        <div className="wrap header--flex">
            <h1 className="header--logo"><a href="/">Courses</a></h1>
            <nav>
                { authUser === null ? 
                <ul className="header--signedout">
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/signin">Sign In</Link></li>
                </ul>
                :
                <ul className="header--signedin">
                    <span>Welcome, {authUser.firstName}! </span>
                    <Link to="/signout">Sign Out</Link>
                </ul>
            }
            </nav>
        </div>
    );
};

export default Header;