
import { fromJS } from 'immutable';
import smartHeaderReducer from '../reducer';

describe('smartHeaderReducer', () => {
  it('returns the initial state', () => {
    expect(smartHeaderReducer(undefined, {})).toEqual(fromJS({}));
  });
});
