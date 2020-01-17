import React, {Component} from 'react'
import moment from 'moment'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import AuthenticationService from "../../api/AuthenticationService";
import UsersDataService from "../../api/UsersDataService";

//Moment format date

class UserComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            user: {
                email: '',
                firstName: '',
                lastName: '',
                state: [],
                roles: [],
                createdDate: ''
            },
            newState: {
              id: '',
              name: ''
            },
            newRoles: [],
            fillStates: [],
            fillRoles: [],
            rolesMessage: '',
            //Selected Role value
            sRole: {
                id: "",
                name: ""
            }
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleStateChange= this.handleStateChange.bind(this)
        this.handleRoleClick= this.handleRoleClick.bind(this)
        this.handleRoleChange= this.handleRoleChange.bind(this)
    }
    onSubmit(values){
        if (this.state.id === "new"){
            console.log("Creating User...")
            UsersDataService.createUser({
                email: values.email,
                createdDate: values.createdDate
            }).then(
                () => {this.props.history.push('/users')}
            )
        }else {
            console.log("Updating User...")
            UsersDataService.updateUser(this.state.id, {
                // id: this.state.id,
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                state: this.state.newState,
                roles: this.state.newRoles,
                createdDate: values.createdDate
            }).then(
                () => {this.props.history.push('/users')}
            )
        }
    }

    componentDidMount(){
        AuthenticationService.refreshAxiosInterceptor();
        if (this.state.id === "new"){
            return
        }

        //Here's the user@gmail.com from sessionStorage
        console.log("retrieveUser - Props")
        console.log(this.props)
        UsersDataService.retrieveUser(this.state.id)
            .then(response => this.handleSuccessfulResponse(response))
        UsersDataService.retrieveUserStates()
            .then(response => {
                this.setState({
                    fillStates: response.data
                })
            })
        UsersDataService.retrieveUserRoles()
            .then(response => {
                this.setState({
                    fillRoles: response.data
                })
            })
    }

    handleSuccessfulResponse(response){
        this.setState({
            user: {
                email: response.data.email,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                state: response.data.state,
                roles: response.data.roles,
                createdDate: moment(response.data.createdDate).format("YYYY-MM-DD")
            },
            newState : response.data.state,
            newRoles: response.data.roles
        })
    }

    validate(values){
        // let errors = {email: 'should have syntax'}
        let errors = {}
        if (!values.email){
            errors.email = 'Enter an email'
        }else if (values.email.length<10){
            errors.email = 'Enter at least 10 characters to email'
        }

        if (!moment(values.createdDate).isValid()){
            errors.createdDate = 'Enter valid Date'
        }
        console.log(values);

        //TODO - Colocar validaciones para fistName y lastName
        return errors;
    }

    handleStateChange(event){
        var index = event.nativeEvent.target.selectedIndex;
        var state = {
            id: event.nativeEvent.target[index].value,
            name: event.nativeEvent.target[index].text
        }
        this.setState({
            newState: state
        })
    }

    handleRoleChange(event){
        var index = event.nativeEvent.target.selectedIndex;
        var role = {
            id: event.nativeEvent.target[index].value,
            name: event.nativeEvent.target[index].text
        }
        this.setState({
            sRole : role
        })
        let aux = this.state.newRoles
        let exist = false
        aux.forEach(function (e) {
            if (e.id === role.id){
               exist = true
            }
        })
        if (exist){
            alert("Ese rol ya ah sido agregado")
        } else {
            aux.push(role)
        }
        this.setState({
            newRoles: aux
        })
    }

    handleRoleClick(event){
        console.log("Intentaste cambiar de rol")
        // console.log(event.nativeEvent)
        let role = {
            id: event.nativeEvent.target.value,
            name: event.nativeEvent.target.textContent
        }
        let aux = this.state.newRoles
        aux = aux.filter( el => el.id !== role.id);
        if (aux.length >= 1){
            this.setState({
                newRoles: aux
            })
        } else {
            alert("Tienes que asignar almenos un rol")
            this.setState({
                rolesMessage: "Tienes que asignar almenos un rol"
            })
        }
    }
    render() {
        let {email,firstName, lastName, state, roles, createdDate} = this.state.user;
        return (
            <div>
                <h1>User Component</h1>
                <div className="container">
                    <Formik
                        enableReinitialize ={true}
                        // initialValues={{email, state, roles, createdDate}}
                        initialValues={{email,firstName, lastName, state, roles, createdDate}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                    >
                        {
                            (props) => {
                                return <Form>
                                    <fieldset className="form-group">
                                        <label htmlFor="">Email</label>
                                        <Field className="form-control" type="text" name="email"/>
                                        <ErrorMessage name="email" component="div" className="alert alert-warning"/>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label htmlFor="">First Name</label>
                                        <Field className="form-control" type="text" name="firstName"/>
                                        <ErrorMessage name="firstName" component="div" className="alert alert-warning"/>
                                    </fieldset>

                                    <fieldset className="form-group">
                                        <label htmlFor="">Last Name</label>
                                        <Field className="form-control" type="text" name="lastName"/>
                                        <ErrorMessage name="lastName" component="div" className="alert alert-warning"/>
                                    </fieldset>

                                    <div className="form-group">
                                            <label htmlFor="">State</label>
                                            <select name="state" className="form-control"
                                            onChange={this.handleStateChange} value={this.state.newState.id}>
                                                {
                                                    this.state.fillStates.map(
                                                        state => {
                                                            return (<option key={state.id} value={state.id} >{state.name}</option>)
                                                        }
                                                    )
                                                }
                                            </select>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="">Roles por agregar (click en ellos para eliminarlos)</label>
                                            <div className="form-control">
                                                {
                                                    this.state.newRoles.map(
                                                        role => {
                                                            if (role != null){
                                                                return (
                                                                    <var key={role.id}>
                                                                        <button type="button" value={role.id} className="btn badge btn-primary"
                                                                                onClick={this.handleRoleClick}>
                                                                            {role.name}
                                                                        </button>
                                                                        <span>  </span>
                                                                    </var>)
                                                            }else {
                                                                return null
                                                            }
                                                        }
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="">Roles</label>
                                            <select name="role" className="form-control" value={this.state.sRole.id}
                                                    onChange={this.handleRoleChange}>
                                                <option value="" disabled>Elige un Rol</option>
                                                {
                                                    this.state.fillRoles.map(
                                                        role => {
                                                            return (<option key={role.id} value={role.id} >{role.name}</option>)
                                                        }
                                                    )
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <fieldset className="form-group">
                                        <label htmlFor="">Created Date</label>
                                        <Field className="form-control" type="date" name="createdDate"/>
                                        <ErrorMessage name="createdDate" component="div" className="alert alert-warning"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Update User</button>
                                </Form>
                            }
                        }
                    </Formik>
                </div>
            </div>
        );
    }
}

export default UserComponent
