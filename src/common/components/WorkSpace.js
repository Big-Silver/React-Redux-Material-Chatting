import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import injectTapEventPlugin from "react-tap-event-plugin";
import Helmet from 'react-helmet'
import { Grid, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';
import {Field, reduxForm} from 'redux-form';
import {Tabs, Tab} from 'material-ui/lib/tabs';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/lib/Table';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button'; 

import * as UserActions from '../actions/user';
injectTapEventPlugin();

require('./style/home.css');

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class WorkSpace extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      ws_list: [],
      value: 'list',
      selected: [1],
    };
  }

  componentWillMount() {
    this.props.init_workspaces();
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      ws_list: this.props.user.workspaces
    })
  }

  onSubmit(event) {
    event.preventDefault();
    const password = this.refs.password.getValue();
    const confirm_pass = this.refs.confirmPass.getValue();
    var workspace = {
      fullName : this.refs.fullName.getValue(),
      displayName: this.refs.displayName.getValue(),
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
    }
    if (password == confirm_pass) {
      this.props.create_workspace(workspace);      
    }
  }

  handleChange = (value) => {
    if (value == 'list' || value == 'create') {
      this.setState({
        value: value,
      });
    }    
  };

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
    var params;
    for (var i = 0; i < this.state.ws_list.length; i++) {
      if (i == selectedRows[0]) {
        params = '?workspaceId=' + this.state.ws_list[i].name;
      }
    }
    this.props.history.push({
      pathname: '/login',
      search: params,
    })
  };

  render() {
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="Workspace List" value="list">
          <div>
            <h2 style={styles.headline}>Workspace List</h2>
            <Table onRowSelection={this.handleRowSelection}>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>URL</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {this.state.ws_list.map(wk => {
                  return (
                    <TableRow selected={this.isSelected(0)}>
                      <TableRowColumn>{wk.fullName}</TableRowColumn>
                      <TableRowColumn>localhost:3002/home</TableRowColumn>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </Tab>
        <Tab label="Create Workspace" value="create">
          <div>
            <h2 style={styles.headline}>Create Workspace</h2>
            <form onSubmit={this.onSubmit}>
              <Helmet title="Create Workspace page"/>
                <TextField
                  style={{textAlign:'left'}}
                  ref="fullName"
                  hintText="Enter your full name"
                  floatingLabelText="Full Name"
                /><br/>
                <TextField
                  ref="displayName"
                  hintText="Enter your display name"
                  floatingLabelText="Display Name"
                  errorText={this.props.user.error}
                /><br/>
                <TextField
                  ref="email"
                  hintText="Enter your email"
                  floatingLabelText="Admin User"
                /><br/>
                <TextField
                  ref="password"
                  hintText="Enter your Password"
                  floatingLabelText="Password"
                  type="password"
                  errorText={this.props.user.error}
                /><br/>
                <TextField
                  ref="confirmPass"
                  hintText="Enter your confirm password"
                  floatingLabelText="Confirm Password"
                  type="password"
                  errorText={this.props.user.error}
                /><br/>
              <div className="form-button">
                <RaisedButton label="Create Workspace" secondary={true} onClick={this.onSubmit}/>
              </div>			
            </form>
          </div>
        </Tab>
      </Tabs>
    );
  }
}

function mapStateToProps(state) {
	return {
			user : state.user
	};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(UserActions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkSpace);