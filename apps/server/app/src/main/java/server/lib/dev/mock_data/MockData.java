package server.lib.dev.mock_data;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import server.conf.cloud.CloudSvc;
import server.conf.cloud.etc.data_structure.CloudAsset;
import server.decorators.core.ErrAPI;
import server.decorators.types.AppFile;
import server.lib.dev.lib_log.LibLog;
import server.lib.paths.LibPath;
import server.models.feedbacks.etc.FeedSvc;
import server.models.users.etc.UserSvc;

@Service
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI", "NP_NULL_ON_SOME_PATH_FROM_RETURN_VALUE" })
@SuppressWarnings({ "unused", "PMD.AvoidInstantiatingObjectsInLoops" })
public class MockData {
  private final UserSvc userSvc;
  private final FeedSvc feedSvc;
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
    uploadImages().subscribe(list -> {
      LibLog.wOk(list);
    });
  }
}
