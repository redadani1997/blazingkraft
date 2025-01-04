package com.redadani1997.blazingkraft.audit.mapper.out.search;

import com.redadani1997.blazingkraft.audit.audit_search.openapi.model.AuditSearchLogApiResponse;
import com.redadani1997.blazingkraft.audit.audit_search.openapi.model.AuditSearchLogPageApiResponse;
import com.redadani1997.blazingkraft.audit.audit_search.openapi.model.Paging;
import com.redadani1997.blazingkraft.dao.model.AuditModel;
import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
public class AuditSearchResponseMapper {
    public AuditSearchLogPageApiResponse auditSearchLogPageApiResponse(Page<AuditModel> auditPage) {
        AuditSearchLogPageApiResponse response = new AuditSearchLogPageApiResponse();

        response.setPaging(this.paging(auditPage.getPageable(), auditPage.getTotalElements()));
        response.setData(this.auditSearchLogApiResponses(auditPage.get()));

        return response;
    }

    private List<AuditSearchLogApiResponse> auditSearchLogApiResponses(
            Stream<AuditModel> auditModels) {
        if (auditModels == null) {
            return Collections.emptyList();
        }
        return auditModels.map(this::auditSearchLogApiResponse).toList();
    }

    private AuditSearchLogApiResponse auditSearchLogApiResponse(AuditModel auditModel) {
        AuditSearchLogApiResponse response = new AuditSearchLogApiResponse();

        response.setId(auditModel.getId());
        response.setAuditLevel(auditModel.getAuditLevel());
        response.setAction(auditModel.getAction());
        response.setEntity(auditModel.getEntity());
        response.setEntityType(auditModel.getEntityType());
        response.setSeverity(auditModel.getSeverity());
        response.setTimestamp(auditModel.getTimestamp());
        response.setSettledMessage(auditModel.getSettledMessage());
        response.setUserIdentifier(auditModel.getUserIdentifier());
        response.setUserDisplayedName(auditModel.getUserDisplayedName());
        response.setSubject(auditModel.getSubject());

        return response;
    }

    private Paging paging(Pageable pageable, long totalElements) {
        Paging response = new Paging();

        response.setPage(pageable.getPageNumber());
        response.setSize(pageable.getPageSize());
        response.setTotalElements(totalElements);

        return response;
    }
}
