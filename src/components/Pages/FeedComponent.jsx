import React, {Component} from 'react'
import {Row} from "reactstrap";
import AuthenticationService from "../../api/AuthenticationService";
import SpecialistCard from "./SpecialistCard";
import UserCard from "./UserCard";

class FeedComponent extends Component{

  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      isSpecialist: false,
    }
  }

  componentDidMount() {
    AuthenticationService.refreshAxiosInterceptor();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      activities : nextProps.activities,
      isSpecialist: this.props.isSpecialist
    })
  }

  render() {
    return (
      <>
        <Row>
          {
            this.state.activities.map(
              activity => {
                if (this.state.isSpecialist){
                  return (
                    <SpecialistCard   activity={activity}
                                      isSpecialist={this.state.isSpecialist}
                                      key={activity.id}/>
                  )
                } else {
                  return (
                    <UserCard         activity={activity}
                                      isSpecialist={this.state.isSpecialist}
                                      key={activity.id}/>
                  )
                }

              }
            )
          }
        </Row>
      </>
    );
  }
}

export default FeedComponent
