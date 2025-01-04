// Configurations
import bootstrapServers from './admin/bootstrap.servers';
import clientDnsLookup from './admin/client.dns.lookup';
import clientId from './admin/client.id';
import connectionsMaxIdleMs from './admin/connections.max.idle.ms';
import defaultApiTimeoutMs from './admin/default.api.timeout.ms';
import metadataMaxAgeMs from './admin/metadata.max.age.ms';
import metricReporters from './admin/metric.reporters';
import metricsNumSamples from './admin/metrics.num.samples';
import metricsRecordingLevel from './admin/metrics.recording.level';
import metricsSampleWindowMs from './admin/metrics.sample.window.ms';
import receiveBufferBytes from './admin/receive.buffer.bytes';
import reconnectBackoffMaxMs from './admin/reconnect.backoff.max.ms';
import reconnectBackoffMs from './admin/reconnect.backoff.ms';
import requestTimeoutMs from './admin/request.timeout.ms';
import retries from './admin/retries';
import retryBackoffMs from './admin/retry.backoff.ms';
import saslClientCallbackHandlerClass from './admin/sasl.client.callback.handler.class';
import saslJaasConfig from './admin/sasl.jaas.config';
import saslKerberosKinitCmd from './admin/sasl.kerberos.kinit.cmd';
import saslKerberosMinTimeBeforeRelogin from './admin/sasl.kerberos.min.time.before.relogin';
import saslKerberosServiceName from './admin/sasl.kerberos.service.name';
import saslKerberosTicketRenewJitter from './admin/sasl.kerberos.ticket.renew.jitter';
import saslKerberosTicketRenewWindowFactor from './admin/sasl.kerberos.ticket.renew.window.factor';
import saslLoginCallbackHandlerClass from './admin/sasl.login.callback.handler.class';
import saslLoginClass from './admin/sasl.login.class';
import saslLoginConnectTimeoutMs from './admin/sasl.login.connect.timeout.ms';
import saslLoginReadTimeoutMs from './admin/sasl.login.read.timeout.ms';
import saslLoginRefreshBufferSeconds from './admin/sasl.login.refresh.buffer.seconds';
import saslLoginRefreshMinPeriodSeconds from './admin/sasl.login.refresh.min.period.seconds';
import saslLoginRefreshWindowFactor from './admin/sasl.login.refresh.window.factor';
import saslLoginRefreshWindowJitter from './admin/sasl.login.refresh.window.jitter';
import saslLoginRetryBackoffMaxMs from './admin/sasl.login.retry.backoff.max.ms';
import saslLoginRetryBackoffMs from './admin/sasl.login.retry.backoff.ms';
import saslMechanism from './admin/sasl.mechanism';
import saslOauthbearerClockSkewSeconds from './admin/sasl.oauthbearer.clock.skew.seconds';
import saslOauthbearerExpectedAudience from './admin/sasl.oauthbearer.expected.audience';
import saslOauthbearerExpectedIssuer from './admin/sasl.oauthbearer.expected.issuer';
import saslOauthbearerJwksEndpointRefreshMs from './admin/sasl.oauthbearer.jwks.endpoint.refresh.ms';
import saslOauthbearerJwksEndpointRetryBackoffMaxMs from './admin/sasl.oauthbearer.jwks.endpoint.retry.backoff.max.ms';
import saslOauthbearerJwksEndpointRetryBackoffMs from './admin/sasl.oauthbearer.jwks.endpoint.retry.backoff.ms';
import saslOauthbearerJwksEndpointUrl from './admin/sasl.oauthbearer.jwks.endpoint.url';
import saslOauthbearerScopeClaimName from './admin/sasl.oauthbearer.scope.claim.name';
import saslOauthbearerSubClaimName from './admin/sasl.oauthbearer.sub.claim.name';
import saslOauthbearerTokenEndpointUrl from './admin/sasl.oauthbearer.token.endpoint.url';
import securityProtocol from './admin/security.protocol';
import securityProviders from './admin/security.providers';
import sendBufferBytes from './admin/send.buffer.bytes';
import socketConnectionSetupTimeoutMaxMs from './admin/socket.connection.setup.timeout.max.ms';
import socketConnectionSetupTimeoutMs from './admin/socket.connection.setup.timeout.ms';
import sslCipherSuites from './admin/ssl.cipher.suites';
import sslEnabledProtocols from './admin/ssl.enabled.protocols';
import sslEndpointIdentificationAlgorithm from './admin/ssl.endpoint.identification.algorithm';
import sslEngineFactoryClass from './admin/ssl.engine.factory.class';
import sslKeyPassword from './admin/ssl.key.password';
import sslKeymanagerAlgorithm from './admin/ssl.keymanager.algorithm';
import sslKeystoreCertificateChain from './admin/ssl.keystore.certificate.chain';
import sslKeystoreKey from './admin/ssl.keystore.key';
import sslKeystoreLocation from './admin/ssl.keystore.location';
import sslKeystorePassword from './admin/ssl.keystore.password';
import sslKeystoreType from './admin/ssl.keystore.type';
import sslProtocol from './admin/ssl.protocol';
import sslProvider from './admin/ssl.provider';
import sslSecureRandomImplementation from './admin/ssl.secure.random.implementation';
import sslTrustmanagerAlgorithm from './admin/ssl.trustmanager.algorithm';
import sslTruststoreCertificates from './admin/ssl.truststore.certificates';
import sslTruststoreLocation from './admin/ssl.truststore.location';
import sslTruststorePassword from './admin/ssl.truststore.password';
import sslTruststoreType from './admin/ssl.truststore.type';

const configurations = [
    bootstrapServers,
    clientDnsLookup,
    clientId,
    connectionsMaxIdleMs,
    defaultApiTimeoutMs,
    metadataMaxAgeMs,
    metricReporters,
    metricsNumSamples,
    metricsRecordingLevel,
    metricsSampleWindowMs,
    receiveBufferBytes,
    reconnectBackoffMaxMs,
    reconnectBackoffMs,
    requestTimeoutMs,
    retries,
    retryBackoffMs,
    saslClientCallbackHandlerClass,
    saslJaasConfig,
    saslKerberosKinitCmd,
    saslKerberosMinTimeBeforeRelogin,
    saslKerberosServiceName,
    saslKerberosTicketRenewJitter,
    saslKerberosTicketRenewWindowFactor,
    saslLoginCallbackHandlerClass,
    saslLoginClass,
    saslLoginConnectTimeoutMs,
    saslLoginReadTimeoutMs,
    saslLoginRefreshBufferSeconds,
    saslLoginRefreshMinPeriodSeconds,
    saslLoginRefreshWindowFactor,
    saslLoginRefreshWindowJitter,
    saslLoginRetryBackoffMaxMs,
    saslLoginRetryBackoffMs,
    saslMechanism,
    saslOauthbearerClockSkewSeconds,
    saslOauthbearerExpectedAudience,
    saslOauthbearerExpectedIssuer,
    saslOauthbearerJwksEndpointRefreshMs,
    saslOauthbearerJwksEndpointRetryBackoffMaxMs,
    saslOauthbearerJwksEndpointRetryBackoffMs,
    saslOauthbearerJwksEndpointUrl,
    saslOauthbearerScopeClaimName,
    saslOauthbearerSubClaimName,
    saslOauthbearerTokenEndpointUrl,
    securityProtocol,
    securityProviders,
    sendBufferBytes,
    socketConnectionSetupTimeoutMaxMs,
    socketConnectionSetupTimeoutMs,
    sslCipherSuites,
    sslEnabledProtocols,
    sslEndpointIdentificationAlgorithm,
    sslEngineFactoryClass,
    sslKeyPassword,
    sslKeymanagerAlgorithm,
    sslKeystoreCertificateChain,
    sslKeystoreKey,
    sslKeystoreLocation,
    sslKeystorePassword,
    sslKeystoreType,
    sslProtocol,
    sslProvider,
    sslSecureRandomImplementation,
    sslTrustmanagerAlgorithm,
    sslTruststoreCertificates,
    sslTruststoreLocation,
    sslTruststorePassword,
    sslTruststoreType,
];

const AdminConfiguration = { configurations };

export { AdminConfiguration };
