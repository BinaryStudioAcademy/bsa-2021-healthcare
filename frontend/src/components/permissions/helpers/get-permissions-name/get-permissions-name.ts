import { IUserWithPermissions } from 'common/interfaces';

const getPermissionsNames = (user: IUserWithPermissions): string[] => {
  return user.permissions != undefined
    ? user.permissions.map((permission) => permission.name)
    : [];
};

export { getPermissionsNames };
