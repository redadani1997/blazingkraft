package com.redadani1997.blazingkraft.management.service;

import com.redadani1997.blazingkraft.management.dto.in.oidc_provider.*;
import com.redadani1997.blazingkraft.management.oidc_provider.openapi.model.OIDCProviderApiResponse;
import java.util.List;

public interface OIDCProviderService {
    OIDCProviderApiResponse createOIDCProvider(OIDCProviderCreateRequest request);

    void deleteOIDCProvider(OIDCProviderDeleteRequest request);

    OIDCProviderApiResponse editOIDCProvider(OIDCProviderEditRequest request);

    List<OIDCProviderApiResponse> getAllOIDCProviders();

    OIDCProviderApiResponse getOIDCProviderDetails(OIDCProviderDetailsRequest request);

    void testOIDCProviderConnectivity(OIDCProviderTestConnectivityRequest request);
}
