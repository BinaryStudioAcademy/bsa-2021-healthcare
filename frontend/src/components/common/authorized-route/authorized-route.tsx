import React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { CustomRecord } from 'common/types';
import { AppRoute, PermissionName } from 'common/enums';
import { checkHasPermission } from './helpers';
import AuthorizedWrapper from '../authorized-wrapper/authorized-wrapper';
import { getUserFromState } from 'helpers';

interface IRouteProps extends RouteProps {
  redirectTo?: AppRoute,
  permissions?: PermissionName[],
  component: React.ComponentType<RouteComponentProps<CustomRecord>>,
}

const AuthorizedRoute: React.FC<IRouteProps> = ({ component: Component, redirectTo = AppRoute.NOT_FOUND, permissions = [], ...otherProps }) => {
  const user = getUserFromState();
  const hasUser = Boolean(user);
  const hasPermission = checkHasPermission(permissions, user?.permissions ?? []);

  return (
    <Route {...otherProps} render={props => {
      return hasUser
        ? hasPermission
          ? (
            <AuthorizedWrapper>
              <Component {...props} />
            </AuthorizedWrapper>
          )
          : <Redirect to={redirectTo} />
        : <Redirect to={AppRoute.SIGN_IN} />;
    }} />
  );
};

export default AuthorizedRoute;
