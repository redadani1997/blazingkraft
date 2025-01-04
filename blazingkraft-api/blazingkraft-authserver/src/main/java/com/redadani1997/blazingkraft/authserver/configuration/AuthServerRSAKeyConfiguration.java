package com.redadani1997.blazingkraft.authserver.configuration;

import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.gen.RSAKeyGenerator;
import com.redadani1997.blazingkraft.common.constant.CommonFileConstants;
import com.redadani1997.blazingkraft.common.util.CommonFileUtils;
import com.redadani1997.blazingkraft.error.authserver.RSAKeyException;
import java.util.Map;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AuthServerRSAKeyConfiguration {

    @Bean("authServerRSAKey")
    public RSAKey rsaKey() throws Exception {
        try {
            String rsaKeyPath =
                    CommonFileUtils.joinPaths(
                            CommonFileConstants.BLAZINGKRAFT_RSA_KEY_FOLDER_PATH,
                            CommonFileConstants.BLAZINGKRAFT_RSA_KEY_FILE_NAME);

            Boolean rsaKeyFileExists = CommonFileUtils.fileExists(rsaKeyPath);

            if (rsaKeyFileExists) {
                return RSAKey.parse(CommonFileUtils.jsonFileToObject(rsaKeyPath, Map.class));
            }
            RSAKey rsaKey = new RSAKeyGenerator(2048).keyID("blazingkraft-kid-v1").generate();

            Map<String, Object> rsaKeyJsonMap = rsaKey.toJSONObject();

            CommonFileUtils.writeJsonFile(
                    CommonFileConstants.BLAZINGKRAFT_RSA_KEY_FOLDER_PATH,
                    CommonFileConstants.BLAZINGKRAFT_RSA_KEY_FILE_NAME,
                    rsaKeyJsonMap);

            return rsaKey;
        } catch (Exception ex) {
            throw new RSAKeyException(ex);
        }
    }
}
