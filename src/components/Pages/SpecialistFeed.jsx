import React, {Component} from 'react'
import {Row} from "reactstrap";
import AuthenticationService from "../../api/AuthenticationService";
import ActivitiesDataService from "../../api/ActivitiesDataService";
import SpecialistCard from "./SpecialistCard";

class SpecialistFeed extends Component{

  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      isSpecialist: false,

    }
    this.refreshActivities = this.refreshActivities.bind(this)
  }

  componentDidMount() {
    console.log(this.props)
    AuthenticationService.refreshAxiosInterceptor();
    this.setState({
      isSpecialist: AuthenticationService.isThisRole("SPECIALIST")
    })
    //Obtiene su propia data
    // this.refreshActivities()

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
                let change = this.state.isSpecialist
                return (
                  <SpecialistCard   activity={activity}
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

export default SpecialistFeed
