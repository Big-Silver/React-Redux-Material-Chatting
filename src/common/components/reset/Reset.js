import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';

import Header from '../../components/layout/Header';

import {reduxForm} from 'redux-form';
import Helmet from 'react-helmet'
import * as UserActions from '../../actions/user';

require('./reset.css');

class Reset extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSetForget = this.onSetForget.bind(this);
    }

	componentWillReceiveProps(nextProps) {
		if(nextProps.user.reSetPassowrd){
            this.props.history.pushState(null, "/");
		}
	}

    onSubmit(event) {        
        const email = this.refs.email.getValue();
        const code = this.refs.code.getValue();
        const password = this.refs.password.getValue();
        this.props.reSetPassword(email, code, password);
    }

    onSetForget(event) {
        this.props.history.pushState(null, "/forget_password");
    }

    render() {
        return (
            <form className="reset-password" onSubmit={this.onSubmit}>
                <Helmet title="Reset Page"/>
                    <h3 className="form-title">Reset Password</h3>
                    <div className="email-header">
                        <p>Enter your e-mail address, reset code, reset password below to reset your password.</p>
                    </div>
                    <TextField
						style={{textAlign:'left'}}
						ref="email"
						hintText="Enter your Email"
						floatingLabelText="Email"
					/><br/>
                    <TextField
						style={{textAlign:'left'}}
						ref="code"
						hintText="Enter the Code"
						floatingLabelText="Code"
					/><br/>
                    <TextField
						style={{textAlign:'left'}}
						ref="password"
						hintText="Enter your Password"
						floatingLabelText="Password"
					/><br/>
                    <div className="sign_nav_space1"></div>
                    <div className="sign_nav_space1"></div>
                    <div className="sign_nav_space1"></div>
                    <div className="sign_nav_space1"></div>
                    <div className="signup_submit">
                        <Grid>
                            <Row className="show-grid">
                                <Col xs={6} md={6} sm={6}>
                                    <RaisedButton className="back_login"label="Back" secondary={true} onClick={this.onSetForget} onTouchTap={this.onSetLogin}/>
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
export default connect(mapStateToProps, mapDispatchToProps)(Reset);
