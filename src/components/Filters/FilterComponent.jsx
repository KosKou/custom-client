import React, {Component} from 'react'
import {Col, FormGroup, Input, Row} from "reactstrap";
import AreaKnowledgeService from "../../api/AreaKnowledgeService";
import CategoriesService from "../../api/CategoriesService";

class FilterComponent extends Component{

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      knowledges: [],
      sCategory : {
        id: "",
        name: ""
      },
      sKnowledge: {
        id: "",
        name: ""
      }
    }
    this.fillKnowledges = this.fillKnowledges.bind(this)
    this.fillCategories = this.fillCategories.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.fillKnowledges();
    this.fillCategories();
  }
  componentWillUnmount() {
    console.log("UNOUNTING")
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.proyecto === false){
      this.setState({
        sCategory : {
          id: "",
          name: ""
        }
      })
    }
  }

  //Cambiar Filtros State
  handleChange(event, filter){
    var index = event.nativeEvent.target.selectedIndex;
    var obj = {
      id: event.nativeEvent.target[index].value,
      name: event.nativeEvent.target[index].text
    }

    if (filter === "Area"){
      this.setState({
        sKnowledge : obj
      })
      this.props.handle(obj, filter)
    } else if (filter === "Category") {
      this.setState({
        sCategory : obj
      })
      this.props.handle(obj, filter)
    }else {
      return
    }

  }

  fillKnowledges(){
    AreaKnowledgeService.retrieveAllAreaKnowledge()
      .then(response => {
        this.setState({
          knowledges: response.data
        })
      })
  }

  fillCategories(){
    CategoriesService.retrieveAllCategories()
      .then(response => {
        this.setState({
          categories: response.data
        })
      })
  }

  render() {
    return (
      <>
        <h2>Filtros:</h2>
        <Row className="justify-content-center">
          <Col md="6" lg="6" xl="6">
            <FormGroup>
              <Input type="select" name="select" id="exampleSelect" value={this.state.sKnowledge.id}
                     onChange={(event) => this.handleChange(event, "Area")}>
                <option value="" disabled>Filtrar por el Àrea de...</option>
                {
                  this.state.knowledges.map(
                    known => {
                      return (<option key={known.id} value={known.id} >{known.name}</option>)
                    }
                  )
                }
              </Input>
            </FormGroup>
          </Col>
          {this.props.proyecto &&
          <Col md="6" lg="6" xl="6">
            <FormGroup>
              <Input type="select" name="select" id="exampleSelect" value={this.state.sCategory.id}
                     onChange={(event) => this.handleChange(event, "Category")}>
                <option value="" disabled>Filtrar por la Categoria de...</option>
                {
                  this.state.categories.map(
                    category => {
                      return (<option key={category.id} value={category.id} >{category.name}</option>)
                    }
                  )
                }
              </Input>
            </FormGroup>
          </Col>}
        </Row>
      </>
    );
  }
}

export default FilterComponent
