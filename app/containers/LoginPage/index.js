/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import A from 'components/A';
import Button from 'components/Button';
//import Form from 'containers/HomePage/Form';
import { Container, GridItem } from 'components/Grid';
import ErrorMessage from 'components/ErrorMessage';
//import Input from 'containers/HomePage/Input';
import Input from 'components/Input';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import selectLoginPageDomain from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { login, changeUsername, changePassword } from './actions';

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>

            <form onSubmit={this.props.onSubmitForm}>
        <Container columns="2">
          <GridItem row="1" col="1 / span 2">
            <ErrorMessage />
          </GridItem>
          <GridItem row="2" col="1 / span 2">
            <Input inputType="textOnly" name="username" label="Name" placeholder="Username"
                  id="username"
                  value={this.props.username}
        onChange={this.props.onChangeUsername}
        required
            />
          </GridItem>
          <GridItem row="3" col="1 / span 2">
            <Input inputType="password" name="password" label="Password" placeholder="••••••••"
        id="password"
        value={this.props.password}
        onChange={this.props.onChangePassword}
        required
            />
          </GridItem>
          <GridItem row="4" col="1">
            {
              this.props.currentlySending ? (
                <Button submit fill color="primary">Loading!</Button>
              ) : (
                <button>Login</button>
              )
            }
          </GridItem>
          <GridItem row="4" col="2" center>
            {
              (this.props.btnText === 'Signup') ? (
                <A href="/login">Existing User?</A>
              ) : (
                <A href="/signup">New User?</A>
              )
            }
          </GridItem>
        </Container>
      </form>

      </div>
    );
  }
}

LoginPage.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginpage: selectLoginPageDomain(),
});

function mapDispatchToProps(dispatch) {
  return {
      onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
      onChangePassword: (evt) => dispatch(changePassword(evt.target.value)),
      onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
       dispatch(login());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
