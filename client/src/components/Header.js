import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="wrap header--flex">
            <h1 className="header--logo"><a href="/">Courses</a></h1>
            <nav>
                <ul className="header--signedout">
                    <li><a href="/signup">Sign Up</a></li>
                    <li><a href="/signin">Sign In</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;