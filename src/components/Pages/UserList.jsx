import React, {Component} from 'react'
import data from "../../views/Tables/DataTable/_data";
import UsersDataService from "../../api/UsersDataService";
import {Card, CardHeader, CardBody} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import AuthenticationService from "../../api/AuthenticationService";
import moment from "moment";

class UserList extends Component{

  constructor(props) {
    super();
    this.state = {
      users : [],
      message: null
    }
    this.table = props.users;
    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    }

    this.refreshUsersList = this.refreshUsersList.bind(this)
    this.checkUserWallets = this.checkUserWallets.bind(this)
  }

  componentDidMount() {
    AuthenticationService.refreshAxiosInterceptor();
    this.setState({
      activity: this.props.activity,
      isSpecialist: this.props.isSpecialist
    })

    this.refreshUsersList()
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

  checkUserWallets(id){
    console.log("Wallets of " + id)
    // /users/${email}
    // this.props.history.push(`/wallets/${id}`)
  }

  render() {

    return (
      <div className="col-md-12">
        <table className="table table-light">
          <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Enabled</th>
            <th>Status</th>
            <th>Created date</th>
            <th>Wallets</th>
          </tr>
          </thead>
          <tbody>
          {
            this.state.users.map(
              user => {
                let roleString = ""
                user.roles.map(
                  role => {
                    if(roleString === ""){
                      roleString += role.role
                    }else {
                      roleString += ", " + role.role
                    }
                    return roleString;
                  }
                )
                return <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>
                    {roleString}
                  </td>
                  <td>{user.enabled.toString()}</td>
                  <td>{user.status}</td>
                  <td>{moment(user.createdDate).format("YYYY-MM-DD")}</td>
                  <td><button className="btn btn-success" onClick={() => this.checkUserWallets(user.id)}>Check Wallets</button></td>
                </tr>
              }
            )
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserList;
