package server.conf.cloud;

import java.security.MessageDigest;
import java.util.HexFormat;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import server.conf.cloud.etc.data_structure.CloudResourceT;
import server.conf.cloud.etc.sub.CloudSvcBulkDelete;
import server.conf.cloud.etc.sub.CloudSvcUpload;
import server.conf.env_vars.EnvVars;
import server.decorators.core.ErrAPI;
import server.lib.data_structure.prs.LibPrs;

@Service
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI" })
public final class CloudSvc implements CloudSvcUpload, CloudSvcBulkDelete {
    private final WebClient.Builder webClientBuilder;
    private final EnvVars envKeeper;

    // ? expected as abstract
    public final EnvVars getEnvKeeper() {
        return envKeeper;
    }

    public String getFolderName(CloudResourceT t) {
        final String appSnakeName = getEnvKeeper().getAppName().replace("-", "_");
        return appSnakeName + "__" + t.plural();
    }

    public final WebClient getClient() {
        final String cloudName = envKeeper.getCloudName();
        return webClientBuilder.baseUrl("https://api.cloudinary.com/v1_1/" + cloudName).build();
    }

    public final String genSign(Map<String, String> params) {
        final String cloudSecret = envKeeper.getCloudSecret();

        final String strParams = params.entrySet().stream().sorted(Map.Entry.comparingByKey())
                .map(el -> el.getKey() + "=" + el.getValue()).collect(Collectors.joining("&")) + cloudSecret;

        return sign(strParams);
    }

    // ? private methods
    private final String sign(String params) {
        try {
            final MessageDigest sha1 = MessageDigest.getInstance("SHA-1");
            final byte[] digest = sha1.digest(LibPrs.binaryFromUtf8(params));
            final String sig = HexFormat.of().formatHex(digest);

            return sig;
        } catch (final Exception err) {
            throw new ErrAPI("err creating cloud sign");
        }
    }

}
