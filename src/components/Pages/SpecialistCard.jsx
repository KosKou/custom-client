import React, {Component} from 'react'
import {Card, CardBody, CardHeader, Col} from "reactstrap";
import AuthenticationService from "../../api/AuthenticationService";
import OfferService from "../../api/OfferService";
import ModalOffer from "./ModalOffer";

class SpecialistCard extends Component{

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activity: {},
      isSpecialist: false,
      currentUser: "",
      currentActivity: "",
      isUserHaveOffered: false
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.setOfferModal = this.setOfferModal.bind(this);
    this.removeOffer = this.removeOffer.bind(this);
  }

   componentDidMount() {
    this.setState({
      activity: this.props.activity,
      isSpecialist: this.props.isSpecialist
    })
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let offer = {
      idActivity: this.props.activity.id,
      idUser: this.props.activity.idUser,
      userEmail: AuthenticationService.getAuthenticatedUser()
    }

    OfferService.userOffered(offer)
      .then(response => {
        this.setState({
          isUserHaveOffered: response.data
        })
      })
  }

  removeOffer(activity){
    let offer = {
      idActivity: activity,
      userEmail: AuthenticationService.getAuthenticatedUser()
    }
    OfferService.deleteOffer(offer)
      .then(response => {
        console.log("Oferta removida")
      })
      .catch(error =>{
        console.log(error)
      })
  }

  toggleModal(){
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  setOfferModal(id, user){
    this.setState({
      currentUser: user,
      currentActivity: id
    })
    this.toggleModal()
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
              <>
                {this.state.activity.specialistEmail === null ?
                  <>
                    <button type="button" onClick={() =>
                      this.setOfferModal(this.state.activity.id, this.state.activity.idUser)}
                            className="btn btn-lg btn-warning w-100">
                      {this.state.isUserHaveOffered ? <>Cambiar Oferta</> : <>Ofertar</>}
                    </button>
                    {this.state.isUserHaveOffered && <>
                      <br/>
                      <br/>
                      <button type="button" onClick={() => this.removeOffer(this.state.activity.id)}
                              className="btn btn-lg btn-danger w-100">
                        Remover oferta
                      </button>
                    </>}
                  </>
                  :
                  <>
                    {this.state.activity.specialistEmail === AuthenticationService.getAuthenticatedUser() ?
                      <h2>Te han elegido</h2>
                      :
                      <h2>Ya tiene un Especialista</h2>
                    }
                  </>
                }

              </>
            </CardBody>
          </Card>
        </Col>
        {this.state.modal && <ModalOffer isOpen={this.state.modal}
                                                  toggle={this.toggleModal}
                                                  idUser={this.state.currentUser}
                                                  idActivity={this.state.currentActivity}/>}
      </>
    );
  }
}

export default SpecialistCard
