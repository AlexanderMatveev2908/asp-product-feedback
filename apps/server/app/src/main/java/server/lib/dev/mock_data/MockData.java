package server.lib.dev.mock_data;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import server.decorators.core.ErrAPI;
import server.lib.paths.LibPath;
import server.models.feedbacks.etc.FeedSvc;
import server.models.users.etc.UserSvc;

@Service
@Transactional
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI" })
public class MockData {
  private final UserSvc userSvc;
  private final FeedSvc feedSvc;

  private static final void uploadImages() {
    final Path dirUsers = LibPath.IMAGES_DIR.resolve("users");
    if (!Files.isDirectory(dirUsers))
      throw new ErrAPI("thumbnails not found");

    try (final Stream<Path> stream = Files.list(dirUsers)) {
      final List<Path> images = stream.toList();

      for (final Path img : images) {
      }

    } catch (final Exception err) {
      throw new ErrAPI(err.getMessage());
    }
  }
}
