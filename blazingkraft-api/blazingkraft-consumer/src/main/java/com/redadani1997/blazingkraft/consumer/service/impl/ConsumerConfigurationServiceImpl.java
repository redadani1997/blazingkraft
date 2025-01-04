package com.redadani1997.blazingkraft.consumer.service.impl;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.factory.ConsumerClientFactory;
import com.redadani1997.blazingkraft.client.model.cluster.CommonConsumerClient;
import com.redadani1997.blazingkraft.common.application_event.ConsumerUpdatedApplicationEvent;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.consumer.dto.in.consumer_configuration.ConsumerConfigurationUpdateRequest;
import com.redadani1997.blazingkraft.consumer.mapper.out.ConsumerResponseMapper;
import com.redadani1997.blazingkraft.consumer.mapper.out.consumer_configuration.ConsumerConfigurationResponseMapper;
import com.redadani1997.blazingkraft.consumer.openapi.model.ConsumerCompleteConfigurationApiResponse;
import com.redadani1997.blazingkraft.consumer.openapi.model.ConsumerConfigurationApiResponse;
import com.redadani1997.blazingkraft.consumer.service.ConsumerConfigurationService;
import com.redadani1997.blazingkraft.dao.dao.ConsumerDao;
import com.redadani1997.blazingkraft.dao.dao.SchemaRegistryDao;
import com.redadani1997.blazingkraft.dao.model.ConsumerModel;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConsumerConfigurationServiceImpl implements ConsumerConfigurationService {
    private final ConsumerResponseMapper consumerResponseMapper;
    private final ConsumerClientFactory consumerClientFactory;
    private final ConsumerDao consumerDao;
    private final SchemaRegistryDao schemaRegistryDao;
    private final ApplicationEventPublisher applicationEventPublisher;

    private final ClientsFactory clientsFactory;

    @Override
    @Transactional
    public ConsumerConfigurationApiResponse updateConsumerConfiguration(
            ConsumerConfigurationUpdateRequest request) {
        // Create Consumer in DB
        ConsumerModel consumerModel =
                this.consumerDao.findByCode(this.currentConsumerClient().clusterCode());

        consumerModel.setPollTimeoutMs(request.getPollTimeoutMs());

        consumerModel.setPerRequestKeyDeserializer(request.getPerRequestKeyDeserializer());
        consumerModel.setKeyDeserializer(EnumUtils.toName(request.getKeyDeserializer()));
        if (CommonSerde.isSchemaRegistrySerde(request.getKeyDeserializer())) {
            consumerModel.setKeyDeserializerConfiguration(request.getKeyDeserializerConfiguration());
        }

        consumerModel.setPerRequestValueDeserializer(request.getPerRequestValueDeserializer());
        consumerModel.setValueDeserializer(EnumUtils.toName(request.getValueDeserializer()));
        if (CommonSerde.isSchemaRegistrySerde(request.getValueDeserializer())) {
            consumerModel.setValueDeserializerConfiguration(request.getValueDeserializerConfiguration());
        }

        consumerModel.setMainConfiguration(request.getMainConfiguration());
        ConsumerModel savedConsumerModel = this.consumerDao.save(consumerModel);

        // Notify Listeners
        this.applicationEventPublisher.publishEvent(
                new ConsumerUpdatedApplicationEvent(savedConsumerModel.getCode()));

        return this.consumerConfigurationResponseMapper()
                .consumerConfigurationApiResponse(savedConsumerModel);
    }

    @Override
    public ConsumerCompleteConfigurationApiResponse getConsumerCompleteConfiguration() {
        ConsumerModel consumerModel =
                this.consumerDao.findByCode(this.currentConsumerClient().clusterCode());

        return this.consumerConfigurationResponseMapper()
                .consumerCompleteConfigurationApiResponse(consumerModel);
    }

    @Override
    public ConsumerConfigurationApiResponse getConsumerConfiguration() {
        ConsumerModel consumerModel =
                this.consumerDao.findByCode(this.currentConsumerClient().clusterCode());

        return this.consumerConfigurationResponseMapper()
                .consumerConfigurationApiResponse(consumerModel);
    }

    private ConsumerConfigurationResponseMapper consumerConfigurationResponseMapper() {
        return this.consumerResponseMapper.consumerConfigurationResponseMapper();
    }

    private CommonConsumerClient currentConsumerClient() {
        return this.clientsFactory.currentConsumerClient();
    }
}
