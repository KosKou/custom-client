import React, {Component} from 'react'
import moment from 'moment'
import AuthenticationService from "../../api/AuthenticationService";
import UsersDataService from "../../api/UsersDataService";

class UsersListComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            users : [],
            message: null
        }
        this.refreshUsersList = this.refreshUsersList.bind(this)
        this.updateUserClicked = this.updateUserClicked.bind(this)
        this.deleteUserClicked = this.deleteUserClicked.bind(this)

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

    componentDidMount(){
        AuthenticationService.refreshAxiosInterceptor();
        this.refreshUsersList();
    }
    // Basic Request

    deleteUserClicked(id){
        UsersDataService.deleteUser(id)
            .then(
                response => {
                    this.setState({message: `Delete of User with id: ${id} Successful`})
                    this.refreshUsersList();
                }
            )
            .catch(
                error => {
                    console.log(error)
                }
            )
    }

    updateUserClicked(id){
        console.log("update " + id)
        // /users/${email}
        this.props.history.push(`/users/${id}`)
    }

    render(){
        return(
            <div>
                <h1>List Users</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Verify by Email</th>
                            <th>State</th>
                            <th>Creation Date</th>
                            <th>Update</th>
                            <th>Delete</th>
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
                                                roleString += role.name
                                            }else {
                                                roleString += ", " + role.name
                                            }
                                            return roleString;
                                        }
                                    )
                                    return <tr key={user.id}>
                                        <td>{user.email}</td>
                                        <td>
                                            {roleString}
                                        </td>
                                        <td>{user.enabled.toString()}</td>
                                        <td>{user.state.name}</td>
                                        <td>{moment(user.createdDate).format("YYYY-MM-DD")}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updateUserClicked(user.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteUserClicked(user.id)}>Delete</button></td>
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

export default UsersListComponent
