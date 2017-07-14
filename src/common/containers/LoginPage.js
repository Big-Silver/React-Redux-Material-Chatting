import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../components/Login';
import * as LoginActions from '../actions/user';

function mapStateToProps(state) {
  return {
    userName: state.user.userName,
    userId: state.user.userId,
    error: state.user.error,
    logged: state.user.logged
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LoginActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
