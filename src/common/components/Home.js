import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import Helmet from 'react-helmet'
import { Grid, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';

import * as UserActions from '../actions/user';

import MessagesList from "./MessagesList"
import AddMessage from "./AddMessage"

require('./style/home.css');

class Home extends Component {

  constructor(props) {
    super(props);    
  }

  componentWillReceiveProps(nextProps) {
		if(!nextProps.user.logged){
      this.props.history.pushState(null, "/");
		}
	}

  render() {
    return (
      <div className="home-page">
        <Helmet title="Home page"/>
        <section id="main">
          <MessagesList />
          {/* <AddMessage /> */}
        </section>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);