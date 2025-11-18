package server.features.user.services;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import net.datafaker.Faker;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;
import reactor.util.function.Tuples;
import server.conf.cloud.CloudSvc;
import server.conf.cloud.etc.data_structure.CloudAsset;
import server.decorators.core.ErrAPI;
import server.decorators.core.api.Api;
import server.decorators.types.AppFile;
import server.decorators.types.Dict;
import server.lib.data_structure.LibRand;
import server.lib.data_structure.prs.LibPrs;
import server.lib.dev.LibFaker;
import server.lib.dev.lib_log.LibLog;
import server.lib.paths.LibPath;
import server.models.images.Image;
import server.models.images.etc.ImageSvc;
import server.models.users.User;
import server.models.users.etc.UserSvc;

@Service
@Transactional
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI" })
public class UserRandSvc {
  private final static Faker faker = LibFaker.main();
  private final UserSvc userSvc;
  private final ImageSvc imageSvc;
  private final CloudSvc cloud;

  private Mono<CloudAsset> uploadThumb() {
    final Path pathRandomThumbs = LibPath.IMAGES_DIR.resolve("users_random");

    try (Stream<Path> stream = Files.list(pathRandomThumbs)) {
      final List<Path> images = stream.toList();
      final int idx = LibRand.intTill(images.size());
      final Path chosen = images.get(idx);
      final AppFile asAppFile = new AppFile(chosen.getFileName().toString(), chosen);

      return cloud.upload(asAppFile);
    } catch (Exception err) {
      throw new ErrAPI(err.getMessage());
    }
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

  private Mono<Tuple2<User, Image>> newRandomUser() {
    final String randFullName = faker.name().fullName();
    final String username = LibPrs.asUsername(randFullName);
    final User maybeNew = new User(randFullName, username);

    return userSvc.byUsername(username).flatMap(existing -> newRandomUser()).switchIfEmpty(
        insertPairUserThumb(maybeNew));
  }

  public Mono<Dict> main(Api api) {
    return newRandomUser().map(tpl -> {
      Dict clientDict = new Dict();
      clientDict.putAll(Dict.fromT(tpl.getT1()));
      clientDict.put("image", tpl.getT2());

      LibLog.log(clientDict);
      return Dict.of("user", clientDict);
    });
  }
}