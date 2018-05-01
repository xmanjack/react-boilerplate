import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import { connect } from 'react-redux';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';
import { logout } from 'containers/LoginPage/actions';

//import LogoutButton from 'containers/LogoutButton';


class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
   render(){
       const Greeting3 = () => {
	   var loggedin = true;
	   if (typeof this.props.loggedIn === "undefined") {
	       loggedin = false;
	   } else {
	       loggedin = this.props.loggedIn;
	   }
	   
	    switch(loggedin){
	    case true:
	    	return (
              /* <HeaderLink onClick={() => this.props.dispatch(logout())} activeClassName="active">
	       		<FormattedMessage {...messages.logout} />
               </HeaderLink>*/
	    		<HeaderLink to="/test1">
	    		<FormattedMessage {...messages.logout} />
	    		</HeaderLink>

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
          <Img src={Banner} alt="react-boilerplate - Logo" />
        </A>
        <NavBar>
          <HeaderLink to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/features">
            <FormattedMessage {...messages.features} />
          </HeaderLink>
		{ Greeting3() }
            </NavBar>
	    </div>
	);
    }
}


function mapStateToProps(state) {
  return {
    loggedIn: state.getIn(['global', 'loggedIn']),
  };
}

Header.propTypes = {
  dispatch: PropTypes.func,
  loggedIn: PropTypes.bool,
};

export default connect(mapStateToProps)(Header);

