import React, {Component} from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
// import BootstrapTable from 'react-bootstrap-table-next'
import data from './_data';


class DataTable extends Component {
  constructor(props) {
    super(props);

    this.table = data.rows;
    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    }

  }

  render() {
    const columns = [{
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'email',
      text: 'Email'
    }, {
      dataField: 'age',
      text: 'Age'
    }, {
      dataField: 'city',
      text: 'City'
    }];
    return (
      <div className="animated">
        <Card>
          <CardHeader>
            <i className="icon-menu"></i>Data Table{' '}
            <a href="https://coreui.io/pro/react/" className="badge badge-danger">CoreUI Pro Component</a>
            <div className="card-header-actions">
              <a href="https://github.com/AllenFang/react-bootstrap-table" rel="noopener noreferrer" target="_blank" className="card-header-action">
                <small className="text-muted">docs</small>
              </a>
            </div>
          </CardHeader>
          <CardBody>
            {/*Table 1*/}
            <BootstrapTable data={this.table} version="4" striped hover pagination search options={this.options}>
              <TableHeaderColumn dataField="name" dataSort>Name</TableHeaderColumn>
              <TableHeaderColumn isKey dataField="email">Email</TableHeaderColumn>
              <TableHeaderColumn dataField="age" dataSort>Age</TableHeaderColumn>
              <TableHeaderColumn dataField="city" dataSort>City</TableHeaderColumn>
            </BootstrapTable>
            {/*With Table2*/}
            {/*<BootstrapTable keyField='id' data={this.table} columns={columns}/>*/}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default DataTable;
