const roleCheck = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401);
      throw new Error('User not authenticated');
    }

    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(`Access denied. Required roles: ${roles.join(', ')}`);
    }

    next();
  };
};

const isAdmin = roleCheck('admin', 'super-admin');
const isSuperAdmin = roleCheck('super-admin');
const isEditor = roleCheck('editor', 'admin', 'super-admin');

module.exports = { roleCheck, isAdmin, isSuperAdmin, isEditor };
