export interface RoleCardDataType {
  title: string
  avatars: string[]
  totalUsers: number
}
export interface Children {
  path: string
  role: string
}
export interface Role {
  title: string
  children: Children[]
}
export interface RoleDataType {
  _id: string
  name: string
  paths?: string[]
  permissions?: string[]
}
