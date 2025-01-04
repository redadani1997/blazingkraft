package com.redadani1997.blazingkraft.client.factory;

import java.util.Map;
import org.apache.kafka.clients.admin.Admin;

public interface AdminClientFactory {
    Admin createAdminClient(Map<String, Object> configuration);
}
