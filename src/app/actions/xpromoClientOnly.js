import { hasMobileApp } from 'lib/branchClientOnly';
import * as xpromoActions from './xpromo';

// The branch-sdk module makes an assumption that it runs in a browser
// environment, even just on load, so we cannot import it on the server. Right
// now we import all of the reducers on the server, though, and they in turn
// need access to the XPromo actions. So we separate the checkAndSet bound
// action creator (which has a branch dependency) from the other XPromo
// action code, so we can confine branch-sdk to the client.
export const checkAndSet = () => async (dispatch) => {
  const isUserHasMobileApp = await hasMobileApp();
  if (!isUserHasMobileApp) {
    dispatch(xpromoActions.checkAndSet());
  }
};
