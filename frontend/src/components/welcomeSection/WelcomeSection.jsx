import { Container, Col, Row } from "react-bootstrap"
import SignupForm from "./signupForm/SignupForm"
import ToggleLoginSignup from "./toggleLoginSignup/ToggleLoginSignup"
import LoginForm from "./loginForm/LoginForm"
import { useState } from "react"
import OauthButtons from './oauthButtons/OauthButtons'
import { Toaster } from "react-hot-toast"

const WelcomeSection = () => {

  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin)
  }

  return (
    <>
      <Container
        className="pt-5"
        fluid
      >
        <Row>
          <Col
            md={6}
          >
            <Row>
              <Col>
                <h1
                  className="text-center fs-3"
                >{isLogin ? "Enter into your account" : "Create new account"}</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <ToggleLoginSignup onToggle={handleToggle} isLogin={isLogin} />
                {isLogin ? <LoginForm /> : <SignupForm setIsLogin={setIsLogin} />}
              </Col>
            </Row>
            <Row>
              <Col>
                {isLogin ? <OauthButtons /> : null}
              </Col>
            </Row>
          </Col>
          <Col
            md={6}
          >
            <img
              className="img-fluid h-100 object-fit-contain d-block"
              src={isLogin ? `https://img.freepik.com/premium-vector/tablet-login-concept-illustration_114360-7863.jpg` : `https://img.freepik.com/premium-vector/sign-up-concept-illustration_114360-7865.jpg`}
              alt="" />
          </Col>
        </Row>
      </Container>
      <Toaster />
    </>
  )
}

export default WelcomeSection