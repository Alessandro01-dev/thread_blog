import { Col, Container, Row } from "react-bootstrap"
import CustomNavbar from "./customNavbar/CustomNavbar"
import "./MainLayout.css"

const MainLayout = ({ children }) => {

  return (

    <>
      <CustomNavbar />
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <main className="main-container">
              {children}
            </main>
          </Col>
        </Row>
      </Container>
    </>

  )
}

export default MainLayout