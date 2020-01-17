import React, {Component} from 'react'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";


/*    I   M   P   L   E   M   E   N   T   A   T   I   O   N*/
// {this.state.alertModal && <CustomModalAlert message="Tu oferta se realizo satisfactoriamente"
//                                             modal={this.state.alertModal}
//                                             toggle={this.toggleAlert}
//                                             disToggle={this.props.toggle}/>}


class CustomModalAlert extends Component{

  constructor(props) {
    super(props);
    this.state = {
      alert: "",
      modal: false
    }
    this.customToggle = this.customToggle.bind(this)
  }

  customToggle(){
    this.props.toggle()
    this.props.disToggle()
  }

  componentDidMount() {
    console.log(this.props)
    this.setState({
      alert: this.props.message,
      modal: this.props.modal
    })
  }

  render() {
    return (
      <>
        <Modal isOpen={this.state.modal} toggle={this.customToggle} className={this.props.className}>
          <ModalHeader toggle={this.customToggle}>Aviso</ModalHeader>
          <ModalBody className="text-center">
            <h1>{this.state.alert}</h1>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.customToggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default CustomModalAlert
