import React, {Component} from 'react'
import {Row} from "reactstrap";

import AuthenticationService from "../../api/AuthenticationService";
import ModalOffer from "./ModalOffer";
import CustomCard from "./CustomCard";
import ModalOffersList from "./ModalOffersList";

class Feed extends Component{
  constructor(props) {
    super(props);
    this.state = {
      activities : [],
      isSpecialist : false,
      modal: false,
      listModal: false,
      //Fields to Offer
      currentUser: "",
      currentActivity: "",
      varUserOffered: false
    }
    this.setOfferModal = this.setOfferModal.bind(this)
    this.setOfferListModal = this.setOfferListModal.bind(this)
    this.handleOfferButton = this.handleOfferButton.bind(this)
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleListModal = this.toggleListModal.bind(this);

  }

  toggleModal(){
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggleListModal(){
    this.setState(prevState => ({
      listModal: !prevState.listModal
    }));
  }

  componentDidMount() {
    AuthenticationService.refreshAxiosInterceptor();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      activities :  nextProps.activities,
      isSpecialist: nextProps.isSpecialist
    })
  }

  setOfferListModal(id, user){
    this.setState({
      currentUser: user,
      currentActivity: id
    })
    this.toggleListModal()
  }

  setOfferModal(id, user){
    this.setState({
      currentUser: user,
      currentActivity: id
    })
    this.toggleModal()
  }

  handleOfferButton(hasOffers, activity){
    if (activity.userEmail !== AuthenticationService.getAuthenticatedUser()){
      return <></>
    }
    if (activity.specialistEmail !== null){
      return <h2>En proceso...</h2>
    }
    if (hasOffers){
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
    return(
      <>
        <Row>
          {
            this.state.activities.map(
              activity => {
                return (
                    <CustomCard activity={activity}
                                isSpecialist={this.state.isSpecialist}
                                setOfferModal={this.setOfferModal}
                                handleOfferButton={this.handleOfferButton} key={activity.id}
                                refresh={this.props.refresh}/>
                )
              }
            )
          }
        </Row>
        {this.state.modal && <ModalOffer isOpen={this.state.modal}
                                         toggle={this.toggleModal}
                                         idUser={this.state.currentUser}
                                         idActivity={this.state.currentActivity}/>}

        {this.state.listModal && <ModalOffersList isOpen={this.state.listModal}
                                             toggle={this.toggleListModal}
                                             idUser={this.state.currentUser}
                                             idActivity={this.state.currentActivity}/>}
      </>
    )
  }
}

export default Feed
