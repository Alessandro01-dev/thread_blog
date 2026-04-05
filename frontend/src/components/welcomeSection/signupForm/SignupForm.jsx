import { useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import './SignupForm.css'
import useAuthors from '../../../hooks/useAuthors'
import toast from "react-hot-toast";

const SignupForm = ({ setIsLogin }) => {
  const { createAuthor, authorsIsLoading, authorsError, clearAuthorsError } = useAuthors()

  const [newAuthorForm, setNewAuthorForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleFormOnChange = (e) => {
    if (authorsError) clearAuthorsError();

    const { name, value } = e.target
    setNewAuthorForm({
      ...newAuthorForm,
      [name]: value
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (newAuthorForm.password !== newAuthorForm.confirmPassword) {
      return
    }

    const { confirmPassword, ...totalFormData } = newAuthorForm

    try {
      const result = await createAuthor(totalFormData)
      if (result.success) {
        toast.success('Account created successfully!', {
          duration: 4000,
          position: 'top-center'
        })
        setNewAuthorForm({
          name: '',
          surname: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
        setIsLogin(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const passwordsMatch = newAuthorForm.password === newAuthorForm.confirmPassword || newAuthorForm.confirmPassword === '';

  return (
    <Form onSubmit={handleFormSubmit}>
      <div className="d-flex align-items-center justify-content-between gap-4 w-100">
        <Form.Group className="mb-3 w-50">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            value={newAuthorForm.name}
            onChange={handleFormOnChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 w-50">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Surname"
            name="surname"
            value={newAuthorForm.surname}
            onChange={handleFormOnChange}
            required
          />
        </Form.Group>
      </div>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          name="email"
          value={newAuthorForm.email}
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
          value={newAuthorForm.password}
          onChange={handleFormOnChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={newAuthorForm.confirmPassword}
          onChange={handleFormOnChange}
          isInvalid={!passwordsMatch}
          required
        />
        <Form.Control.Feedback type="invalid">
          Passwords do not match
        </Form.Control.Feedback>
      </Form.Group>

      {authorsError && (
        <Alert className="text-center" variant="danger">
          {authorsError}
        </Alert>
      )}

      <Button
        type="submit"
        className="btn-dark mt-3 d-block w-100"
        disabled={authorsIsLoading || !passwordsMatch}
      >
        {authorsIsLoading ? (
          <Spinner size="sm" />
        ) : 'Sign up'}
      </Button>
    </Form>
  )
}

export default SignupForm;