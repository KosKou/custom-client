import React, {Component} from 'react'
import {Row} from "reactstrap";
import AuthenticationService from "../../api/AuthenticationService";
import ActivitiesDataService from "../../api/ActivitiesDataService";
import UserCard from "./UserCard";

class UserFeed extends Component{

  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      isSpecialist: false,

    }
    this.refreshActivities = this.refreshActivities.bind(this)
  }

  async componentDidMount() {
    this.setState({
      isSpecialist: AuthenticationService.isThisRole("SPECIALIST")
    })

    try {
      setInterval(async () => {
        AuthenticationService.refreshAxiosInterceptor();
        //Obtiene su propia data
        this.refreshActivities()
      }, 3000);
    } catch(e) {
      console.log(e);
    }
  }

  refreshActivities(){
    ActivitiesDataService.retrieveAllActivities()
      .then(
        response => {
          this.setState({activities: response.data})
        }
      )
      .catch(error =>{
        console.log(error.response)
      });
  }

  render() {
    return (
      <>
        <Row>
          {
            this.state.activities.map(
              activity => {
                return (
                  <UserCard   activity={activity}
                              isSpecialist={this.state.isSpecialist}
                              key={activity.id}/>
                )
              }
            )
          }
        </Row>
      </>
    );
  }
}

export default UserFeed
