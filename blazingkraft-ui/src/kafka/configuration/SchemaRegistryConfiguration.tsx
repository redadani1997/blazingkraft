// Configurations
import basicAuthCredentialsSource from './schema_registry/basic.auth.credentials.source';
import basicAuthUserInfo from './schema_registry/basic.auth.user.info';
import bearerAuthCredentialsSource from './schema_registry/bearer.auth.credentials.source';
import bearerAuthToken from './schema_registry/bearer.auth.token';
import maxSchemasPerSubject from './schema_registry/max.schemas.per.subject';
import proxyHost from './schema_registry/proxy.host';
import proxyPort from './schema_registry/proxy.port';
import schemaRegistrySslCipherSuites from './schema_registry/schema.registry.ssl.cipher.suites';
import schemaRegistrySslEnabledProtocols from './schema_registry/schema.registry.ssl.enabled.protocols';
import schemaRegistrySslEndpointIdentificationAlgorithm from './schema_registry/schema.registry.ssl.endpoint.identification.algorithm';
import schemaRegistrySslEngineFactoryClass from './schema_registry/schema.registry.ssl.engine.factory.class';
import schemaRegistrySslKeyPassword from './schema_registry/schema.registry.ssl.key.password';
import schemaRegistrySslKeymanagerAlgorithm from './schema_registry/schema.registry.ssl.keymanager.algorithm';
import schemaRegistrySslKeystoreCertificateChain from './schema_registry/schema.registry.ssl.keystore.certificate.chain';
import schemaRegistrySslKeystoreKey from './schema_registry/schema.registry.ssl.keystore.key';
import schemaRegistrySslKeystoreLocation from './schema_registry/schema.registry.ssl.keystore.location';
import schemaRegistrySslKeystorePassword from './schema_registry/schema.registry.ssl.keystore.password';
import schemaRegistrySslKeystoreType from './schema_registry/schema.registry.ssl.keystore.type';
import schemaRegistrySslProtocol from './schema_registry/schema.registry.ssl.protocol';
import schemaRegistrySslProvider from './schema_registry/schema.registry.ssl.provider';
import schemaRegistrySslSecureRandomImplementation from './schema_registry/schema.registry.ssl.secure.random.implementation';
import schemaRegistrySslTrustmanagerAlgorithm from './schema_registry/schema.registry.ssl.trustmanager.algorithm';
import schemaRegistrySslTruststoreCertificates from './schema_registry/schema.registry.ssl.truststore.certificates';
import schemaRegistrySslTruststoreLocation from './schema_registry/schema.registry.ssl.truststore.location';
import schemaRegistrySslTruststorePassword from './schema_registry/schema.registry.ssl.truststore.password';
import schemaRegistrySslTruststoreType from './schema_registry/schema.registry.ssl.truststore.type';
import schemaRegistryUrl from './schema_registry/schema.registry.url';

const configurations = [
    basicAuthCredentialsSource,
    basicAuthUserInfo,
    bearerAuthCredentialsSource,
    bearerAuthToken,
    maxSchemasPerSubject,
    proxyHost,
    proxyPort,
    schemaRegistrySslCipherSuites,
    schemaRegistrySslEnabledProtocols,
    schemaRegistrySslEndpointIdentificationAlgorithm,
    schemaRegistrySslEngineFactoryClass,
    schemaRegistrySslKeyPassword,
    schemaRegistrySslKeymanagerAlgorithm,
    schemaRegistrySslKeystoreCertificateChain,
    schemaRegistrySslKeystoreKey,
    schemaRegistrySslKeystoreLocation,
    schemaRegistrySslKeystorePassword,
    schemaRegistrySslKeystoreType,
    schemaRegistrySslProtocol,
    schemaRegistrySslProvider,
    schemaRegistrySslSecureRandomImplementation,
    schemaRegistrySslTrustmanagerAlgorithm,
    schemaRegistrySslTruststoreCertificates,
    schemaRegistrySslTruststoreLocation,
    schemaRegistrySslTruststorePassword,
    schemaRegistrySslTruststoreType,
    schemaRegistryUrl,
];

const SchemaRegistryConfiguration = { configurations };

export { SchemaRegistryConfiguration };
