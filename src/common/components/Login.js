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


class Login extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
		this.onSetSign = this.onSetSign.bind(this);
		this.onLoginFB = this.onLoginFB.bind(this);
		this.onLoginGG = this.onLoginGG.bind(this);
		this.onForgetPassword = this.onForgetPassword.bind(this);
  }

	componentWillReceiveProps(nextProps) {
		if(nextProps.user.logged){
				this.props.history.pushState(null, "/home");
		}
	}

  onSubmit(event) {
    event.preventDefault();
    const username = this.refs.email.getValue();
    const password = this.refs.password.getValue();
    this.props.auth(username, password);		
  }

	onSetSign(event) {
		this.props.history.pushState(null, "/register");
    // this.props.onSetSign(event);
  }

	onLoginFB(event) {
		event.preventDefault();
		this.props.authFB(event);
	}

	onLoginGG(event) {
		console.log(this.props)
		event.preventDefault();
		this.props.authGG(event);
	}

	onStateSubmit() {
		const username = this.refs.email.getValue();
    const password = this.refs.password.getValue();
		if(username =="" && password == "")
			return false;
		else
			return true;
	}

	onForgetPassword(event) {
		this.props.history.pushState(null, "/forget_password");
	}

	gotoHome() {
		console.log("gothome")
		// this.props.history.pushState(null, "/home");
	}

  render() {
    let {isLogged} = this.props
		let isLoggedValue = isLogged === undefined ? false : isLogged
    return (
			<form className="login" onSubmit={this.onSubmit}>
				<Helmet title="Login page"/>
					<h3 className="form-title">Sign In</h3>
					<div className="sign_nav_space1"></div>
					<TextField
						style={{textAlign:'left'}}
						ref="email"
						hintText="Enter your Email"
						floatingLabelText="Email"
					/><br/>
					<TextField
						ref="password"
						hintText="Enter your password"
						floatingLabelText="Password"
						type="password"
						errorText={this.props.user.error}
					/><br/>
					{isLoggedValue  && (
						this.gotoHome()
					)}
				<div className="sign_nav_space1"></div>
				<div className="sign_nav_space1"></div>
				<div className="form-button form-login">
					<RaisedButton label="Login" secondary={true} onClick={this.onSubmit} onTouchTap={this.onSubmit}/>
					<a className="forgot_password" onClick={this.onForgetPassword}>Forgot Password?</a>
				</div>				
				<div className="sign_nav_space1"></div>
				<div className="sign_nav_space1_span"></div>
				<div className="sign_nav_space1"></div>
				<div className="login_option">
					<Grid>
						<Row className="show-grid">
							<Col xs={5} md={5} sm={5}>
								<h4>Or login with</h4>
							</Col>
							<Col xs={7} md={7} sm={7}>
								<ul className="login_social_option">
									<li><a onClick={this.onLoginFB} className="social-icon-color facebook"></a></li>
									<li><a onClick={this.onLoginGG} className="social-icon-color googleplus"></a></li>
								</ul>
							</Col>
						</Row>
					</Grid>															
				</div>
				<div className="sign_nav_space1"></div>
				<div className="login_creat_account">
					<p><a onClick={this.onSetSign}>SIGN UP FOR ACCOUNT</a></p>
				</div>				
			</form>        
    );
  }
}

// Login.propTypes = {
//   username: PropTypes.string.isRequired,
//   password: PropTypes.string,
//   logged: PropTypes.bool.isRequired,
//   token: PropTypes.string,
//   err: PropTypes.object
// };

function mapStateToProps(state) {
	const logged = state.user.logged;
	return {
			user : state.user,
			isLogged: logged
	};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(UserActions,dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
