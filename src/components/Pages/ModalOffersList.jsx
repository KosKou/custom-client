import React, {Component} from 'react'
import OfferService from "../../api/OfferService";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import ActivitiesDataService from "../../api/ActivitiesDataService";

class ModalOffersList extends Component{
  constructor(props) {
    super(props);
    this.state = {
        offers: [],
        isEmpty: false,
        idActivity: "",
        idUser: "",
        modal: false
    }
    this.setSpecialist = this.setSpecialist.bind(this);
  }

  componentDidMount() {
    this.setState({
      idActivity: this.props.idActivity,
      idUser: this.props.idUser,
      modal: this.props.isOpen
    })

    OfferService.retrieveAllOffersByActivity(this.props.idActivity)
      .then(response => {
        this.setState({
          offers: response.data
        })
      })
  }

  setSpecialist(specialistEmail){
    console.log(specialistEmail)
    console.log(this.state.idActivity)
    ActivitiesDataService.updateSpecialist(this.state.idActivity, specialistEmail)
      .then(response => {
        this.props.toggle()
      })
      .catch(error =>{
        console.log(error);
      })
  }

  render() {
    return (
      <>
        <Modal isOpen={this.state.modal} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>Ofertas Disponibles</ModalHeader>
          <ModalBody className="text-center">
            <table className="table">
              <thead>
              <tr>
                <th>Especialista</th>
                <th>Oferta</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              {
                this.state.offers.map(
                  offer => {
                    return <tr key={offer.id}>
                      <td>{offer.userEmail}</td>
                      <td>S./{offer.amount}</td>
                      <td>
                        <Button className="btn btn-warning" onClick={() => this.setSpecialist(offer.userEmail)}>Aceptar</Button>
                      </td>
                    </tr>
                  }
                )
              }
              </tbody>
            </table>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default ModalOffersList
