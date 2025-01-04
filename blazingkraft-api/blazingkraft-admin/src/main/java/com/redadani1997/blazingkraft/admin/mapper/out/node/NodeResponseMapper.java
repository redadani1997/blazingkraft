package com.redadani1997.blazingkraft.admin.mapper.out.node;

import com.redadani1997.blazingkraft.admin.cluster.openapi.model.NodeApiResponse;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.apache.kafka.common.Node;
import org.springframework.stereotype.Component;

@Component
public class NodeResponseMapper {

    public NodeApiResponse clusterNodeApiResponse(Node node) {
        if (node == null) {
            return null;
        }

        NodeApiResponse nodeApiResponse = new NodeApiResponse();
        nodeApiResponse.setId(node.id());
        nodeApiResponse.setHost(node.host());
        nodeApiResponse.setIdString(node.idString());
        nodeApiResponse.setPort(node.port());
        nodeApiResponse.setRack(node.rack());
        return nodeApiResponse;
    }

    public List<NodeApiResponse> clusterNodeApiResponses(Collection<Node> nodes) {
        if (nodes == null) {
            return Collections.emptyList();
        }
        return nodes.stream().map(this::clusterNodeApiResponse).collect(Collectors.toList());
    }

    public com.redadani1997.blazingkraft.admin.topic.openapi.model.NodeApiResponse
            topicNodeApiResponse(Node node) {
        if (node == null) {
            return null;
        }

        com.redadani1997.blazingkraft.admin.topic.openapi.model.NodeApiResponse nodeApiResponse =
                new com.redadani1997.blazingkraft.admin.topic.openapi.model.NodeApiResponse();
        nodeApiResponse.setId(node.id());
        nodeApiResponse.setHost(node.host());
        nodeApiResponse.setIdString(node.idString());
        nodeApiResponse.setPort(node.port());
        nodeApiResponse.setRack(node.rack());
        return nodeApiResponse;
    }

    public List<com.redadani1997.blazingkraft.admin.topic.openapi.model.NodeApiResponse>
            topicNodeApiResponses(Collection<Node> nodes) {
        if (nodes == null) {
            return Collections.emptyList();
        }
        return nodes.stream().map(this::topicNodeApiResponse).collect(Collectors.toList());
    }

    public com.redadani1997.blazingkraft.admin.consumer_group.openapi.model.NodeApiResponse
            consumerGroupNodeApiResponse(Node node) {
        if (node == null) {
            return null;
        }

        com.redadani1997.blazingkraft.admin.consumer_group.openapi.model.NodeApiResponse
                nodeApiResponse =
                        new com.redadani1997.blazingkraft.admin.consumer_group.openapi.model.NodeApiResponse();
        nodeApiResponse.setId(node.id());
        nodeApiResponse.setHost(node.host());
        nodeApiResponse.setIdString(node.idString());
        nodeApiResponse.setPort(node.port());
        nodeApiResponse.setRack(node.rack());
        return nodeApiResponse;
    }

    public List<com.redadani1997.blazingkraft.admin.consumer_group.openapi.model.NodeApiResponse>
            consumerGroupNodeApiResponses(Collection<Node> nodes) {
        if (nodes == null) {
            return Collections.emptyList();
        }
        return nodes.stream().map(this::consumerGroupNodeApiResponse).collect(Collectors.toList());
    }
}
