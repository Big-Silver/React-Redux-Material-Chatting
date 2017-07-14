import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Reset from '../components/reset/Reset';
import * as ResetAction from '../actions/user';

function mapStateToProps(state) {
  return {
    requestEmail: state.user.requestEmail
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ResetAction, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Reset);