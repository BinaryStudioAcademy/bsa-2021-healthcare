import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AppRoute, PermissionName } from 'common/enums';
import { AuthorizedRoute } from 'components/common';
import Users from 'components/users/users';
import Sign from 'components/sign/sign';
import NotFound from 'components/not-found/not-found';
import Profile from 'components/profile/profile';
import Clinics from 'components/clinics/clinics';
import Doctors from 'components/doctors/doctors';
import DoctorDetails from 'components/doctor-details/doctor-details';
import Notifications from 'components/notifications/notifications';
import Map from 'components/map/map';
import Permissions from 'components/permissions/permissions-page';
import Messages from 'components/messages/messages';

const App: React.FC = () => (
  <Switch>
    <Redirect from={AppRoute.ROOT} exact to={AppRoute.DOCTORS} />
    <Route path={[AppRoute.SIGN_IN, AppRoute.SIGN_UP]} component={Sign} />
    <AuthorizedRoute path={AppRoute.NOTIFICATIONS} component={Notifications} />
    <AuthorizedRoute
      path={AppRoute.USER_PROFILE_$ID}
      exact
      component={Profile}
    />
    <AuthorizedRoute path={AppRoute.CLINICS} component={Clinics} />
    <AuthorizedRoute path={AppRoute.DOCTORS} component={Doctors} />
    <AuthorizedRoute
      path={AppRoute.DOCTOR_DETAILS_$ID}
      component={DoctorDetails}
    />
    <AuthorizedRoute
      exact
      path={AppRoute.USERS}
      component={Users}
      permissions={[PermissionName.CREATE_USER, PermissionName.EDIT_USER]}
    />
    <AuthorizedRoute
      exact
      path={AppRoute.MAP}
      component={Map}
      permissions={[PermissionName.MAP_MANIPULATION]}
    />
    <AuthorizedRoute path={AppRoute.PERMISSIONS} component={Permissions} permissions={[PermissionName.EDIT_PERMISSIONS]} />
    <AuthorizedRoute path={AppRoute.MY_CHATS} component={Messages} />
    <Route path="*" exact component={NotFound} />
  </Switch>
);

export default App;
