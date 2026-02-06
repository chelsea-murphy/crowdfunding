import { Link, Outlet } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Log In</Link>
                </li>
                <li>
                    <Link to="/about">AboutPage</Link>
                </li>
                <li>
                    <Link to ="/contact">ContactPage</Link>
                </li>
            </ul>
    </nav>
    );
}

export default NavBar