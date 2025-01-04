package com.redadani1997.blazingkraft.client.validator;

public interface ConfigurationValidator<T, R> {
    R validateAndCompute(T configuration);
}
