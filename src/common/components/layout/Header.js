import React,{Component} from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
// import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import FlatButton from 'material-ui/lib/flat-button';
import Helmet from 'react-helmet';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import PersonalTheme from '../../themes/personal';
import { bindActionCreators } from 'redux';
import * as UserActions from '../../actions/user';


class Header extends Component {

constructor(props) {
	super(props);
	this.state = {open: true};
	this.handleToggle = this.handleToggle.bind(this);
	this.handleLogout = this.handleLogout.bind(this);
	this.handleTouchTap = this.handleTouchTap.bind(this);
}

	handleTouchTap() {
		alert("click!!!");
	}

	handleLogout() {
		this.props.logout(this.props.user);
	}

	handleToggle() {
		this.setState({open: !this.state.open}); 
	}

  render() {
        const {user} = this.props;
    return (
      <div>
		{ <AppBar className="layout_header_bar" title={<span>Menu</span>}
			zDepth={0} iconElementRight={<FlatButton onClick={this.handleLogout} label="Log Out" />}>
		</AppBar> }
		{ <LeftNav class="layout_nav_bar" style={{paddingTop:'70px'}} open={this.state.open}>
			{/*{!user.info && <Link to="/login"><MenuItem>Login</MenuItem></Link>}
			{!user.info && <Link to="/register"><MenuItem>Register</MenuItem></Link>}*/}
		</LeftNav> }
      </div>
    );
  }
}

Header.getChildContext = {
	muiTheme: ThemeManager.getMuiTheme(PersonalTheme)
};

function mapStateToProps(state) {
	return {
		user : state.user
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(UserActions,dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);