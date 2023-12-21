import { Link } from "react-router-dom";
import "./footer.css";


const Footer = () => {
    return (
        <footer className="border-top footer text-muted fixed-bottom">
            <div className="container footer">
                &copy; 2023 - WebApp - <Link to="privacy/footer">Privacy</Link>
            </div>
        </footer>
    );
}

export default Footer;
