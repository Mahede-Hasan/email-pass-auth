import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import './App.css';
import firebaseApp from './firebase.init';
import Form from 'react-bootstrap/Form'
import { Button } from "react-bootstrap";
import { useState } from "react";

const auth = getAuth(firebaseApp)
function App() {
  const [error, setError] = useState('')
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [registered, setRegistered] = useState(false)
  const [name, setName] = useState('')

  const handleFormSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {

      event.stopPropagation();
    }
    if (!/(?=.*[0-9])/.test(pass)) {
      setError('Please type a spacial character')
      return
    }
    setError('')
    setValidated(true);
    setUserName()
    if (registered) {

      signInWithEmailAndPassword(auth, email, pass)
        .then(result => {
          const user = result.user;
          console.log(user)
        })
        .catch(error => {
          console.error(error)
          setError(error.message)
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, pass)
        .then(result => {
          const user = result.user;
          console.log(user)

          emailVerification()
        })

        .catch(error => {
          console.error(error)
          setError(error.message)
        })
    }
  }

  const handleUserName = event => {
    setName(event.target.value)

  }

  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {
        console.log('profile updated')
      })
  }

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('sent email')
      })
  }

  const emailVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('email verification sent')
      })
  }
  const handleOnBlurEmail = e => {
    setEmail(e.target.value)
  }

  const handleOnBlurPass = e => {
    setPass(e.target.value);
  }

  const handleRegisterCheckBox = event => {
    setRegistered(event.target.checked)
  }
  return (
    <div>

      <div className="login-form w-25 mx-auto mt-5 border-2">
        <h1 className="text-success">{registered ? 'Login' : 'Register'}</h1>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>

          {!registered && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Name</Form.Label>
            <Form.Control onBlur={handleUserName} type="text" placeholder="Your Name" required />
            <Form.Control.Feedback type="invalid">
              Please provide a Name.
            </Form.Control.Feedback>
          </Form.Group>}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleOnBlurEmail} type="email" placeholder="Enter email" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handleOnBlurPass} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
            <p className="text-danger">{error}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisterCheckBox} type="checkbox" label="Already Registered" />
          </Form.Group>
          <Button onClick={handleResetPassword} variant="link">Forget Password</Button>
          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
