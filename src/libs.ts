import _ from 'lodash';
import { IRoles } from './modules/auth/interfaces/roles.i';

export const isDevelop = (roles: IRoles[]) => {
  const isDev = _.filter(roles, (role) => role.name === 'DEVELOP');
  return isDev.length > 0;
};
