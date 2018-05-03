/**
 *
 * Dashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Switch, Route, Redirect } from 'react-router-dom';

import { makeSelectLoginloggedIn } from 'containers/LoginPage/selectors';
import FeaturePage from 'containers/FeaturePage/Loadable';

import PrivateRoute from 'containers/LoginPage/PrivateRoute';


export class Dashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    
    
    const LoginOrLogout = () => {
      switch(this.props.loggedIn){
      case true:
        return (
          <div> someone is in</div>
        );
        break;
      case false:
      default :
        return (
          <div> someone is out</div>
        );
        break;
      }
    }
    return (
      <div>
        { LoginOrLogout() }
        <Switch>
          <PrivateRoute path="/dashboard/features" component={FeaturePage} isAuthenticated={this.props.loggedIn} redirect='/login' />
        </Switch>
        
      </div>
      
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
  loggedIn: makeSelectLoginloggedIn(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Dashboard);
