package com.redadani1997.blazingkraft.producer.service.impl;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.factory.ProducerClientFactory;
import com.redadani1997.blazingkraft.client.model.cluster.CommonProducerClient;
import com.redadani1997.blazingkraft.common.application_event.ProducerUpdatedApplicationEvent;
import com.redadani1997.blazingkraft.common.enums.CommonSerde;
import com.redadani1997.blazingkraft.common.enums.EnumUtils;
import com.redadani1997.blazingkraft.dao.dao.ProducerDao;
import com.redadani1997.blazingkraft.dao.dao.SchemaRegistryDao;
import com.redadani1997.blazingkraft.dao.model.ProducerModel;
import com.redadani1997.blazingkraft.producer.dto.in.producer_configuration.ProducerConfigurationUpdateRequest;
import com.redadani1997.blazingkraft.producer.mapper.out.ProducerResponseMapper;
import com.redadani1997.blazingkraft.producer.mapper.out.producer_configuration.ProducerConfigurationResponseMapper;
import com.redadani1997.blazingkraft.producer.openapi.model.ProducerCompleteConfigurationApiResponse;
import com.redadani1997.blazingkraft.producer.openapi.model.ProducerConfigurationApiResponse;
import com.redadani1997.blazingkraft.producer.service.ProducerConfigurationService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProducerConfigurationServiceImpl implements ProducerConfigurationService {
    private final ProducerResponseMapper producerResponseMapper;
    private final ProducerClientFactory producerClientFactory;
    private final ProducerDao producerDao;
    private final SchemaRegistryDao schemaRegistryDao;
    private final ApplicationEventPublisher applicationEventPublisher;

    private final ClientsFactory clientsFactory;

    @Override
    @Transactional
    public ProducerConfigurationApiResponse updateProducerConfiguration(
            ProducerConfigurationUpdateRequest request) {
        // Create Producer in DB
        ProducerModel producerModel =
                this.producerDao.findByCode(this.currentProducerClient().clusterCode());

        producerModel.setPerRequestKeySerializer(request.getPerRequestKeySerializer());
        producerModel.setKeySerializer(EnumUtils.toName(request.getKeySerializer()));
        if (CommonSerde.isSchemaRegistrySerde(request.getKeySerializer())) {
            producerModel.setKeySerializerConfiguration(request.getKeySerializerConfiguration());
        }

        producerModel.setPerRequestValueSerializer(request.getPerRequestValueSerializer());
        producerModel.setValueSerializer(EnumUtils.toName(request.getValueSerializer()));
        if (CommonSerde.isSchemaRegistrySerde(request.getValueSerializer())) {
            producerModel.setValueSerializerConfiguration(request.getValueSerializerConfiguration());
        }

        producerModel.setMainConfiguration(request.getMainConfiguration());
        ProducerModel savedProducerModel = this.producerDao.save(producerModel);

        // Notify Listeners
        this.applicationEventPublisher.publishEvent(
                new ProducerUpdatedApplicationEvent(savedProducerModel.getCode()));

        return this.producerConfigurationResponseMapper()
                .producerConfigurationApiResponse(savedProducerModel);
    }

    @Override
    public ProducerCompleteConfigurationApiResponse getProducerCompleteConfiguration() {
        ProducerModel producerModel =
                this.producerDao.findByCode(this.currentProducerClient().clusterCode());

        return this.producerConfigurationResponseMapper()
                .producerCompleteConfigurationApiResponse(producerModel);
    }

    @Override
    public ProducerConfigurationApiResponse getProducerConfiguration() {
        ProducerModel producerModel =
                this.producerDao.findByCode(this.currentProducerClient().clusterCode());

        return this.producerConfigurationResponseMapper()
                .producerConfigurationApiResponse(producerModel);
    }

    private ProducerConfigurationResponseMapper producerConfigurationResponseMapper() {
        return this.producerResponseMapper.producerConfigurationResponseMapper();
    }

    private CommonProducerClient currentProducerClient() {
        return this.clientsFactory.currentProducerClient();
    }
}
