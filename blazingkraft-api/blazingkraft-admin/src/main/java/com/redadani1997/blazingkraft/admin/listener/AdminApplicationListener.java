package com.redadani1997.blazingkraft.admin.listener;

import com.redadani1997.blazingkraft.client.factory.ClientsFactory;
import com.redadani1997.blazingkraft.common.application_event.ClusterAssignedApplicationEvent;
import com.redadani1997.blazingkraft.common.application_event.ClusterCreatedApplicationEvent;
import com.redadani1997.blazingkraft.common.application_event.ClusterDeletedApplicationEvent;
import com.redadani1997.blazingkraft.common.application_event.ClusterEditedApplicationEvent;
import com.redadani1997.blazingkraft.common.util.CommonLogUtils;
import com.redadani1997.blazingkraft.dao.dao.ClusterDao;
import com.redadani1997.blazingkraft.dao.model.ClusterModel;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@RequiredArgsConstructor
@Slf4j
public class AdminApplicationListener {
    private final ClusterDao clusterDao;
    private final ClientsFactory clientsFactory;

    @EventListener
    @Order(1)
    public void applicationStartedEvent(ApplicationStartedEvent readyEvent) {
        List<ClusterModel> clusterModels = this.clusterDao.findAll();

        for (ClusterModel clusterModel : clusterModels) {
            try {
                this.registerAdminClient(clusterModel);
            } catch (Exception ex) {
                String errorMessage =
                        String.format(
                                "Error while registering admin client for cluster: '%s', with error => '%s'"
                                        + ". Proceeding with application startup and will retry to re-construct client when requested.",
                                clusterModel.getCode(), ex.getMessage());
                log.error(CommonLogUtils.getError(errorMessage), ex);
            }
        }
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    @Order(0)
    public void clusterCreatedApplicationEvent(ClusterCreatedApplicationEvent eventData) {
        ClusterModel clusterModel = this.clusterDao.findByCode(eventData.getClusterCode());

        this.registerAdminClient(clusterModel);
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    @Order(0)
    public void clusterEditedApplicationEvent(ClusterEditedApplicationEvent eventData) {
        ClusterModel clusterModel = this.clusterDao.findByCode(eventData.getClusterCode());

        this.registerAdminClient(clusterModel);
    }

    @EventListener
    @Order(0)
    public void clusterAssignedApplicationEvent(ClusterAssignedApplicationEvent eventData) {
        String clusterCode = eventData.getClusterCode();
        try {
            this.clientsFactory.setCurrentAdminClient(clusterCode);
        } catch (Exception ex) {
            String warningMessage =
                    String.format(
                            "Cluster with code '%s' not found in the list of registered clients, will try to load from database...",
                            eventData.getClusterCode());
            log.warn(CommonLogUtils.getWarning(warningMessage));

            ClusterModel clusterModel = this.clusterDao.findByCode(clusterCode);

            this.registerAdminClient(clusterModel);

            this.clientsFactory.setCurrentAdminClient(clusterCode);
        }
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    @Order(0)
    public void clusterDeletedApplicationEvent(ClusterDeletedApplicationEvent eventData) {
        this.clientsFactory.unregisterAdminClient(eventData.getClusterCode());
    }

    private void registerAdminClient(ClusterModel clusterModel) {
        this.clientsFactory.registerAdminClient(
                clusterModel.getCode(),
                clusterModel.commonConfiguration(),
                clusterModel.getJmxEnabled(),
                clusterModel.getJmxUrl(),
                clusterModel.jmxEnvironment());
    }
}
