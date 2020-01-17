import React, {Component} from 'react'
import {
  Alert,
  Button,
  Form,
  FormFeedback,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";

import { Formik } from 'formik';
import * as Yup from 'yup'
import '../../views/Forms/ValidationForms/ValidationForms.css'

import {Typeahead} from 'react-bootstrap-typeahead';
import ActivitiesDataService from "../../api/ActivitiesDataService";
import CategoriesService from "../../api/CategoriesService";
import AreaKnowledgeService from "../../api/AreaKnowledgeService";
import AuthenticationService from "../../api/AuthenticationService";

/* Needs */

const validationSchema = function (values, type) {
  var send = null;
  if (type === "Proyecto"){
    send = Yup.object().shape({
      description: Yup.string()
        .required('Describe tu problema!'),
      expYears: Yup.number()
        .required('Coloca sus años de experiencia necesarios')
    })
  }else if (type === "Cachuelo") {
    send = Yup.object().shape({
      description: Yup.string()
        .required('Describe tu problema!'),
    })
  }
  return send;
}

const validate = (getValidationSchema, type) => {
  return (values) => {
    const validationSchema = getValidationSchema(values, type)
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

const onSubmit = (values, { setSubmitting, setErrors }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2))
    // console.log('User has been successfully saved!', values)
    setSubmitting(false)
  }, 2000)
}

const initialValues = {
  description: "",
  expYears: ""
}

/*  END of NEEDS*/
class CustomModalActivity extends Component{
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      thKnownAreas: [],   //Filled
      thCategories: [],   //Filled
      expYears: "",
      language: "",
      multiple: true,
      sKnowledges: [],    //Selected Knowledges - Submit
      sCategories: [],    //Selected Categories - Submit
    }
    this.customValidation = this.customValidation.bind(this)
  }

  componentDidMount() {
    this.setState({
      modal: this.props.isOpen
    })
    //Fill Selects
    AreaKnowledgeService.retrieveAllAreaKnowledge()
      .then(
        response => {
          this.setState({
            thKnownAreas: response.data
          })
        }
      )
      .catch(
        error => {
          console.log(error)
        }
      )
    CategoriesService.retrieveAllCategories()
      .then(
        response => {
          this.setState({
            thCategories: response.data
          })
        }
      )
      .catch(
        error => {
          console.log(error)
        }
      )
  }

/*    V   A   L   I   D   A   T   I   O   N*/
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
    if (this.props.type.name === "Proyecto"){
      setTouched({
          description: true,
          expYears: true
        }
      )
    }else if (this.props.type.name === "Cachuelo") {
      setTouched({
          description: true
        }
      )
    }

    this.validateForm(errors)
  }
  /*End of Validation ADDS*/

/*  L   O   G   I   C*/
  
  customValidation(){
    if (this.props.type.name === "Proyecto"){
      if (this.state.sKnowledges.length < 1 || this.state.sCategories.length < 1){
        return true;
      }else {
        return false;
      }
    }else {
      if (this.state.sKnowledges.length < 1){
        return true;
      }else {
        return false;
      }
    }
  }

  handleSubmit(e, values, setTouched, errors){
    e.preventDefault()
    this.touchAll(setTouched, errors)
    //Insert
    let act = []
    if (this.props.type.name === "Proyecto"){
      act = {
        description: values.description,
        type: this.props.type,
        idUser: this.props.user,
        userEmail: AuthenticationService.getAuthenticatedUser(),
        knowledges: this.state.sKnowledges,
        categories: this.state.sCategories,
        expYears: this.state.expYears,
      }
    }else if (this.props.type.name === "Cachuelo") {
      act = {
        description: values.description,
        knowledges: this.state.sKnowledges,
        idUser: this.props.user,
        userEmail: AuthenticationService.getAuthenticatedUser(),
        type: this.props.type
      }
    }
    console.log("Activity a enviar")
    console.log(act)

    ActivitiesDataService.createActivity(act)
      .then(
        response => {
          this.props.refresh()
          this.props.toggle()
        }
      )
  }

  handleTHChange(selected, change){
    if (change === "categories") {
      this.setState({
        sCategories: selected
      })
    } else if (change === "knowledges") {
      this.setState({
        sKnowledges: selected
      })
    }
  }
  render() {
    const isSelected = this.customValidation()
    return(
      <>
        <Modal isOpen={this.state.modal} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>Publicación</ModalHeader>
          <Formik
            initialValues={initialValues}
            validate={validate(validationSchema, this.props.type.name)}
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
                <Form onSubmit={e=>this.handleSubmit(e, values, setTouched, errors)} noValidate name='simpleForm'>
                  <ModalBody>
                    <Input type="textarea"
                           name="description"
                           id="description"
                           placeholder="Describe tu problema..."
                           autoComplete="description"
                           rows="3"
                           valid={!errors.description}
                           invalid={touched.description && !!errors.description}
                           required
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.description} />
                    <FormFeedback>{errors.description}</FormFeedback>
                    <hr/>
                    <Typeahead id="knownArea" name="knownArea"
                               labelKey="name"
                               multiple={this.state.multiple}
                               options={this.state.thKnownAreas}
                               placeholder="Especialista en...."
                               required
                               onChange={(selected) => {
                                 this.handleTHChange(selected, "knowledges")
                               }}
                    />
                    {this.state.sKnowledges.length < 1 &&
                    <Alert className="bg-danger" >Selecciona un área de conocimiento!</Alert>}
                    <br/>
                    {/*Solo para Proyectos*/}
                    {this.props.type.name === "Proyecto" &&
                    <>
                      <Typeahead id="knownArea" name="knownArea"
                                 labelKey="name"
                                 multiple={this.state.multiple}
                                 options={this.state.thCategories}
                                 placeholder="Categoria...."
                                 required
                                 onChange={(selected) => {
                                   this.handleTHChange(selected, "categories")
                                 }}
                      />
                      {this.state.sCategories.length < 1 &&
                      <Alert className="bg-danger" >Selecciona una Categoria</Alert>}
                      <Input type="number"
                             name="expYears"
                             id="expYears"
                             placeholder="Años de experiencia"
                             autoComplete="expYears"
                             valid={!errors.expYears}
                             invalid={touched.expYears && !!errors.expYears}
                             required
                             onChange={handleChange}
                             onBlur={handleBlur}
                             value={values.expYears} />
                      <FormFeedback>{errors.expYears}</FormFeedback>
                    </>}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" disabled={isSubmitting || !isValid || isSelected}>
                      Publicar</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                  </ModalFooter>
                </Form>
              )} />
        </Modal>
      </>
    )
  }
}

export default CustomModalActivity
