package com.redadani1997.blazingkraft.management.service.impl;

import com.redadani1997.blazingkraft.cache.service.DataMaskingCache;
import com.redadani1997.blazingkraft.dao.dao.DataMaskingDao;
import com.redadani1997.blazingkraft.dao.model.DataMaskingModel;
import com.redadani1997.blazingkraft.error.management.ManagementException;
import com.redadani1997.blazingkraft.management.data_masking.openapi.model.DataMaskingApiResponse;
import com.redadani1997.blazingkraft.management.dto.in.data_masking.DataMaskingCreateRequest;
import com.redadani1997.blazingkraft.management.dto.in.data_masking.DataMaskingDeleteRequest;
import com.redadani1997.blazingkraft.management.dto.in.data_masking.DataMaskingEditRequest;
import com.redadani1997.blazingkraft.management.mapper.out.ManagementResponseMapper;
import com.redadani1997.blazingkraft.management.mapper.out.data_masking.DataMaskingResponseMapper;
import com.redadani1997.blazingkraft.management.service.DataMaskingService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DataMaskingServiceImpl implements DataMaskingService {
    private final DataMaskingDao dao;
    private final ManagementResponseMapper managementResponseMapper;
    private final DataMaskingCache dataMaskingCache;

    @Override
    public DataMaskingApiResponse createDataMasking(DataMaskingCreateRequest request) {
        this.dataMaskingCache.invalidate();

        DataMaskingModel dataMaskingModel = new DataMaskingModel();

        dataMaskingModel.setCode(request.getCode());
        dataMaskingModel.setName(request.getName());
        dataMaskingModel.setDataMaskingType(request.getDataMaskingType());
        dataMaskingModel.setRule(request.getRule());
        dataMaskingModel.setRuleType(request.getRuleType());
        dataMaskingModel.setResult(request.getResult());
        dataMaskingModel.setTopicType(request.getTopicType());
        dataMaskingModel.setTopic(request.getTopic());

        DataMaskingModel savedDataMaskingModel = this.dao.create(dataMaskingModel);

        return this.dataMaskingResponseMapper().dataMaskingApiResponse(savedDataMaskingModel);
    }

    @Override
    public void deleteDataMasking(DataMaskingDeleteRequest request) {
        DataMaskingModel dataMaskingModel = this.dao.findByCode(request.getCode());

        this.dataMaskingCache.invalidate();

        this.dao.deleteById(dataMaskingModel.getId());
    }

    @Override
    public DataMaskingApiResponse editDataMasking(DataMaskingEditRequest request) {
        DataMaskingModel dataMaskingModel = this.dao.findByCode(request.getExistingCode());

        this.dataMaskingCache.invalidate();

        if (!request.getNewCode().equals(request.getExistingCode())) {
            Boolean newCodeExists = this.dao.existsByCode(request.getNewCode());
            if (newCodeExists) {
                throw new ManagementException(
                        String.format("Data Masking with code '%s' already exists", request.getNewCode()));
            }
        }

        dataMaskingModel.setCode(request.getNewCode());
        dataMaskingModel.setName(request.getName());
        dataMaskingModel.setDataMaskingType(request.getDataMaskingType());
        dataMaskingModel.setRule(request.getRule());
        dataMaskingModel.setRuleType(request.getRuleType());
        dataMaskingModel.setResult(request.getResult());
        dataMaskingModel.setTopicType(request.getTopicType());
        dataMaskingModel.setTopic(request.getTopic());

        DataMaskingModel savedDataMaskingModel = this.dao.update(dataMaskingModel);

        return this.dataMaskingResponseMapper().dataMaskingApiResponse(savedDataMaskingModel);
    }

    @Override
    public List<DataMaskingApiResponse> getAllDataMaskings() {
        List<DataMaskingModel> dataMakings = this.dao.findAll();
        return this.dataMaskingResponseMapper().dataMaskingApiResponses(dataMakings);
    }

    private DataMaskingResponseMapper dataMaskingResponseMapper() {
        return this.managementResponseMapper.dataMaskingResponseMapper();
    }
}
