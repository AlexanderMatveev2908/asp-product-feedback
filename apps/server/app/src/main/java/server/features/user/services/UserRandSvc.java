package server.features.user.services;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import net.datafaker.Faker;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;
import reactor.util.function.Tuples;
import server.conf.cloud.CloudSvc;
import server.conf.cloud.etc.data_structure.CloudAsset;
import server.conf.env_vars.EnvVars;
import server.decorators.core.api.Api;
import server.decorators.types.AppFile;
import server.decorators.types.Dict;
import server.lib.data_structure.LibRand;
import server.lib.data_structure.LibRuntime;
import server.lib.data_structure.prs.LibPrs;
import server.lib.dev.LibFaker;
import server.models.images.Image;
import server.models.images.etc.ImageSvc;
import server.models.users.User;
import server.models.users.etc.UserSvc;

@Service
@Transactional
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI", "NP" })
public class UserRandSvc {
  private final static Faker faker = LibFaker.main();
  private final UserSvc userSvc;
  private final ImageSvc imageSvc;
  private final CloudSvc cloud;
  private final WebClient.Builder webBuilder;
  private final EnvVars envVars;

  private Mono<GeoUserT> getGeoInfo(Api api) {
    final String clientIp = envVars.isProd() ? api.getClientIp() : "8.8.8.8";

    return webBuilder.baseUrl("http://ip-api.com/json").build().get()
        .uri("/{ip}", clientIp)
        .retrieve()
        .bodyToMono(Dict.class).map(dict -> dict.toT(GeoUserT.class));
  }

  private Mono<CloudAsset> uploadThumb() {

    return LibRuntime.inTryBlock(() -> {
      int idx = LibRand.intTill(10);
      String filename = idx + ".jpg";

      ClassPathResource abstractFile = new ClassPathResource("/assets/users_random/" + filename);
      byte[] binary = abstractFile.getContentAsByteArray();

      AppFile appFile = new AppFile(filename, binary);

      return cloud.upload(appFile);
    });
  }

  private Mono<Image> insertImage(User user, CloudAsset uploaded) {
    final Image image = new Image(uploaded.getPublicId(), uploaded.getUrl(), user.getId());
    return imageSvc.insert(image);
  }

  private Mono<User> insertUser(User user) {
    return userSvc.insert(user);
  }

  private Mono<Tuple2<User, Image>> insertPairUserThumb(User user) {
    return insertUser(user).flatMap(newUser -> uploadThumb()
        .flatMap(uploaded -> insertImage(newUser, uploaded).map(newImage -> Tuples.of(newUser, newImage))));
  }

  private Mono<Tuple2<User, Image>> newRandomUser(GeoUserT geo) {
    final String randFullName = faker.name().fullName();
    final String username = geo.countryCode().toLowerCase() + "_" + geo.city().toLowerCase() + "__"
        + LibPrs.asUsername(randFullName);
    final User maybeNew = new User(randFullName, username);

    return userSvc.byUsername(username).flatMap(existing -> newRandomUser(geo)).switchIfEmpty(
        insertPairUserThumb(maybeNew));
  }

  public Mono<Dict> main(Api api) {
    return getGeoInfo(api).flatMap(geo -> newRandomUser(geo).map(tpl -> {
      final Dict clientDict = new Dict();
      clientDict.putAll(Dict.fromT(tpl.getT1()));
      clientDict.put("image", tpl.getT2());

      return Dict.of("user", clientDict);
    }));

  }
}

@JsonIgnoreProperties(ignoreUnknown = true)
final record GeoUserT(String countryCode, String city) {
}