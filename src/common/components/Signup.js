import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import Helmet from 'react-helmet'
import { Grid, Row, Col } from 'react-bootstrap';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

import Header from '../components/layout/Header';
import * as UserActions from '../actions/user';
import { createUser, auth } from '../actions/user';



class Signup extends Component {

	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.onSetLogin = this.onSetLogin.bind(this);
		this.state={
			values: {
				useremail: '',
				password: ''
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.user.signed){
			this.props.history.pushState(null, "/home");
		}
	}

	onSubmit(event) {
		event.preventDefault();
		const password = this.refs.password.getValue();
		const email = this.refs.email.getValue();    
		const confirm_password = this.refs.confirm_password.getValue();
		if (email == confirm_password) {
			this.setState({
				email: email,
				password: password
			})
			this.props.createUser(email, password);
			// this.props.dispatch(createUser(email, password));
		}		
	}

	gotoLogin() {
		this.props.history.pushState(null, "/home");
	}

	onSetLogin() {
		this.props.history.pushState(null, "/");
		// this.props.onSetLogin();
	}

	render() {
		console.log(this.props.isRegistered)
		let {isRegistered} = this.props
		let isRegisteredValue = isRegistered === undefined ? false : isRegistered
		return (
			<form style={{textAlign:'center'}} className="signup" onSubmit={this.onSubmit}>
				<Helmet title="Signup page"/>
				<h3 className="form-title">Sign Up</h3>
				<TextField
					name="username"
					style={{textAlign:'left'}}
					ref="username"
					hintText="UserName"
					floatingLabelText="UserName"
				/><br/>
				<TextField
					name="email"
					style={{textAlign:'left'}}
					ref="email"
					hintText="Email Address"
					floatingLabelText="Email"
				/><br/>
				<TextField
					name="password"
					ref="password"
					hintText="Enter your password"
					floatingLabelText="Password"
					type="password"
					errorText={this.props.user.error}
				/><br/>
				<TextField
					name="confirm_password"
					ref="confirm_password"
					hintText="Enter your confirm password"
					floatingLabelText="Confirm Password"
					type="password"
					errorText={this.props.user.error}
				/><br/>
				{isRegisteredValue  && (
					this.gotoLogin()
				)}
				<div className="sign_nav_space1"></div>
				<div className="sign_nav_space1"></div>
				<div className="sign_nav_space1"></div>
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

// Signup.propTypes = {
// 	email: PropTypes.string.isRequired,
// 	username: PropTypes.string.isRequired,
// 	password: PropTypes.string,
// 	logged: PropTypes.bool.isRequired,
// 	token: PropTypes.string,
// 	err: PropTypes.object
// };

function mapStateToProps(state) {
	// console.log(state);
	const signed = state.user.signed;
	return {
		user : state.user,
		isRegistered: signed	
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(UserActions,dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Signup);
