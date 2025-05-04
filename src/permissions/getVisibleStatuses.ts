import { hasMinimumGroup, UserGroupTypes, UserGroupValues } from "../interfaces/auth";
import { PostStatus, StatusValues } from "../interfaces/blog";

export const BASE_STATUSES = [
    StatusValues.Approved,
    StatusValues.Pinned,
    StatusValues.Flagged
];

export function getVisibleStatuses(
    userId: string | undefined,
    userGroup: UserGroupTypes,
    resourceOwnerId: string
): PostStatus[] {
    if (userId && userId === resourceOwnerId) {
        return [
            StatusValues.Draft,
            StatusValues.Pending,
            StatusValues.Approved,
            StatusValues.Pinned,
            StatusValues.Flagged
        ];
    }
    
    if (userGroup && hasMinimumGroup(userGroup, UserGroupValues.Admin)) {
        return Object.values(StatusValues);
    }

    if (userGroup && hasMinimumGroup(userGroup, UserGroupValues.Moderator)) {
        return [
            StatusValues.Pending,
            StatusValues.Approved,
            StatusValues.Pinned,
            StatusValues.Flagged,
            StatusValues.Hidden,
            StatusValues.Deleted
        ];
    }

    return BASE_STATUSES;
}