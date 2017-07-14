import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import Helmet from 'react-helmet'
import { Grid, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';

import * as UserActions from '../actions/user';

require('./Home/home.css');

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
          Redux Shipping Tool
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