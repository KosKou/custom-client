import React, {Component} from 'react'
import {Button, Form, FormFeedback, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

import { Formik } from 'formik';
import * as Yup from 'yup'
import '../../views/Forms/ValidationForms/ValidationForms.css'
import AuthenticationService from "../../api/AuthenticationService";
import OfferService from "../../api/OfferService";
import CustomModalAlert from "./CustomModalAlert";

/* Needs */
const validationSchema = function (values) {
  return Yup.object().shape({
    amount: Yup.string()
      .required('Ingresa un monto a ofertar')
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
  amount: ""
}

const onSubmit = (values, { setSubmitting, setErrors }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2))
    // console.log('User has been successfully saved!', values)
    setSubmitting(false)
  }, 2000)
}

class ModalOffer extends Component{

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      alertModal: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleAlert = this.toggleAlert.bind(this);
  }

  componentDidMount() {
    this.setState({
      modal: this.props.isOpen
    })
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
        amount: true
      }
    )
    this.validateForm(errors)
  }
  /*End of Validation ADDS*/


  /*    L    O    G   I   C   */

  toggleAlert(){
    this.setState(prevState => ({
      alertModal: !prevState.alertModal
    }));
  }

  handleSubmit(e, values){
    e.preventDefault()
    let offer = {
      amount: values.amount,
      idActivity: this.props.idActivity,
      idUser: this.props.idUser,
      userEmail: AuthenticationService.getAuthenticatedUser()
    }
    console.log("La oferta: ")
    console.log(offer)
    OfferService.createOffer(offer)
      .then(
        response => {
          this.toggleAlert()
        }
      )
      .catch(
        error =>  {
          console.log(error)
        }
      )
  }

  render() {
    return(
      <>
        <Modal isOpen={this.state.modal} toggle={this.props.toggle} className={this.props.className}>
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
                  <ModalHeader toggle={this.props.toggle}>Oferta</ModalHeader>
                  <ModalBody className="text-center">
                    <Input type="number"
                           name="amount"
                           id="amount"
                           placeholder="Monto a ofertar"
                           autoComplete="amount"
                           valid={!errors.amount}
                           invalid={touched.amount && !!errors.amount}
                           required
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.amount} />
                    <FormFeedback>{errors.amount}</FormFeedback>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" disabled={isSubmitting || !isValid}>
                      Ofertar</Button>{' '}
                    <Button color="danger" onClick={this.props.toggle}>Close</Button>
                  </ModalFooter>
                </Form>
              )} />
        </Modal>
        {this.state.alertModal && <CustomModalAlert message="Tu oferta se realizo satisfactoriamente"
                                                   modal={this.state.alertModal}
                                                   toggle={this.toggleAlert}
                                                   disToggle={this.props.toggle}/>}

      </>
    );
  }

}

export default ModalOffer
