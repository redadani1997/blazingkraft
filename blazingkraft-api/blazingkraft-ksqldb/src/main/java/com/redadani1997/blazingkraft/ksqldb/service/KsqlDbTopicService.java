package com.redadani1997.blazingkraft.ksqldb.service;

import com.redadani1997.blazingkraft.ksqldb.ksqldb_topic.openapi.model.KsqlDbTopicApiResponse;
import java.util.List;

public interface KsqlDbTopicService {

    List<KsqlDbTopicApiResponse> getAllKsqlDbTopics();
}
