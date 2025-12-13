/**
 * Role-Based Access Control (RBAC) Middleware
 * Defines permissions for: Super Admin, Admin/Manager, Editor
 */

const ROLES = {
  SUPER_ADMIN: 'super-admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  EDITOR: 'editor',
};

const PERMISSIONS = {
  // System Level
  MANAGE_USERS: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  MANAGE_ROLES: [ROLES.SUPER_ADMIN],
  SITE_CONFIG: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  
  // Content Management
  CREATE_CONTENT: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER, ROLES.EDITOR],
  EDIT_CONTENT: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER, ROLES.EDITOR],
  DELETE_CONTENT: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER],
  PUBLISH_CONTENT: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER],
  
  // Registrations & Applications
  VIEW_REGISTRATIONS: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER, ROLES.EDITOR],
  APPROVE_REGISTRATIONS: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER],
  MANAGE_REGISTRATIONS: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER],
  
  // Donor Management
  VIEW_DONORS: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER],
  MANAGE_DONORS: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER],
  
  // Communications
  VIEW_CONTACTS: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER],
  MANAGE_CONTACTS: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER],
  
  // Archive & Delete
  ARCHIVE: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER],
  DELETE: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER],
};

/**
 * Check if user has required permission
 */
const hasPermission = (userRole, permission) => {
  const allowedRoles = PERMISSIONS[permission] || [];
  return allowedRoles.includes(userRole);
};

/**
 * Middleware: Check if user is authenticated
 */
const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required',
    });
  }
  next();
};

/**
 * Middleware: Check if user has specific role(s)
 */
const hasRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Access denied. Insufficient permissions.',
        requiredRole: allowedRoles,
        yourRole: req.user.role,
      });
    }

    next();
  };
};

/**
 * Middleware: Check specific permission
 */
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
      });
    }

    if (!hasPermission(req.user.role, permission)) {
      return res.status(403).json({
        success: false,
        error: `Access denied. Required permission: ${permission}`,
        yourRole: req.user.role,
      });
    }

    next();
  };
};

/**
 * AdminJS-specific role check functions
 */
const canAccessAdmin = ({ currentAdmin }) => {
  return currentAdmin && Object.values(ROLES).includes(currentAdmin.role);
};

const canEdit = ({ currentAdmin }) => {
  return currentAdmin && [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER, ROLES.EDITOR].includes(currentAdmin.role);
};

const canDelete = ({ currentAdmin }) => {
  return currentAdmin && [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER].includes(currentAdmin.role);
};

const canApprove = ({ currentAdmin }) => {
  return currentAdmin && [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER].includes(currentAdmin.role);
};

const canManageUsers = ({ currentAdmin }) => {
  return currentAdmin && [ROLES.SUPER_ADMIN, ROLES.ADMIN].includes(currentAdmin.role);
};

const canManageSiteConfig = ({ currentAdmin }) => {
  return currentAdmin && [ROLES.SUPER_ADMIN, ROLES.ADMIN].includes(currentAdmin.role);
};

const canViewDonors = ({ currentAdmin }) => {
  return currentAdmin && [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER].includes(currentAdmin.role);
};

const canViewContacts = ({ currentAdmin }) => {
  return currentAdmin && [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER].includes(currentAdmin.role);
};

const isSuperAdmin = ({ currentAdmin }) => {
  return currentAdmin && currentAdmin.role === ROLES.SUPER_ADMIN;
};

module.exports = {
  ROLES,
  PERMISSIONS,
  hasPermission,
  isAuthenticated,
  hasRole,
  requirePermission,
  // AdminJS helpers
  canAccessAdmin,
  canEdit,
  canDelete,
  canApprove,
  canManageUsers,
  canManageSiteConfig,
  canViewDonors,
  canViewContacts,
  isSuperAdmin,
};
