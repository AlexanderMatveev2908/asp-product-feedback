package server.conf.cloud.etc.sub;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import server.conf.cloud.etc.data_structure.CloudResourceT;
import server.conf.env_vars.EnvVars;
import server.decorators.core.ErrAPI;
import server.decorators.types.Dict;

@SuppressWarnings({ "PMD.AvoidInstantiatingObjectsInLoops" })
public interface CloudSvcBulkDelete extends CloudSvcDelete {
  public abstract String genSign(Map<String, String> params);

  public abstract EnvVars getEnvKeeper();

  public abstract WebClient getClient();

  public abstract String getFolderName(CloudResourceT t);

  private Mono<Dict> getByPrefix(String prefix, CloudResourceT resourceType) {
    return getClient()
        .get()
        .uri(uriBuilder -> uriBuilder
            .path("/resources/" + resourceType.getVal())
            .queryParam("prefix", prefix)
            .queryParam("type", "upload")
            .build())
        .headers(h -> h.setBasicAuth(
            getEnvKeeper().getCloudKey(),
            getEnvKeeper().getCloudSecret()))
        .retrieve()
        .bodyToMono(Dict.class);
  }

  @SuppressWarnings("unchecked")
  private Mono<Integer> delByPrefix(Dict dict) {
    final Object resources = dict.get("resources");
    if (!(resources instanceof List<?>))
      return Mono.error(new ErrAPI("expected resources as List"));

    List<Mono<Integer>> promises = new ArrayList<>();

    for (final Object item : (List<Object>) resources) {
      if (!(item instanceof Map<?, ?>))
        return Mono.error(new ErrAPI("expected item resource to be a map"));

      final Dict d = Dict.castObj(item);
      promises.add(delete(d.valAsString("public_id"), d.valAsString("resource_type")));
    }

    return Flux.merge(promises).reduce(0, (acc, value) -> acc + value);
  }

  private Mono<List<Dict>> fetchAll() {
    final String imgPrefix = getFolderName(CloudResourceT.IMAGE);
    final String vidPrefix = getFolderName(CloudResourceT.VIDEO);

    final Mono<Dict> imagesPromise = getByPrefix(imgPrefix, CloudResourceT.IMAGE);
    final Mono<Dict> videosPromise = getByPrefix(vidPrefix, CloudResourceT.VIDEO);

    return Flux.concat(imagesPromise, videosPromise).collectList();
  }

  private Mono<List<Integer>> deleteAll(List<Dict> list) {
    Dict images = list.get(0);
    Dict videos = list.get(1);

    final Mono<Integer> imagesDeleted = delByPrefix(images);
    final Mono<Integer> videosDeleted = delByPrefix(videos);

    return Flux.concat(imagesDeleted, videosDeleted).collectList();
  }

  default Mono<List<Integer>> delAssetsApp() {
    return fetchAll().flatMap(list -> deleteAll(list));
  }

}
