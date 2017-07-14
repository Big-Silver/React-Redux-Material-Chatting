import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Signup from '../components/Signup';
import * as SignupActions from '../actions/user';

function mapStateToProps(state) {
  return {
    userEmail: state.user.userEmail,
    error: state.user.error,
    logged: state.user.logged
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SignupActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);