package com.redadani1997.blazingkraft.consumer.processor;

import com.redadani1997.blazingkraft.common.util.CommonCastingUtils;
import com.redadani1997.blazingkraft.common.util.CommonTextUtils;
import com.redadani1997.blazingkraft.consumer.dto.in.blazing_consumer.ConsumerAdditionalFiltersRequest;
import com.redadani1997.blazingkraft.consumer.dto.out.blazing_consumer.BlazingConsumptionResponse;
import com.redadani1997.blazingkraft.error.admin.ConsumerException;
import lombok.extern.slf4j.Slf4j;
import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.Value;

import java.time.Duration;

@Slf4j
public class JavascriptProcessor implements ConsumerProcessor {

    private final Boolean disabled;
    private Value value;
    private Context context;

    public JavascriptProcessor(ConsumerAdditionalFiltersRequest consumerAdditionalFiltersRequest) {
        ConsumerAdditionalFiltersRequest.JavascriptFilter javascriptFilter =
                consumerAdditionalFiltersRequest.getJavascriptFilter();

        this.disabled = javascriptFilter.getDisabled();
        String code = "(" + javascriptFilter.getCode() + ")";
        if (disabled) {
            return;
        }
        try {
            this.context =
                    Context.newBuilder("js")
                            .allowValueSharing(false)
                            .allowExperimentalOptions(false)
                            .option("js.print", "false")
                            .option("js.nashorn-compat", "true")
                            .option("js.load", "false")
                            .option("js.console", "false")
                            .option("js.polyglot-builtin", "false")
                            .option("engine.WarnInterpreterOnly", "false")
                            .allowExperimentalOptions(true)
                            .build();
            this.value = this.context.eval("js", code);
            if (!this.value.canExecute()) {
                throw new ConsumerException("Javascript code must be executable!");
            }
        } catch (Exception ex) {
            if (this.context != null) {
                this.context.close();
            }
            if (ex instanceof ConsumerException) {
                throw ex;
            }
            throw new ConsumerException("Error while creating javascript filter!");
        }
    }

    @Override
    public Boolean doProcess(BlazingConsumptionResponse response) {
        if (disabled) {
            return true;
        }
        // key, value, headers, metadata
        if (!response.getKey().getSucceeded() || !response.getValue().getSucceeded()) {
            return false;
        }
        try {
            Value key = this.toPolyglotValue(response.getKey().getPayload());
            Value value = this.toPolyglotValue(response.getValue().getPayload());
            Value headers = this.toPolyglotValue(CommonTextUtils.mapToString(response.getHeaders()));
            Value metadata = this.toPolyglotValue(CommonCastingUtils.toJsonString(response.getMetadata()));

            Object[] args = new Object[] {key, value, headers, metadata};
            Value executed = this.value.execute(args);
            return executed.asBoolean();
        } catch (Exception ex) {
            return false;
        }
    }

    private static final String PARSER_JS_CODE = """
                (
                    function parser(payload) {
                        if (payload == null) {
                            return null;
                        }
                        try {
                            return JSON.parse(payload);
                        } catch (e) {
                            return payload;
                        }
                    }
                )
                """;

    private Value toPolyglotValue(String payload) {
        try {
            Value jsonObjectParser = this.context.eval("js", PARSER_JS_CODE);
            return jsonObjectParser.execute(payload);
        } catch (Exception ex) {
            return Value.asValue(payload);
        }
    }

    public void cleanUp() {
        if (disabled || this.context == null) {
            return;
        }
        try {
            this.context.interrupt(Duration.ZERO);
        } catch (Exception ignored) {
            // no-op
        }
        try {
            this.context.close();
            this.context = null;
        } catch (Exception ignored) {
            // no-op
        }
    }
}
