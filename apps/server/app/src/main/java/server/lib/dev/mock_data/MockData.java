package server.lib.dev.mock_data;

import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import net.datafaker.Faker;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import server.conf.cloud.CloudSvc;
import server.conf.cloud.etc.data_structure.CloudAsset;
import server.decorators.core.ErrAPI;
import server.decorators.types.AppFile;
import server.decorators.types.Dict;
import server.decorators.types.Nullable;
import server.lib.dev.LibFaker;
import server.lib.dev.lib_log.LibLog;
import server.lib.paths.LibPath;
import server.models.feedbacks.etc.FeedSvc;
import server.models.images.Image;
import server.models.images.etc.ImageRepo;
import server.models.users.User;
import server.models.users.etc.UserSvc;

@Service
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI", "NP_NULL_ON_SOME_PATH_FROM_RETURN_VALUE" })
@SuppressWarnings({ "unused", "PMD.AvoidInstantiatingObjectsInLoops" })
public class MockData {
  private static final Faker faker = LibFaker.main();
  private final UserSvc userSvc;
  private final FeedSvc feedSvc;
  private final ImageRepo imageRepo;
  private final CloudSvc cloud;

  private final Mono<List<CloudAsset>> uploadImages() {

    final Path dirUsers = LibPath.IMAGES_DIR.resolve("users");
    if (!Files.isDirectory(dirUsers))
      throw new ErrAPI("thumbnails not found");

    final List<Mono<CloudAsset>> promises = new ArrayList<>();

    try (final Stream<Path> stream = Files.list(dirUsers)) {
      final List<Path> images = stream.toList();

      for (final Path img : images) {
        final String filename = img.getFileName().toString();
        final Path imgPath = dirUsers.resolve(filename);
        final AppFile appFile = new AppFile(filename, imgPath);

        promises.add(cloud.upload(appFile));
      }

      return Flux.merge(promises).collectList();
    } catch (final Exception err) {
      throw new ErrAPI(err.getMessage());
    }
  }

  public final void main() {
    LibLog.logTtl("⏳ start generating mock data");

    Mono<List<Dict>> job = uploadImages()
        .flatMapMany(Flux::fromIterable)
        .concatMap(asset -> {
          String randName = faker.name().fullName();
          String asUsername = randName.replaceAll("\\s+", ".").toLowerCase();

          User newUser = new User(randName, asUsername);

          return userSvc.insert(newUser)
              .flatMap(createdUser -> {
                Image newImage = new Image(
                    asset.getPublicId(),
                    asset.getUrl(),
                    createdUser.getId());
                return imageRepo.insert(newImage)
                    .map(createdImage -> Dict.of(
                        "user", createdUser,
                        "image", createdImage));
              });
        })
        .collectList().cache();

    Flux.interval(Duration.ofSeconds(1))
        .takeUntilOther(job)
        .subscribe(sec -> LibLog.stdOut("⏳ generating mock data... " + (sec + 1) + "s"));

    job.subscribe(
        res -> {
          LibLog.logTtl("🎉 generated mock data");
          LibLog.wOk(res);
        },
        err -> {
          LibLog.logErr(err);
        });
  }
}
