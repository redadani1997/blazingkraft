package com.redadani1997.blazingkraft.management.service;

import com.redadani1997.blazingkraft.management.dto.in.group.GroupCreateRequest;
import com.redadani1997.blazingkraft.management.dto.in.group.GroupDeleteRequest;
import com.redadani1997.blazingkraft.management.dto.in.group.GroupDetailsRequest;
import com.redadani1997.blazingkraft.management.dto.in.group.GroupEditRequest;
import com.redadani1997.blazingkraft.management.group.openapi.model.GroupApiResponse;
import com.redadani1997.blazingkraft.management.group.openapi.model.GroupMetaApiResponse;
import java.util.List;

public interface GroupService {
    GroupMetaApiResponse createGroup(GroupCreateRequest request);

    void deleteGroup(GroupDeleteRequest request);

    GroupMetaApiResponse editGroup(GroupEditRequest request);

    List<GroupMetaApiResponse> getAllGroups();

    GroupApiResponse getGroupDetails(GroupDetailsRequest request);

    void deleteGroupWithUsers(GroupDeleteRequest request);
}
