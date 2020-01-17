import React, { Component} from 'react';
import CreateActivityComponent from '../../components/Pages/CreateActivityComponent'
import AuthenticationService from '../../api/AuthenticationService'
import ActivitiesDataService from "../../api/ActivitiesDataService";
import FeedComponent from "../../components/Pages/FeedComponent";
import {Col, Row,  Button} from "reactstrap";
import FilterComponent from "../../components/Filters/FilterComponent";

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this._isMounted = false;
    this.timeout = 0;
    this.state = {
      activities : [],
      isSpecialist : false,
      sCategory : {
        id: "",
        name: ""
      },
      sKnowledge: {
        id: "",
        name: ""
      },
      btnCachuelos: true,
      btnProyectos: true
    }
    this.refreshActivities = this.refreshActivities.bind(this)

    this.buttonState = this.buttonState.bind(this)
    this.showFilters = this.showFilters.bind(this)
    this.dataUpdate = this.dataUpdate.bind(this)
    this.handleFilterStates = this.handleFilterStates.bind(this)
  }
  /*    L   O   G   I   C   */
  componentDidMount() {
    this._isMounted = true;
    AuthenticationService.refreshAxiosInterceptor();
    this.setState({
      isSpecialist: AuthenticationService.isThisRole("SPECIALIST")
    })
    this.refreshActivities();

    try {
      this.timeout = setInterval(async () => {
        this.refreshActivities();
      }, 4000);
    } catch(e) {
      console.log(e);
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.timeout)
  }

  refreshActivities(){
    ActivitiesDataService.retrieveAllActivities()
      .then(
        response => {
          this._isMounted && this.setState({activities: response.data})
        }
      )
      .catch(error =>{
        console.log(error.response)
      });
  }

  handleFilterStates(obj, filter){
    if (filter === "Area") {
      this.setState({
        sKnowledge : obj
      })
    }else if (filter === "Category") {
      this.setState({
        sCategory: obj
      })
    }
  }

  buttonState(name){
    if (name === "btnCachuelos") {
      this.setState(prevState => ({
        btnCachuelos: !prevState.btnCachuelos
      }));
    }else {
      this.setState(prevState => ({
        btnProyectos: !prevState.btnProyectos
        }))
      if (this.state.btnProyectos){
        this.setState({
          sCategory: {
            id: "",
            name: ""
          }
        })
      }
    }
  }

  dataUpdate(activity){
    //TODO: Buscar el mejor performance
    //Trabajar con: btnCachuelos, btnProyectos
    // sCategory y sKnowledge
    if (activity.categories === null){
      activity.categories = [{
        id: "",
        name: ""
      }]
    }

    if (activity.knowledges === null){
      activity.knowledges = [{
        id: "",
        name: ""
      }]
    }

    if (this.state.btnCachuelos === true && this.state.btnProyectos === true) {
      //Cachuelos y Proyectos
      if (this.state.sCategory.id !== "" && this.state.sKnowledge.id !== ""){
        return ((activity.type.name === "Cachuelo"
          && activity.knowledges.some(v => v.id === this.state.sKnowledge.id)
          && activity.categories.some(v => v.id === this.state.sCategory.id))
        || (activity.type.name === "Proyecto"
            && activity.knowledges.some(v => v.id === this.state.sKnowledge.id)
            && activity.categories.some(v => v.id === this.state.sCategory.id)));
      } else if (this.state.sCategory.id !== "" && this.state.sKnowledge.id === "") {
        return ((activity.type.name === "Cachuelo"
          && activity.categories.some(v => v.id === this.state.sCategory.id))
          || (activity.type.name === "Proyecto"
            && activity.categories.some(v => v.id === this.state.sCategory.id)));
      } else if (this.state.sCategory.id === "" && this.state.sKnowledge.id !== "") {

        return ((activity.type.name === "Cachuelo"
          && activity.knowledges.some(v => v.id === this.state.sKnowledge.id))
          || (activity.type.name === "Proyecto"
            && activity.knowledges.some(v => v.id === this.state.sKnowledge.id)));
      }else {
        return activity.type.name === "Cachuelo" || activity.type.name === "Proyecto"
      }
    }else if (this.state.btnCachuelos === true && this.state.btnProyectos === false) {
      //Solo Cachuelos
      if (this.state.sCategory.id !== "" && this.state.sKnowledge.id !== ""){
        return (activity.type.name === "Cachuelo"
          && activity.knowledges.some(v => v.id === this.state.sKnowledge.id)
          && activity.categories.some(v => v.id === this.state.sCategory.id));
      } else if (this.state.sCategory.id !== "" && this.state.sKnowledge.id === "") {
        return (activity.type.name === "Cachuelo"
          && activity.categories.some(v => v.id === this.state.sCategory.id));
      } else if (this.state.sCategory.id === "" && this.state.sKnowledge.id !== "") {

        return (activity.type.name === "Cachuelo"
          && activity.knowledges.some(v => v.id === this.state.sKnowledge.id));
      }else {
        return activity.type.name === "Cachuelo"
      }
    }else if (this.state.btnCachuelos === false && this.state.btnProyectos === true) {
      //Solo Proyectos
      if (this.state.sCategory.id !== "" && this.state.sKnowledge.id !== ""){
        return (activity.type.name === "Proyecto"
            && activity.knowledges.some(v => v.id === this.state.sKnowledge.id)
            && activity.categories.some(v => v.id === this.state.sCategory.id));
      } else if (this.state.sCategory.id !== "" && this.state.sKnowledge.id === "") {
        return (activity.type.name === "Proyecto"
            && activity.categories.some(v => v.id === this.state.sCategory.id));
      } else if (this.state.sCategory.id === "" && this.state.sKnowledge.id !== "") {

        return (activity.type.name === "Proyecto"
            && activity.knowledges.some(v => v.id === this.state.sKnowledge.id));
      }else {
        return activity.type.name === "Proyecto"
      }
    }else {
      return
    }
  }

  showFilters(){
    if (this.state.btnProyectos === true || this.state.btnCachuelos === true){
      return true;
    }else {
      return false;
    }
  }

  /*    R   E   N   D   E   R   */
  render() {
    let filterActivities = this.state.activities.filter(this.dataUpdate)
    let isSpecialist = AuthenticationService.isThisRole("SPECIALIST")
    return (
      <div className="animated fadeIn">
        <h2>Listar los: </h2>
        <Row>
          <Col col="6" sm="6" md="6" xl className="mb-3 mb-xl-0">
            <Button block outline color="primary" active={this.state.btnCachuelos} onClick={() => this.buttonState("btnCachuelos")}>
              Cachuelos
            </Button>
          </Col>
          <Col col="6" sm="6" md="6" xl className="mb-3 mb-xl-0">
            <Button block outline color="primary" active={this.state.btnProyectos} onClick={() => this.buttonState("btnProyectos")}>
              Proyectos
            </Button>
          </Col>
        </Row>
        <br/>
        {/*Muestra los filtros*/}
        {this.showFilters() && <FilterComponent cachuelo={this.state.btnCachuelos}
                                                proyecto={this.state.btnProyectos}
                                                sCategoryAux={this.state.sCategory}
                                                handle={this.handleFilterStates}/>}
        {!isSpecialist && <CreateActivityComponent refresh={this.refreshActivities}/>}
        <h1>Ofertas: </h1>
        <FeedComponent activities={filterActivities}
                       isSpecialist={this.state.isSpecialist}/>
      </div>
    );
  }
}

export default Dashboard;
