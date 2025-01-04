package com.redadani1997.blazingkraft.admin.service;

import com.redadani1997.blazingkraft.admin.dto.in.topic.*;
import com.redadani1997.blazingkraft.admin.topic.openapi.model.TopicConfigurationApiResponse;
import com.redadani1997.blazingkraft.admin.topic.openapi.model.TopicDescriptionApiResponse;
import com.redadani1997.blazingkraft.admin.topic.openapi.model.TopicDetailsApiResponse;
import com.redadani1997.blazingkraft.admin.topic.openapi.model.TopicListingApiResponse;
import java.util.List;

public interface TopicService {

    TopicListingApiResponse createTopic(TopicCreateRequest topicCreateRequest);

    List<TopicDescriptionApiResponse> describeTopics(
            TopicsDescriptionRequest topicsDescriptionRequest);

    List<TopicDescriptionApiResponse> describeTopics();

    TopicDescriptionApiResponse describeTopic(TopicDescriptionRequest topicDescriptionRequest);

    List<TopicListingApiResponse> listTopics();

    void deleteTopic(TopicDeleteRequest topicDeleteRequest);

    TopicDetailsApiResponse getTopicDetails(TopicDetailsRequest request);

    void deleteTopicRecords(TopicDeleteRecordsRequest request);

    void editTopicConfiguration(TopicConfigurationEditRequest request);

    TopicConfigurationApiResponse getTopicConfiguration(TopicConfigurationRequest request);

    void increaseTopicPartitions(TopicPartitionIncreaseRequest request);
}
