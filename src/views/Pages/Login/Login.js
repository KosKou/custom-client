import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import AuthenticationService from '../../../api/AuthenticationService'

import { Formik } from 'formik';
import * as Yup from 'yup'
import '../../Forms/ValidationForms/ValidationForms.css'

/* Needs */
const validationSchema = function (values) {
  return Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
    password: Yup.string()
      .min(6, `Password has to be at least ${6} characters!`)
      .required('Password is required')
  })
}

const validate = (getValidationSchema) => {
  return (values) => {
    const validationSchema = getValidationSchema(values)
    try {
      validationSchema.validateSync(values, { abortEarly: false })
      return {}
    } catch (error) {
      return getErrorsFromValidationError(error)
    }
  }
}

const getErrorsFromValidationError = (validationError) => {
  const FIRST_ERROR = 0
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    }
  }, {})
}

const initialValues = {
  email: "",
  password: ""
}

const onSubmit = (values, { setSubmitting, setErrors }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2))
    // console.log('User has been successfully saved!', values)
    setSubmitting(false)
  }, 2000)
}


class Login extends Component {
  constructor(props) {
    super(props);
    this.touchAll = this.touchAll.bind(this);
    this.state = {
      //Adding Backend Validation
      hasLoginFailed: false,
      showSuccessMessage: false,
      errorMessage: '',
    }
    /*B I N D I N G*/
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*Begin Validation ADDS*/
  findFirstError (formName, hasError) {
    const form = document.forms[formName]
    for (let i = 0; i < form.length; i++) {
      if (hasError(form[i].name)) {
        form[i].focus()
        break
      }
    }
  }

  validateForm (errors) {
    this.findFirstError('simpleForm', (fieldName) => {
      return Boolean(errors[fieldName])
    })
  }

  touchAll(setTouched, errors) {
    setTouched({
        email: true,
        password: true
      }
    )
    this.validateForm(errors)
  }
  /*End of Validation ADDS*/


  handleSubmit(e, values){
    //SpringCrehire Service
    e.preventDefault()
    AuthenticationService.executeAuthenticationService(values.email, values.password)
      .then(
        response => {
          AuthenticationService.registerSuccessfulLogin(response.data.user.username, response.data.token)
          this.setState({
            showSuccessMessage:true,
            hasLoginFailed: false
          })
          this.props.history.push("/")
        }
      )
      .catch(
        error => {
          console.log(error.response)
          this.setState({
            showSuccessMessage:false,
            hasLoginFailed: true,
            errorMessage: error.response.data.error
          })
        }
      )
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Usuario o contraseña incorrectos</div>}
                    <Formik
                      initialValues={initialValues}
                      validate={validate(validationSchema)}
                      onSubmit={onSubmit}
                      render={
                        ({
                           values,
                           errors,
                           touched,
                           status,
                           dirty,
                           handleChange,
                           handleBlur,
                           handleSubmit,
                           isSubmitting,
                           isValid,
                           handleReset,
                           setTouched
                         }) => (
                    <Form onSubmit={e=>this.handleSubmit(e, values)} noValidate name='simpleForm'>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      {/*<p className="text-muted">Sign In to your account KosKou</p>*/}
                      <p className="text-muted">admin@gmail.com/123456</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="email"
                               name="email"
                               id="email"
                               placeholder="Email"
                               autoComplete="email"
                               valid={!errors.email}
                               invalid={touched.email && !!errors.email}
                               required
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.email} />
                        <FormFeedback>{errors.email}</FormFeedback>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                          <Input type="password"
                          name="password"
                          id="password"
                          placeholder="Password"
                          autoComplete="new-password"
                          valid={!errors.password}
                          invalid={touched.password && !!errors.password}
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password} />
                        <FormFeedback>{errors.password}</FormFeedback>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" disabled={isSubmitting || !isValid}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                    )} />
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Pagantis Assesstment</h2>
                      <p>Go ahead</p>
                      {/*<Link to="/register">*/}
                      {/*  <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>*/}
                      {/*</Link>*/}
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
