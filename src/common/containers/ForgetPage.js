import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Forget from '../components/Forget';
import * as ForgetActions from '../actions/user';

function mapStateToProps(state) {
  return {
    userName: state.user.userName,
    userId: state.user.userId,
    error: state.user.error,
    logged: state.user.logged
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ForgetActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Forget);