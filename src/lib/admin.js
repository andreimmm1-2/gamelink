// Admin utility functions for role-based access control

export const ADMIN_ROLES = {
  OWNER: 'owner',
  CO_OWNER: 'co-owner',
  STAFF_MANAGER: 'staff-manager',
  STAFF: 'staff',
  USER: 'user'
}

export const ROLE_PERMISSIONS = {
  owner: {
    viewUsers: true,
    editUsers: true,
    deleteUsers: true,
    managePromotions: true,
    manageServers: true,
    manageStaff: true,
    viewAnalytics: true,
    modifySettings: true,
    viewTickets: true,
    resolveTickets: true
  },
  'co-owner': {
    viewUsers: true,
    editUsers: true,
    deleteUsers: false,
    managePromotions: true,
    manageServers: true,
    manageStaff: true,
    viewAnalytics: true,
    modifySettings: false,
    viewTickets: true,
    resolveTickets: true
  },
  'staff-manager': {
    viewUsers: true,
    editUsers: false,
    deleteUsers: false,
    managePromotions: false,
    manageServers: false,
    manageStaff: true,
    viewAnalytics: false,
    modifySettings: false,
    viewTickets: true,
    resolveTickets: true
  },
  staff: {
    viewUsers: true,
    editUsers: false,
    deleteUsers: false,
    managePromotions: false,
    manageServers: false,
    manageStaff: false,
    viewAnalytics: false,
    modifySettings: false,
    viewTickets: true,
    resolveTickets: true
  }
}

export function hasPermission(role, permission) {
  const permissions = ROLE_PERMISSIONS[role]
  return permissions && permissions[permission] === true
}

export function isAdminRole(role) {
  return role !== 'user' && ADMIN_ROLES[role.toUpperCase().replace('-', '_')]
}
