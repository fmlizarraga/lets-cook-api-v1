import { UserGroupTypes } from '../interfaces/auth';

export const permissions = {
    readPost: ['Guest', 'Limited', 'Member', 'Gold', 'Moderator', 'Staff', 'Admin'],
    createPost: ['Member', 'Gold', 'Moderator', 'Staff', 'Admin'],
    comment: ['Member', 'Gold', 'Moderator', 'Staff', 'Admin'],
    moderatePosts: ['Moderator', 'Staff', 'Admin'],
    manageUsers: ['Staff', 'Admin'],
    fullAccess: ['Admin']
} as const;


export type PermissionName = keyof typeof permissions;

export function hasPermission(group: UserGroupTypes, permission: PermissionName): boolean {
    return permissions[permission].includes(group as any);
}
