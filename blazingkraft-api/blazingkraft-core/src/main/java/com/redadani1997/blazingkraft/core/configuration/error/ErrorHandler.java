package com.redadani1997.blazingkraft.core.configuration.error;

import static com.redadani1997.blazingkraft.error.rest.ErrorCodes.*;

import com.redadani1997.blazingkraft.common.util.CommonLogUtils;
import com.redadani1997.blazingkraft.error.admin.AdminException;
import com.redadani1997.blazingkraft.error.audit.AuditException;
import com.redadani1997.blazingkraft.error.authorization.AuthorizationException;
import com.redadani1997.blazingkraft.error.authserver.AuthServerException;
import com.redadani1997.blazingkraft.error.client.ClientsException;
import com.redadani1997.blazingkraft.error.common.CommonException;
import com.redadani1997.blazingkraft.error.connect.KafkaConnectException;
import com.redadani1997.blazingkraft.error.files.FilesException;
import com.redadani1997.blazingkraft.error.io.CommonIOException;
import com.redadani1997.blazingkraft.error.jmx.JmxException;
import com.redadani1997.blazingkraft.error.ksqldb.KsqlDbException;
import com.redadani1997.blazingkraft.error.management.ManagementException;
import com.redadani1997.blazingkraft.error.playground.PlaygroundException;
import com.redadani1997.blazingkraft.error.rest.RestError;
import com.redadani1997.blazingkraft.error.schemaregistry.SchemaRegistryException;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.common.KafkaException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@Slf4j
public class ErrorHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {
        doLog(ex);

        String errorCode = getErrorCode(BAD_ARGUMENTS_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;

        String errorMessage = "Bad Request Arguments !";

        List<String> errors = new ArrayList<String>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.add(error.getField() + ": " + error.getDefaultMessage());
        }
        for (ObjectError error : ex.getBindingResult().getGlobalErrors()) {
            errors.add(error.getObjectName() + ": " + error.getDefaultMessage());
        }

        RestError restError = new RestError(errorCode, errorMessage, errors);

        return handleExceptionInternal(ex, restError, headers, errorStatus, request);
    }

    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(
            MissingServletRequestParameterException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {
        doLog(ex);

        String errorCode = getErrorCode(MISSING_REQUEST_PARAMETER_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.INTERNAL_SERVER_ERROR;

        String errorMessage = "Bad Request Arguments !";

        String error = ex.getParameterName() + " parameter is missing";

        RestError restError = new RestError(errorCode, errorMessage, error);
        return new ResponseEntity<>(restError, headers, errorStatus);
    }

    @ExceptionHandler({MethodArgumentTypeMismatchException.class})
    public ResponseEntity<Object> handleMethodArgumentTypeMismatch(
            MethodArgumentTypeMismatchException ex) {
        doLog(ex);

        String errorCode = getErrorCode(METHOD_ARGUMENT_TYPE_MISMATCH_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;

        String errorMessage = "Bad Request Arguments";

        String error =
                ex.getName()
                        + " should be of type "
                        + (ex.getRequiredType() != null ? ex.getRequiredType().getName() : "");

        RestError restError = new RestError(errorCode, errorMessage, error);
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @Override
    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(
            HttpRequestMethodNotSupportedException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {
        doLog(ex);

        String errorCode = getErrorCode(METHOD_NOT_SUPPORTED_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.METHOD_NOT_ALLOWED;

        String errorMessage = "Method Not Supported";

        StringBuilder builder = new StringBuilder();
        builder.append(ex.getMethod());
        builder.append(" method is not supported for this request. Supported methods are ");
        ex.getSupportedHttpMethods().forEach(t -> builder.append(t + " "));

        RestError restError = new RestError(errorCode, errorMessage, builder.toString());
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @Override
    protected ResponseEntity<Object> handleHttpMediaTypeNotSupported(
            HttpMediaTypeNotSupportedException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {
        doLog(ex);

        String errorCode = getErrorCode(MEDIA_TYPE_NOT_SUPPORTED_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.UNSUPPORTED_MEDIA_TYPE;

        String errorMessage = "Media Type Not Supported";

        StringBuilder builder = new StringBuilder();
        builder.append(ex.getContentType());
        builder.append(" media type is not supported. Supported media types are ");
        ex.getSupportedMediaTypes().forEach(t -> builder.append(t + ", "));

        RestError restError =
                new RestError(errorCode, errorMessage, builder.substring(0, builder.length() - 2));
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @ExceptionHandler({AdminException.class})
    public ResponseEntity<Object> handleAdminException(AdminException ex) {
        doLog(ex);

        String errorCode = getErrorCode(ADMIN_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;

        String errorMessage = ex.getMessage();

        RestError restError = new RestError(errorCode, errorMessage, errorMessage);
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @ExceptionHandler({KafkaConnectException.class})
    public ResponseEntity<Object> handleKafkaConnectException(KafkaConnectException ex) {
        doLog(ex);

        String errorCode = getErrorCode(KAFKA_CONNECT_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;

        String errorMessage = ex.getMessage();

        RestError restError = new RestError(errorCode, errorMessage, errorMessage);
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @ExceptionHandler({SchemaRegistryException.class})
    public ResponseEntity<Object> handleSchemaRegistryException(SchemaRegistryException ex) {
        doLog(ex);

        String errorCode = getErrorCode(SCHEMA_REGISTRY_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;

        String errorMessage = ex.getMessage();

        RestError restError = new RestError(errorCode, errorMessage, errorMessage);
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @ExceptionHandler({KsqlDbException.class})
    public ResponseEntity<Object> handleKsqlDbException(KsqlDbException ex) {
        doLog(ex);

        String errorCode = getErrorCode(KSQLDB_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;

        String errorMessage = ex.getMessage();

        RestError restError = new RestError(errorCode, errorMessage, errorMessage);
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @ExceptionHandler({ManagementException.class})
    public ResponseEntity<Object> handleManagementException(ManagementException ex) {
        doLog(ex);

        String errorCode = getErrorCode(MANAGEMENT_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;

        String errorMessage = ex.getMessage();

        RestError restError = new RestError(errorCode, errorMessage, errorMessage);
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @ExceptionHandler({PlaygroundException.class})
    public ResponseEntity<Object> handlePlaygroundException(PlaygroundException ex) {
        doLog(ex);

        String errorCode = getErrorCode(PLAYGROUND_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;

        String errorMessage = ex.getMessage();

        RestError restError = new RestError(errorCode, errorMessage, errorMessage);
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @ExceptionHandler({AuditException.class})
    public ResponseEntity<Object> handleAuditException(AuditException ex) {
        doLog(ex);

        String errorCode = getErrorCode(AUDIT_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;

        String errorMessage = ex.getMessage();

        RestError restError = new RestError(errorCode, errorMessage, errorMessage);
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @ExceptionHandler({ClientsException.class})
    public ResponseEntity<Object> handleClientsException(ClientsException ex) {
        doLog(ex);

        String errorCode = getErrorCode(CLIENTS_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;

        String errorMessage = ex.getMessage();

        RestError restError = new RestError(errorCode, errorMessage, errorMessage);
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @ExceptionHandler({FilesException.class})
    public ResponseEntity<Object> handleFilesException(FilesException ex) {
        doLog(ex);

        String errorCode = getErrorCode(FILES_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;

        String errorMessage = ex.getMessage();

        RestError restError = new RestError(errorCode, errorMessage, errorMessage);
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @ExceptionHandler({JmxException.class})
    public ResponseEntity<Object> handleJmxException(JmxException ex) {
        doLog(ex);

        String errorCode = getErrorCode(JMX_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;

        String errorMessage = ex.getMessage();

        RestError restError = new RestError(errorCode, errorMessage, errorMessage);
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @ExceptionHandler({KafkaException.class})
    public ResponseEntity<Object> handleKafkaException(KafkaException ex) {
        Throwable rootCause = ex.getCause() != null ? ex.getCause() : ex;

        doLog(rootCause);

        String errorCode = getErrorCode(KAFKA_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;

        String errorMessage = rootCause.getMessage();

        RestError restError = new RestError(errorCode, errorMessage, errorMessage);
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @ExceptionHandler({CommonException.class})
    public ResponseEntity<Object> handleCommonClientException(CommonException ex) {
        doLog(ex);

        String errorCode = getErrorCode(COMMON_CLIENT_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;

        String errorMessage = ex.getMessage();

        RestError restError = new RestError(errorCode, errorMessage, errorMessage);
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @ExceptionHandler({AuthServerException.class})
    public ResponseEntity<Object> handleAuthServerException(AuthServerException ex) {
        doLog(ex);

        String errorCode = getErrorCode(AUTH_SERVER_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;

        String errorMessage = ex.getMessage();

        RestError restError = new RestError(errorCode, errorMessage, errorMessage);
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @ExceptionHandler({AuthorizationException.class})
    public ResponseEntity<Object> handleAuthorizationException(AuthorizationException ex) {
        doLog(ex);

        String errorCode = getErrorCode(AUTHORIZATION_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.FORBIDDEN;

        String errorMessage = ex.getMessage();

        RestError restError = new RestError(errorCode, errorMessage, errorMessage);
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @ExceptionHandler({CommonIOException.class})
    public ResponseEntity<Object> handleCommonIOExceptionException(CommonIOException ex) {
        doLog(ex);

        String errorCode = getErrorCode(COMMON_IO_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.BAD_REQUEST;

        String errorMessage = ex.getMessage();

        RestError restError = new RestError(errorCode, errorMessage, errorMessage);
        return new ResponseEntity<>(restError, new HttpHeaders(), errorStatus);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleInternalExceptions(Exception ex, WebRequest request) {
        doLog(ex);

        String errorCode = getErrorCode(SERVER_ERROR_CODE);

        HttpStatus errorStatus = HttpStatus.INTERNAL_SERVER_ERROR;

        String errorMessage = ex.getLocalizedMessage();

        RestError restError = new RestError(errorCode, errorMessage, errorMessage);

        return handleExceptionInternal(ex, restError, new HttpHeaders(), errorStatus, request);
    }

    private void doLog(Throwable ex) {
        log.error(CommonLogUtils.getError(ex.getLocalizedMessage()), ex);
    }

    public static String getErrorCode(String errorCode) {
        return ERROR_CODE_PREFIX + errorCode;
    }
}
