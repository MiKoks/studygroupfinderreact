import { useContext } from "react";
import { Link } from "react-router-dom";
import { JwtContext } from "../routes/Root";
import IdentityHeader from "./IdentityHeader";
import './header.css';

const Header = () => {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);

    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container header">
                    <Link className="navbar-brand" to="/">SGF</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <Link to="/" className="nav-link text-dark">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="courses" className="nav-link text-dark">Courses</Link>
                            </li>

                            <li className="nav-item">
                                <Link to="StudyGroups" className="nav-link text-dark">StudyGroups</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="myhub" className="nav-link text-dark">Chats</Link>
                            </li>

                        </ul>

                        <ul className="navbar-nav">
                            <IdentityHeader/>
                        </ul>


                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
