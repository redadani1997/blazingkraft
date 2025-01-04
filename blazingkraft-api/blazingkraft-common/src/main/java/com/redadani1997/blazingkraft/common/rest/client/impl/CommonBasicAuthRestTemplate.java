package com.redadani1997.blazingkraft.common.rest.client.impl;

import com.redadani1997.blazingkraft.common.rest.client.CommonRestClient;
import java.util.ArrayList;
import java.util.List;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.client.support.BasicAuthenticationInterceptor;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;

public class CommonBasicAuthRestTemplate implements CommonRestClient {
    private final RestTemplate restTemplate;

    public CommonBasicAuthRestTemplate(
            String url, String basicAuthUsername, String basicAuthPassword) {
        SimpleClientHttpRequestFactory clientHttpRequestFactory = new SimpleClientHttpRequestFactory();

        clientHttpRequestFactory.setConnectTimeout(25 * 1000);
        clientHttpRequestFactory.setReadTimeout(25 * 1000);

        RestTemplate restTemplate = new RestTemplate(clientHttpRequestFactory);

        restTemplate.setUriTemplateHandler(new DefaultUriBuilderFactory(url));

        List<ClientHttpRequestInterceptor> interceptors = restTemplate.getInterceptors();
        if (CollectionUtils.isEmpty(interceptors)) {
            interceptors = new ArrayList<>();
        }
        interceptors.add(new BasicAuthenticationInterceptor(basicAuthUsername, basicAuthPassword));
        restTemplate.setInterceptors(interceptors);

        this.restTemplate = restTemplate;
    }

    @Override
    public RestTemplate restTemplate() {
        return this.restTemplate;
    }
}
