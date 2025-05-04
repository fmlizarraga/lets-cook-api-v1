import { hasMinimumGroup, UserGroupTypes, UserGroupValues } from "../interfaces/auth";
import { PostStatus, StatusValues } from "../interfaces/blog";

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
        return [
            StatusValues.Draft,
            StatusValues.Pending,
            StatusValues.Approved,
            StatusValues.Pinned,
            StatusValues.Flagged,
            StatusValues.Hidden,
            StatusValues.Deleted
        ];
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

    return [
        StatusValues.Approved,
        StatusValues.Pinned,
        StatusValues.Flagged
    ];
}