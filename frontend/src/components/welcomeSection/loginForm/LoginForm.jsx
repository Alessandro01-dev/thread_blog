import { useState } from "react"
import { Form, Button, Spinner, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"

const LoginForm = () => {
  const [loginAuthorForm, setLoginAuthorForm] = useState({
    email: '',
    password: ''
  })

  const { loginAndGetToken, authError, authIsLoading, clearError } = useAuth()
  const navigate = useNavigate()

  const handleFormOnChange = (e) => {
    if (authError) clearError();

    const { name, value } = e.target
    setLoginAuthorForm({
      ...loginAuthorForm,
      [name]: value
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try {
      const result = await loginAndGetToken(loginAuthorForm)

      if (result && result.token) {
        navigate('/', { replace: true })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleGuestLogin = async () => {
    const guestCredentials = {
      email: 'alex.rivers@example.com',
      password: 'password123'
    };

    try {
      const result = await loginAndGetToken(guestCredentials);
      if (result && result.token) {
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          name="email"
          value={loginAuthorForm.email}
          onChange={handleFormOnChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={loginAuthorForm.password}
          onChange={handleFormOnChange}
          required
        />
      </Form.Group>

      {authError && (
        <Alert className="text-center" variant="danger">
          {authError}
        </Alert>
      )}

      <Button
        type="submit"
        className="btn-dark mt-3 d-block w-100"
        disabled={authIsLoading}
      >
        {authIsLoading ? <Spinner size="sm" /> : 'Log in'}
      </Button>

      <div className="text-center mt-3">
        <div className="d-flex align-items-center mb-2">
          <hr className="flex-grow-1 text-muted" />
          <span className="mx-2 small text-muted">OR</span>
          <hr className="flex-grow-1 text-muted" />
        </div>
        
        <Button 
          variant="outline-dark" 
          size="sm"
          className="w-100 py-2 fw-bold" 
          onClick={handleGuestLogin}
          disabled={authIsLoading}
        >
          Login as Guest
        </Button>
      </div>
    </Form>
  )
}

export default LoginForm