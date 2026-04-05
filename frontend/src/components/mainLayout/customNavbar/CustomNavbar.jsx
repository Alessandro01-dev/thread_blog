import "./CustomNavbar.css"
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import { Link, useLocation } from "react-router-dom";
import useScrollDown from "../../../hooks/useScrollDown";
import ProfileCard from "./profileCard/ProfileCard";
import Logo from "../../../assets/Logo";
import { useAuth } from "../../../contexts/AuthContext";
import { LogIn } from "lucide-react";

const CustomNavbar = () => {
  const { authData } = useAuth();
  const shrinkedNavbar = useScrollDown();
  const location = useLocation();

  const isLoginOrRegistrationPage = location.pathname === "/login";

  return (
    <Navbar className="navbar-main-container">
      <Container>
        <Row className="w-100 justify-content-center">
          <Col lg={8}>
            <div className="d-flex align-items-center justify-content-between">
              <Navbar.Brand
                className={`navbar-logo-container ${shrinkedNavbar ? "shrinked-logo" : ""}`}
                as={Link}
                to="/"
              >
                <Logo className="d-inline-block align-top" />
              </Navbar.Brand>

              <div className="d-flex justify-content-between align-items-center gap-2">
                {!isLoginOrRegistrationPage && (
                  authData ? (
                    <ProfileCard />
                  ) : (
                    <Link to="/login" className="text-dark d-flex align-items-center gap-2 text-decoration-none">
                      <LogIn className={`login-icon-svg ${shrinkedNavbar ? "shrinked-login-icon" : ""}`} strokeWidth={1.5} />
                      <span className={`small login-text ${shrinkedNavbar ? "shrinked-login-text" : ""}`}>
                        Sign In
                      </span>
                    </Link>
                  )
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;