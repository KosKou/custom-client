import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form, FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText, Label,
  Row
} from 'reactstrap';
import * as Yup from "yup";
import {Formik} from "formik";
import UsersDataService from "../../../api/UsersDataService";

/* Needs */
const validationSchema = function (values) {
  return Yup.object().shape({
    firstName: Yup.string()
      .min(2, `First name has to be at least 2 characters`)
      .required('First name is required'),
    lastName: Yup.string()
      .min(1, `Last name has to be at least 1 character`)
      .required('Last name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required!'),
    password: Yup.string()
      .min(6, `Password has to be at least ${6} characters!`)
      .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, 'Password must contain: numbers, uppercase and lowercase letters\n')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([values.password], 'Passwords must match')
      .required('Password confirmation is required')
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
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
}

const onSubmit = (values, { setSubmitting, setErrors }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2))
    // console.log('User has been successfully saved!', values)
    setSubmitting(false)
  }, 2000)
}


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userExist: false,
      errorMessage: ''
    }
    this.touchAll = this.touchAll.bind(this);
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
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        confirmPassword: true,
      }
    )
    this.validateForm(errors)
  }
  /*End of Validation ADDS*/

  handleSubmit(e, values){
    //SpringCrehire Service
    e.preventDefault()
    UsersDataService.createUser({
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName
    }).then(
      () => {this.props.history.push('/login')}
    ).catch(
      error => {
        console.log("Error al crear")
        console.log(error.response)
        this.setState({
          userExist: true,
          errorMessage: error.response.data.message
        })
      }
    )
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
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
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="firstName">First Name</Label>
                          <Input type="text"
                                 name="firstName"
                                 id="firstName"
                                 placeholder="First Name"
                                 autoComplete="given-name"
                                 valid={!errors.firstName}
                                 invalid={touched.firstName && !!errors.firstName}
                                 autoFocus={true}
                                 required
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 value={values.firstName} />
                          <FormFeedback>{errors.firstName}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="lastName">Last Name</Label>
                          <Input type="text"
                                 name="lastName"
                                 id="lastName"
                                 placeholder="Last Name"
                                 autoComplete="family-name"
                                 valid={!errors.lastName}
                                 invalid={touched.lastName && !!errors.lastName}
                                 required
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 value={values.lastName} />
                          <FormFeedback>{errors.lastName}</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      {this.state.userExist && <div className="alert alert-warning">{this.state.errorMessage}</div>}
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
                    <InputGroup className="mb-3">
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
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password"
                             name="confirmPassword"
                             id="confirmPassword"
                             placeholder="Confirm password"
                             autoComplete="new-password"
                             valid={!errors.confirmPassword}
                             invalid={touched.confirmPassword && !!errors.confirmPassword}
                             required
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.confirmPassword} />
                      <FormFeedback>{errors.confirmPassword}</FormFeedback>
                    </InputGroup>
                    <Button color="success" disabled={isSubmitting || !isValid} block>Create Account</Button>
                  </Form>
                      )} />
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
