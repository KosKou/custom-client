import React, {Component} from 'react'
import {Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import NotificationsService from "../../api/NotificationsService";
import AuthenticationService from "../../api/AuthenticationService";

class NotificationsComponent extends Component{
  constructor(props) {
    super(props);
    this.timeout = 0;
    this._isMount = false;
    this.state = {
      dropdownOpen: false,
      notifications: [],
      state: 0
    };

    this.toggle = this.toggle.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
    AuthenticationService.refreshAxiosInterceptor();
    this._isMount = true;
    try {
      this.timeout = setInterval( () => {
        NotificationsService.retrieveAllNotifications(AuthenticationService.getAuthenticatedUser())
          .then(response => {
            this._isMount && this.setState({ notifications: response.data })
          })
          .catch(error => {
            console.log(error)
          })
      }, 3000);
    } catch(e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    this._isMount = false
    clearInterval(this.timeout)
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  changeState(notification){
      notification.state = 1;
    console.log(notification);
      NotificationsService.updateNotification(notification)
        .then(response => {
          console.log(response);
        })
        .catch(error =>{
          console.log(error);
        })
  }

  render() {
    let counter = 0;
    this.state.notifications.forEach(function (value) {
      if (value.state === 0){
        counter = counter+1;
      }
    })
    return (
      <Dropdown nav className="d-md-down-none" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <i className="icon-bell"></i><Badge pill color="danger">{counter}</Badge>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header tag="div" className="text-center"><strong>Tienes {counter} notificaciones.</strong></DropdownItem>
          {
            this.state.notifications.map(
              notification=>{
                let status = notification.state
                return(
                  <DropdownItem key={notification.id} className={status === 1 ? "bg-white" : "bg-primary"}>
                    <i className={status === 1 ? "icon-globe text-dark" : "icon-globe text-white"}
                       onClick={() => this.changeState(notification)}>
                      {" "+ notification.message}
                    </i>
                  </DropdownItem>
                );
              }
            )
          }
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default NotificationsComponent
