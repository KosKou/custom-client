import React, {Component} from 'react'
import {Card, CardBody, CardHeader, Col} from "reactstrap";
import AuthenticationService from "../../api/AuthenticationService";
import ModalOffersList from "./ModalOffersList";

class UserCard extends Component{

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activity: {},
      isSpecialist: false,
      currentUser: "",
      currentActivity: ""
    }
    this.handleContent = this.handleContent.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.setOfferListModal = this.setOfferListModal.bind(this);
  }

  componentDidMount() {
    AuthenticationService.refreshAxiosInterceptor();
    this.setState({
      activity: this.props.activity,
      isSpecialist: this.props.isSpecialist
    })
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      activity: this.props.activity,
      isSpecialist: this.props.isSpecialist
    })
  }

  toggleModal(){
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  setOfferListModal(id, user){
    this.setState({
      currentUser: user,
      currentActivity: id
    })
    this.toggleModal()
  }

  handleContent(activity){
    if (activity.userEmail !== AuthenticationService.getAuthenticatedUser()){
      return <></>
    }
    if (activity.specialistEmail !== null){
      return <h2>En proceso...</h2>
    }
    if (activity.hasOffers){
      return (
        <button type="button" onClick={() => this.setOfferListModal(activity.id, activity.idUser)}
                className="btn btn-lg btn-success w-100">
          Ver Ofertas
        </button>
      )
    } else {
      return (
        <h3>No hay ofertas</h3>
      )
    }
  }


  render() {

    //Trick
    let knownString  = ""
    let haveKnowledges =  this.state.activity.knowledges != null
    if (haveKnowledges){
      this.state.activity.knowledges.map(
        known => {
          if(knownString === ""){
            knownString += known.name
          }else {
            knownString += ", " + known.name
          }
          return knownString;
        }
      )
    }
    let categoString  = ""
    let haveCategories = this.state.activity.categories != null
    if (haveCategories) {
      this.state.activity.categories.map(
        category => {
          if(categoString === ""){
            categoString += category.name
          }else {
            categoString += ", " + category.name
          }
          return categoString;
        }
      )
    }
    return (
      <>
        <Col xs="12" sm="6" md="4" lg="3">
          <Card className="text-white bg-primary">
            <CardHeader>
              Creado por: {this.state.activity.userEmail}
            </CardHeader>
            <CardBody className="bg-info">
              <h5 className="card-title">Área de conocimiento: {knownString}</h5>
              {categoString && <h5 className="card-title">Categorias: {categoString}</h5>}
              <p className="card-text">Problema: {this.state.activity.description}</p>
              {this.handleContent(this.state.activity)}
            </CardBody>
          </Card>
        </Col>
        {this.state.modal && <ModalOffersList isOpen={this.state.modal}
                                                  toggle={this.toggleModal}
                                                  idUser={this.state.currentUser}
                                                  idActivity={this.state.currentActivity}/>}
      </>
    );
  }
}

export default UserCard
