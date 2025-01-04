package com.redadani1997.blazingkraft.common.rest.client.impl;

import com.redadani1997.blazingkraft.common.rest.client.CommonRestClient;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;

public class CommonNoAuthRestTemplate implements CommonRestClient {
    private final RestTemplate restTemplate;

    public CommonNoAuthRestTemplate(String url) {
        this.restTemplate = createRestTemplate(url, 25);
    }

    public CommonNoAuthRestTemplate(String url, Integer timeout) {
        this.restTemplate = createRestTemplate(url, timeout);
    }

    private RestTemplate createRestTemplate(String url, Integer timeout) {
        SimpleClientHttpRequestFactory clientHttpRequestFactory = new SimpleClientHttpRequestFactory();

        clientHttpRequestFactory.setConnectTimeout(timeout * 1000);
        clientHttpRequestFactory.setReadTimeout(timeout * 1000);

        RestTemplate restTemplate = new RestTemplate(clientHttpRequestFactory);

        restTemplate.setUriTemplateHandler(new DefaultUriBuilderFactory(url));

        return restTemplate;
    }

    @Override
    public RestTemplate restTemplate() {
        return this.restTemplate;
    }
}
