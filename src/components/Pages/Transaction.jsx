import React, {Component} from "react";
import WalletsDataService from "../../api/WalletsDataService";
import AuthenticationService from "../../api/AuthenticationService";
import {Alert, Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Label, Row} from "reactstrap";
import UsersDataService from "../../api/UsersDataService";
import TransactionsDataService from "../../api/TransactionsDataService";

class Transaction extends Component{
  constructor(props) {
    super(props);
    this.state = {
      amount : 0,
      message: "",
      wallet: "",     //From
      selectUsers: [],
      selectWallets: [],
      user : {
        id: ""
      },
      toWallet : {
        id: ""
      },
      messageWallets : "",
      messageTransfer: ""
    }
    this.verifyWallet = this.verifyWallet.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.refreshUsersList = this.refreshUsersList.bind(this)
    this.walletsByUser = this.walletsByUser.bind(this)
    this.handleChangeWallet = this.handleChangeWallet.bind(this)
    this.handleAmount = this.handleAmount.bind(this)

  }

  componentDidMount() {
    let id = this.props.location.pathname.substring(13);
    AuthenticationService.refreshAxiosInterceptor();
    if (id === ""){
      this.setState({
        message: "No se tiene ningúna cartera seleccionada."
      })
    }else {
      this.verifyWallet(id)
      this.refreshUsersList();
    }
  }

  verifyWallet(id){
      WalletsDataService.retrieveWalletsById(id)
        .then(
          response => {
            this.setState({
              wallet : response.data
            })
          }
        )
        .catch(
          error => {
            console.log(error.data)
          }
        )
  }

  refreshUsersList(){
    UsersDataService.retrieveAllUsers()
      .then(
        response => {
          this.setState({selectUsers: response.data})
        }
      )
      .catch(error =>{
        console.log(error.response)
      })
  }

  walletsByUser(user){
    WalletsDataService.retrieveWalletsByUser(user)
      .then(
        response => {
          if (response.data === undefined || response.data.length == 0){
            this.setState({
              messageWallets : "El usuario no tiene carteras creadas.",
              selectWallets: [],
            })
          }else{
            this.setState({
              selectWallets : response.data
            })
          }
        }
      )
      .catch(
        error => {
          console.log(error.response)
        }
      )
  }

  handleChange(event){
    //Hace prevalecer el usuario cuando el type cambia
    var index = event.nativeEvent.target.selectedIndex;
    let custom = this.state.selectUsers.find(x => x.id === event.nativeEvent.target[index].value);
    this.setState({
      user : custom
    })
    this.walletsByUser(custom.email)
  }

  handleChangeWallet(event){
    //Hace prevalecer el usuario cuando el type cambia
    var index = event.nativeEvent.target.selectedIndex;
    let custom = this.state.selectWallets.find(x => x.id === event.nativeEvent.target[index].value);
    this.setState({
      toWallet : custom
    })
  }

  handleAmount(event){
    this.setState({
      amount: event.target.value
    })
  }

  handleSubmit(){
    let transaction = {
      from: this.state.wallet.id,
      to: this.state.toWallet.id,
      amount: this.state.amount
    }
    TransactionsDataService.executeTransaction(transaction)
      .then(
        respone => {
          this.setState({
            messageTransfer: "Transacción realizada."
          })
          setTimeout(() => {  this.props.history.push(`/dashboard`); }, 3000);
        }
      )
      .catch(
        error => {
          console.log(error.data);
        }
      )
  }
  render() {
    let validate = false;
    let money = false;
    let buttonMessage = "";
    if (this.state.selectWallets.length > 0 && this.state.toWallet.id && this.state.amount > 0){
      validate = true;
    }else {
      validate = false;
    }
    if (this.state.wallet.balance == 0){
      money = true;
    }else{
      if (this.state.wallet.balance >= this.state.amount){
        buttonMessage = "Transferir"
      }else {
        buttonMessage = "Dinero insuficiente para la transferencia";
        validate = false;
      }
      money = false;
    }
    return(
      <>
        {this.state.message ? <h1>{this.state.message}</h1> : <></>}
        <Row>
          <h2>Transfer from: {this.state.wallet.userMail}</h2>
        </Row>
        <Row><h2>Balance Actual: {this.state.wallet.balance}</h2></Row>
        <Row>
          <Col xs="12" sm="12" lg="12">
            <Card className="text-white">
              <CardHeader className="bg-primary text-center">
                <CardTitle>Transferencia Web</CardTitle>
              </CardHeader>
              <CardBody className="pb-5">
                <Input type="select" name="select" id="select" onChange={this.handleChange}
                       value={this.state.user.id}>
                  <option value="" disabled={true}>Transferir a:</option>
                  {
                    this.state.selectUsers.map(
                      user => {
                        return (<option key={user.id} value={user.id} >{user.name}</option>)
                      }
                    )
                  }
                </Input>
                <br/>
                {this.state.selectWallets.length > 0 ?
                  <>
                  <Input type="select" name="select" id="select" onChange={this.handleChangeWallet}
                  value={this.state.toWallet.id}>
                  <option value="" disabled={true}>Llevar a la cartera:</option>
                  {
                  this.state.selectWallets.map(
                  wallet => {
                  return (<option key={wallet.id} value={wallet.id} >{wallet.id} Balance {wallet.balance}</option>)
                  }
                  )
                  }
                  </Input>
                    <br/>
                  </>
                  :
                  <p style={{color : "black"}}>{this.state.messageWallets}</p>
                }
                <FormGroup>
                  <Label htmlFor="name" style={{color : "black"}}>Monto a Transferir</Label>
                  <Input type="text" id="name" placeholder="Ingrese el monto a transferir" required
                         onChange={this.handleAmount} value={this.state.amount}>
                  </Input>
                </FormGroup>
                <br/>
                {money ?
                  <Button color="success" size="lg" block disabled={true}>
                    No tiene dinero para hacer transferencias.
                  </Button>
                  :
                  <Button color="success" size="lg" block disabled={!validate}
                          onClick={this.handleSubmit}>
                    {buttonMessage}
                  </Button>
                }
                {this.state.messageTransfer ?
                  <Alert color="success">
                    {this.state.messageTransfer}
                  </Alert>
                  :
                  <></>}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    )
  }

}

export default Transaction;
