import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';

import Header from '../components/layout/Header';

import {reduxForm} from 'redux-form';
import Helmet from 'react-helmet'
import * as UserActions from '../actions/user';

require('./reset/reset.css');

class Forget extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSetLogin = this.onSetLogin.bind(this);
    }

	componentWillReceiveProps(nextProps) {
		if(nextProps.user.requestEmail){
            this.props.history.pushState(null, "/reset_password");
		}
	}

    onSubmit(event) {        
        const email = this.refs.email.getValue();
        this.props.requestEmail(email);
    }

    onSetLogin(event) {
        this.props.history.pushState(null, "/");
    }

    render() {
        return (
            <form className="forget" onSubmit={this.onSubmit}>
                <Helmet title="Forget Page"/>
                    <h3 className="form-title">Forget Password ?</h3>
                    <div className="email-header">
                        <p>Enter your e-mail address below to reset your password.</p>
                    </div>
                    <TextField
						style={{textAlign:'left'}}
						ref="email"
						hintText="Enter your Email"
						floatingLabelText="Email"
					/>
                    <div className="signup_submit">
                        <Grid>
                            <Row className="show-grid">
                                <Col xs={6} md={6} sm={6}>
                                    <RaisedButton className="back_login"label="Back" secondary={true} onClick={this.onSetLogin} onTouchTap={this.onSetLogin}/>
                                </Col>
                                <Col xs={6} md={6} sm={6}>
                                    <RaisedButton label="Submit" secondary={true} onClick={this.onSubmit} onTouchTap={this.onSubmit}/>
                                </Col>
                            </Row>
                        </Grid>															
                    </div>				
            </form>        
        );
    }
}

function mapStateToProps(state) {
	return {

	};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(UserActions,dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Forget);
