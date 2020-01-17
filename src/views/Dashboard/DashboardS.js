import React, { Component} from 'react';
import CreateActivityComponent from '../../components/Pages/CreateActivityComponent'
import AuthenticationService from '../../api/AuthenticationService'
import ActivitiesDataService from "../../api/ActivitiesDataService";
import FeedComponent from "../../components/Pages/FeedComponent";
import {Col, Row,  Button} from "reactstrap";
import FilterComponent from "../../components/Filters/FilterComponent";
import UserList from "../../components/Pages/UserList"
import UsersDataService from "../../api/UsersDataService";

class DashboardS extends Component {

  constructor(props) {
    super(props);
    this._isMounted = false;
    this.timeout = 0;
    this.state = {
      users : [],
      btnCachuelos: true,
      btnProyectos: true
    }
    this.refreshUsersList = this.refreshUsersList.bind(this)

  }
  /*    L   O   G   I   C   */
  componentDidMount() {
    this._isMounted = true;
    AuthenticationService.refreshAxiosInterceptor();
    this.setState({
      isSpecialist: AuthenticationService.isThisRole("SPECIALIST")
    })
    this.refreshUsersList();

  }
  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.timeout)
  }

  refreshUsersList(){
    UsersDataService.retrieveAllUsers()
      .then(
        response => {
          this.setState({users: response.data})
        }
      )
      .catch(error =>{
        console.log(error.response)
      })
  }

  /*    R   E   N   D   E   R   */
  render() {
    let isSpecialist = AuthenticationService.isThisRole("SPECIALIST")
    return (
      <div className="animated fadeIn">
        <h2>Lista de Usuarios</h2>
        <br/>
        {/*<Row>*/}
        {/*  <Col col="6" sm="6" md="6" xl className="mb-3 mb-xl-0">*/}
        {/*    <Button block outline color="primary" active={this.state.btnCachuelos} onClick={() => this.buttonState("btnCachuelos")}>*/}
        {/*      Cachuelos*/}
        {/*    </Button>*/}
        {/*  </Col>*/}
        {/*  <Col col="6" sm="6" md="6" xl className="mb-3 mb-xl-0">*/}
        {/*    <Button block outline color="primary" active={this.state.btnProyectos} onClick={() => this.buttonState("btnProyectos")}>*/}
        {/*      Proyectos*/}
        {/*    </Button>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        <Row>
          <UserList data={this.state.users}></UserList>
        </Row>
      </div>
    );
  }
}

export default DashboardS;
