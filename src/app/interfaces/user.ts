export interface Roles {
  basic?: boolean;
  admin?: boolean;
}

export interface User {
  displayName: string;
  email: string;
  lastLogin: any;
  roles: Roles;
  uid: string;
}
