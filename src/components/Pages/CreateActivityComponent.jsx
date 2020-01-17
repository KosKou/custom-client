import React, {Component} from "react"
import AuthenticationService from '../../api/AuthenticationService'
import UsersDataService from '../../api/UsersDataService'
import ActivityTypeDataService from '../../api/ActivityTypeDataService'
import CustomModalActivity from '../../components/Pages/CustomModalActivity'

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Input,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader
} from 'reactstrap';

class CreateActivityComponent extends Component{

  constructor(props) {
    super(props);
    this.state = {
      selectActivityTypes : [],
      activity : {
        description : '',
        type : {
          id: "",
          name: ""
        },
        user : {
          id: ""
        }
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    AuthenticationService.refreshAxiosInterceptor();
    let userLogged = AuthenticationService.getAuthenticatedUser()
    UsersDataService.retrieveUserByEmail(userLogged)
      .then(
        response => {
          this.setState({
            activity : {
              type: {
                id: "",
                name: ""
              },
              user: {
                id : response.data.userId
              }
            }
          })
        }
      )
    ActivityTypeDataService.retrieveAllActivityTypes()
      .then(
        response => {
          this.setState({
            selectActivityTypes : response.data
          })
        }
      )
  }

  handleChange(event){
    //Hace prevalecer el usuario cuando el type cambia
    let user = this.state.activity.user
    var index = event.nativeEvent.target.selectedIndex;
    this.setState({
      activity : {
        type : {
          id: event.nativeEvent.target[index].value,
          name: event.nativeEvent.target[index].text
        },
        user : user
      },
      modal: false
    })
  }

  toggleModal(){
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  render() {
    return (
      <>
      <Row>
        <Col xs="12" sm="12" lg="12">
          <Card className="text-white">
            <CardHeader className="bg-primary text-center">
              <CardTitle>¿Qué deseas Hacer?</CardTitle>
            </CardHeader>
            <CardBody className="pb-5">
              <Input type="select" name="select" id="select" onChange={this.handleChange}
                     value={this.state.activity.type.id}>
                <option value="" disabled={true}>Deseo publicar un...</option>
                {
                  this.state.selectActivityTypes.map(
                    state => {
                      return (<option key={state.id} value={state.id} >{state.name}</option>)
                    }
                  )
                }
              </Input>
              <br/>
              <Button color="success" size="lg" block onClick={this.toggleModal}>Publicar</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>

          {this.state.activity.type.id === "" ?
            <>
            <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
              <ModalHeader toggle={this.toggleModal}>Alerta</ModalHeader>
              <ModalBody className="text-center">
                Debes elegir un tipo de publicación.
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={this.toggleModal}>Close</Button>
              </ModalFooter>
            </Modal>
            </>
            :
            <>
              {this.state.modal && <CustomModalActivity user={this.state.activity.user.id}
                                                        type={this.state.activity.type}
                                                        isOpen={this.state.modal}
                                                        toggle={this.toggleModal}
                                                        refresh={this.props.refresh}/>}

            </>
          }
      </>
    );
  }
}

export default CreateActivityComponent
