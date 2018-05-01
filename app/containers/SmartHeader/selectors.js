import { createSelector } from 'reselect';

/**
 * Direct selector to the smartHeader state domain
 */
const selectSmartHeaderDomain = (state) => state.get('smartHeader');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SmartHeader
 */

const makeSelectSmartHeader = () => createSelector(
  selectSmartHeaderDomain,
  (substate) => substate.toJS()
);

export default makeSelectSmartHeader;
export {
  selectSmartHeaderDomain,
};
