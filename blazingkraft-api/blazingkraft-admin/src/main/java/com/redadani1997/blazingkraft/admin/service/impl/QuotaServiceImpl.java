package com.redadani1997.blazingkraft.admin.service.impl;

import com.redadani1997.blazingkraft.admin.dto.in.quota.QuotaAlterRequest;
import com.redadani1997.blazingkraft.admin.dto.in.quota.QuotaDescribeRequest;
import com.redadani1997.blazingkraft.admin.mapper.out.AdminResponseMapper;
import com.redadani1997.blazingkraft.admin.mapper.out.quota.QuotaResponseMapper;
import com.redadani1997.blazingkraft.admin.quota.openapi.model.QuotaDescribeApiResponse;
import com.redadani1997.blazingkraft.admin.service.QuotaService;
import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.client.model.cluster.CommonAdminClient;
import com.redadani1997.blazingkraft.common.future.KafkaFutureMode;
import com.redadani1997.blazingkraft.common.future.KafkaFutureUtils;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.admin.AlterClientQuotasOptions;
import org.apache.kafka.common.quota.ClientQuotaEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuotaServiceImpl implements QuotaService {

    private final AdminResponseMapper adminResponseMapper;

    private final ClientsFactory clientsFactory;

    @Override
    public void alterQuotas(QuotaAlterRequest request) {
        AlterClientQuotasOptions options = new AlterClientQuotasOptions();
        options.validateOnly(request.getValidateOnly());

        KafkaFutureUtils.resolve(
                this.currentAdminClient().client().alterClientQuotas(request.getEntries(), options).all(),
                KafkaFutureMode.ADMIN);
    }

    @Override
    public List<QuotaDescribeApiResponse> describeQuotas(QuotaDescribeRequest request) {
        Map<ClientQuotaEntity, Map<String, Double>> entities =
                KafkaFutureUtils.resolve(
                        this.currentAdminClient().client().describeClientQuotas(request.getFilter()).entities(),
                        KafkaFutureMode.ADMIN);

        return this.quotaResponseMapper().quotaDescribeApiResponses(entities);
    }

    private CommonAdminClient currentAdminClient() {
        return this.clientsFactory.currentAdminClient();
    }

    private QuotaResponseMapper quotaResponseMapper() {
        return this.adminResponseMapper.quotaResponseMapper();
    }
}
