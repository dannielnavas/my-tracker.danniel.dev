import boom from '@hapi/boom';
import { config } from './../config/config.js';

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  console.log(apiKey);
  console.log(config.apiKeyToken);
  if (apiKey === config.apiKeyToken) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkAdminRole(req, res, next) {
  const user = req.user;
  if (user.role === 'admin') {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
}
export { checkAdminRole, checkApiKey, checkRoles };
