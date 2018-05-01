/**
 *
 * SmartHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSmartHeader from './selectors';
import { makeSelectLoginloggedIn } from 'containers/LoginPage/selectors';
import reducer from './reducer';
import messages from './messages';
import { logout } from 'containers/LoginPage/actions';
import saga from 'containers/LoginPage/saga';

export class SmartHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const LoginOrLogout = () => {
      console.log(this.props.loggedIn);
      switch(this.props.loggedIn){
      case true:
        return (
          <HeaderLink onClick={() => this.props.dispatch(logout())} to="/">
	    <FormattedMessage {...messages.logout} />
          </HeaderLink>
/*	  <HeaderLink to="/test1">
	    <FormattedMessage {...messages.logout} />
	  </HeaderLink>*/
        );
        break;
      case false:
      default :
        return (
	  <HeaderLink to="/login">
	    <FormattedMessage {...messages.login} />
	  </HeaderLink>
        );
        break;
      }
    }
    return (
      <div>
        <A href="https://twitter.com/mxstbr">
        </A>
        <NavBar>
          <HeaderLink to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/features">
            <FormattedMessage {...messages.features} />
          </HeaderLink>
          { LoginOrLogout() }
        </NavBar>
      </div>
    );
  }
}

SmartHeader.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  smartheader: makeSelectSmartHeader(),
  loggedIn: makeSelectLoginloggedIn(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'smartHeader', reducer });

const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SmartHeader);
