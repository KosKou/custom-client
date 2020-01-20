import React, {Component} from "react";
import {Card, CardBody, CardHeader, Col} from "reactstrap";
import WalletsDataService from "../../api/WalletsDataService";
import AuthenticationService from "../../api/AuthenticationService";
import {Row} from "reactstrap";

class WalletList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      wallets : [],
      userEmail: "",
      message: ""
    }
    this.walletsByUser = this.walletsByUser.bind(this)
    this.executeTransaction = this.executeTransaction.bind(this)
  }

  componentDidMount() {
    console.log("Estamos en: "+this.props.location.pathname)
    let user = this.props.location.pathname.substring(9);
    this.setState({
      userEmail: user
    })
    AuthenticationService.refreshAxiosInterceptor();
    if (user === ""){
      this.setState({
        message: "No se ha seleccionado ningún usuario."
      })
    }else {
      this.walletsByUser(user)
    }
  }

  walletsByUser(user){
    WalletsDataService.retrieveWalletsByUser(user)
      .then(
        response => {
          console.log(response);
          if (response.data === undefined || response.data.length == 0){
            this.setState({
              message : "El usuario no tiene carteras creadas."
            })
          }else{
            this.setState({
              wallets : response.data
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

  executeTransaction(id){
    this.props.history.push(`/transaction/${id}`)
  }


  render() {
    return (
      <>
        {this.state.message ? <h1>{this.state.message}</h1> : <></>}
        <Row>
          {
            this.state.wallets.map(
              wallet => {
                return (
                  <Col xs="12" sm="6" md="4" lg="3" key={wallet.id}>
                    <Card className="text-white bg-primary">
                      <CardHeader>
                        Private Wallet from: {this.state.userEmail}
                      </CardHeader>
                      <CardBody className="bg-info">
                        <h2>Balance: {wallet.balance}</h2>
                        <br/>
                        <button className="btn btn-success btn-lg btn-block" onClick={() => this.executeTransaction(wallet.id)}>
                          Transfer PagaCoins
                        </button>
                      </CardBody>
                    </Card>
                  </Col>
                )
              }
            )
          }
        </Row>
      </>
    )
  }
}

export default WalletList;
