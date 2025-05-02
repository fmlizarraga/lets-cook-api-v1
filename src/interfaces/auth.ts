export type UserGroupTypes = 'Guest' | 'Limited' | 'Member' | 'Gold' | 'Moderator' | 'Admin' | 'Staff';

export enum UserGroupValues {
    Guest = 'Guest',
    Limited = 'Limited',
    Member = 'Member',
    Gold = 'Gold',
    Moderator = 'Moderator',
    Admin = 'Admin',
    Staff = 'Staff'
};

export const roleHierarchy: UserGroupTypes[] = [
    'Guest',
    'Limited',
    'Member',
    'Gold',
    'Moderator',
    'Staff',
    'Admin'
];

export function hasMinimumGroup(userGroup: UserGroupTypes, requiredGroup: UserGroupTypes): boolean {
    return roleHierarchy.indexOf(userGroup) >= roleHierarchy.indexOf(requiredGroup);
}

export interface TokenPayload {
    id: string;
    group: UserGroupTypes;
};