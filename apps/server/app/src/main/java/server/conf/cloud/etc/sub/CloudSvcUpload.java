package server.conf.cloud.etc.sub;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

import org.springframework.core.io.AbstractResource;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
import reactor.core.publisher.Mono;
import server.conf.cloud.etc.data_structure.CloudAsset;
import server.conf.cloud.etc.data_structure.CloudResourceT;
import server.conf.env_conf.EnvVars;
import server.decorators.AppFile;

public interface CloudSvcUpload {

  public abstract String genSign(Map<String, String> params);

  public abstract EnvVars getEnvKeeper();

  public abstract WebClient getClient();

  default String getSignUpload(String tmsp, String folder, String publicId) {
    final Map<String, String> params = new HashMap<>();
    params.put("folder", folder);
    params.put("timestamp", tmsp);
    params.put("public_id", publicId);

    return genSign(params);
  }

  private String getFolderName(AppFile file) {
    final String appSnakeName = getEnvKeeper().getAppName().replace("-", "_");
    return appSnakeName + "__" + file.getField();
  }

  private UploadData extractDataUpload(AppFile file) {
    final String cloudKey = getEnvKeeper().getCloudKey();
    final String tmsp = String.valueOf(Instant.now().getEpochSecond());
    final String folder = getFolderName(file);

    final String filename = file.getFilename();
    final String publicId = filename.substring(0, filename.lastIndexOf('.'));

    final String assetT = CloudResourceT.fromFileField(file.getField());
    final AbstractResource fileResource = assetT.equals("image") ? file.getResourceFromBts()
        : file.getResourceFromPath();

    final String url = "/" + assetT + "/upload";

    final UploadData data = UploadData.builder()
        .cloudKey(cloudKey)
        .tmsp(tmsp)
        .publicId(publicId)
        .url(url)
        .folder(folder)
        .fileResource(fileResource)
        .build();

    return data;
  }

  private MultipartBodyBuilder buildForm(UploadData dataUpload) {
    final MultipartBodyBuilder form = new MultipartBodyBuilder();
    form.part("api_key", dataUpload.getCloudKey());
    form.part("signature", getSignUpload(dataUpload.getTmsp(), dataUpload.getFolder(), dataUpload.getPublicId()));
    form.part("timestamp", dataUpload.getTmsp());
    form.part("folder", dataUpload.getFolder());
    form.part("public_id", dataUpload.getPublicId());
    form.part("file", dataUpload.getFileResource());

    return form;

  }

  default Mono<CloudAsset> upload(AppFile file) {
    final UploadData dataUpload = extractDataUpload(file);
    final MultipartBodyBuilder form = buildForm(dataUpload);

    return getClient().post().uri(dataUpload.getUrl()).contentType(MediaType.MULTIPART_FORM_DATA)
        .body(BodyInserters.fromMultipartData(form.build())).retrieve().bodyToMono(Map.class)
        .flatMap(map -> {
          final CloudAsset asset = CloudAsset.fromMap(map);
          return Mono.just(asset);
        });
  }

}

@Getter
@SuperBuilder
final class UploadData extends DeleteData {
  private final String folder;
  private final AbstractResource fileResource;

}