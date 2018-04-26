import { createSelector } from 'reselect';

/**
 * Direct selector to the loginPage state domain
 */
const selectLoginPageDomain = (state) => state.get('loginPage');

/**
 * Other specific selectors
 */
const makeSelectLoginUsername = () => createSelector(
  selectLoginPageDomain,
  (loginState) => loginState.get('username')
);

const makeSelectLoginPassword = () => createSelector(
  selectLoginPageDomain,
  (passwordState) => loginState.get('password')
);

/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = () => createSelector(
  selectLoginPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectLoginPage;
export {
    selectLoginPageDomain,
    makeSelectLoginUsername,
    makeSelectLoginPassword,
};
