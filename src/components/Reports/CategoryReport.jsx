import React, {Component} from 'react'

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import ActivitiesDataService from "../../api/ActivitiesDataService";
import AreaKnowledgeService from "../../api/AreaKnowledgeService";
import moment from "moment";
import {Card, CardBody, CardHeader, Button} from "reactstrap";
//DataTable
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
//EXPORT
//Excel
import ReactExport from "react-data-export";
//PDF
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import CategoriesService from "../../api/CategoriesService";

am4core.useTheme(am4themes_animated);

class CategoryReport extends Component{

  constructor(props) {
    super(props);
    this.state = {
      activities: []
    }
    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    }

    this.dateFormat = this.dateFormat.bind(this);
    this.knownFormat = this.knownFormat.bind(this);
    this.exportPDF = this.exportPDF.bind(this);
  }

  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.PieChart);

    let dataPrueba = [];
    //Obtain data
    ActivitiesDataService.retrieveEverActivities()
      .then(response =>{
        this.setState({
          activities : response.data
        })
        let activities = []
        activities = response.data
console.log(activities)
        CategoriesService.retrieveAllCategories()
          .then(response =>{
            response.data.forEach((category) =>{
              let temp = {
                "category" : category.name,
                "value" : 0
              }
              activities.forEach(activity => {
                if (activity.categories === null){
                  activity.categories = []
                }
                let identifier = activity.categories.some(k => k.id === category.id)
                if (identifier){
                  temp.value += 1;
                }
              })
              //Agregamos al array
              dataPrueba.push(temp);
            })
            //A partir de ACAAAAAAAAAAAAAAAAAAA
            chart.data = dataPrueba;
            //Begin of Chart Code
            chart.paddingRight = 20;

            chart.data = dataPrueba;
            // Add and configure Series
            let pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "value";
            pieSeries.dataFields.category = "category";
            //Exporting
            chart.exporting.menu = new am4core.ExportMenu();
            chart.exporting.menu.align = "left";
            chart.exporting.menu.verticalAlign = "top";
            chart.exporting.title = "REPORTE"
            chart.exporting.filePrefix = "Reporte de Categorias"

            this.chart = chart;
            //End of chart
          })
          .catch(error=>{
            console.log(error)
          })
    })
      .catch(error => {
        console.log(error)
      })
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  dateFormat(cell, row){
    return moment(cell).format("YYYY-MM-DD")
  }

  knownFormat(cell, row){
    let knownString = ""
    if (cell === null){
      return ""
    }
    cell.map(
      category => {
        if(knownString === ""){
          knownString += category.name
        }else {
          knownString += ", " + category.name
        }
      }
    )
    return knownString;
  }
  exportPDF(){
    // let imgData = this.chart.exporting.getImage("png");
    // console.log(imgData)
    this.chart.exporting.getImage("png").then(imgDat =>{
      const  doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Reporte Estadístico', 15, 22);
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.addImage(imgDat, 'PNG',15,25,180,100);
      doc.autoTable({
        html: '#tablePDF',
        startY: 130
      });
      doc.save("Reporte.pdf");
    })





  }


  render() {
    //Export
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
    //DataTable
    const { SearchBar } = Search;
    const columns = [{
      dataField: 'id',
      text: 'Código'
    }, {
      dataField: 'userEmail',
      text: 'Propietario'
    }, {
      dataField: 'categories',
      formatter: this.knownFormat,
      text: 'Categorias'
    }, {
      dataField: 'createdOn',
      formatter: this.dateFormat,
      text: 'Fecha de Creación'
    }];
    return (
      <>
        <h1>Reporte de Categorias</h1>
        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>

        <Card>
          <CardHeader>
            <h2>Detalle del Reporte</h2>
          </CardHeader>
          <CardBody>
            <ToolkitProvider
              keyField="id"
              data={ this.state.activities.filter(act => act.categories) }
              columns={ columns }
              search
              bootstrap4={true}
            >
              {
                props => (
                  <div>
                    <SearchBar { ...props.searchProps } />
                    <ExcelFile filename="Reporte" element={<Button color="success">Exportar a Excel</Button>}>
                      <ExcelSheet data={this.state.activities} name="Categorias">
                        <ExcelColumn label="Código" value="id"/>
                        <ExcelColumn label="Propietario" value="userEmail"/>
                        <ExcelColumn label="Categorias" value={(col) => {
                          let categoryString = ""
                          col.categories.map(
                            category => {
                              if(categoryString === ""){
                                categoryString += category.name
                              }else {
                                categoryString += ", " + category.name
                              }
                            }
                          )
                          return categoryString;
                        }}/>
                        <ExcelColumn label="Fecha de Creación"
                                     value={(col) => moment(col.createdOn).format("YYYY-MM-DD")}/>
                      </ExcelSheet>
                    </ExcelFile>
                    {/*<Button color="success">Exportar a Excel</Button>*/}
                    <Button color="danger" onClick={this.exportPDF}>Exportar a PDF</Button>
                    <hr />
                      <BootstrapTable pagination={paginationFactory()}
                                      striped={true} hover={true}
                                      { ...props.baseProps }
                      />
                  </div>
                )
              }
            </ToolkitProvider>
          </CardBody>
        </Card>
        <div hidden={true}>
          <table className="table" id="tablePDF">
            <thead>
            <tr>
              <th>Código de Trabajo</th>
              <th>Owner</th>
              <th>Categorias</th>
              <th>Fecha de Creación</th>
            </tr>
            </thead>
            <tbody>
            {this.state.activities.filter(x => x.categories).map(
              activity => {
                let categoryString = ""
                activity.categories.map(
                  known => {
                    if(categoryString === ""){
                      categoryString += known.name
                    }else {
                      categoryString += ", " + known.name
                    }
                    return categoryString;
                  }
                )
                return (
                  <tr key={activity.id}>
                    <td>{activity.id}</td>
                    <td>{activity.userEmail}</td>
                    <td>
                      {categoryString}
                    </td>
                    <td>{moment(activity.createdOn).format("YYYY-MM-DD")}</td>
                  </tr>
                );
              }
            )}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default CategoryReport
