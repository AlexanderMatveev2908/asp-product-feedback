package server.lib.dev.mock_data;

import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
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
import server.lib.data_structure.LibRand;
import server.lib.dev.LibFaker;
import server.lib.dev.lib_log.LibLog;
import server.lib.paths.LibPath;
import server.models.comments.Comment;
import server.models.comments.etc.CommentSvc;
import server.models.feedbacks.Feedback;
import server.models.feedbacks.etc.FeedSvc;
import server.models.feedbacks.etc.types.FeedCatT;
import server.models.images.Image;
import server.models.images.etc.ImageSvc;
import server.models.replies.Reply;
import server.models.replies.etc.ReplySvc;
import server.models.users.User;
import server.models.users.etc.UserSvc;

// ? 130/140 seconds required to generate mock data

@Service
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI", "NP_NULL_ON_SOME_PATH_FROM_RETURN_VALUE" })
@SuppressWarnings({ "unused", "PMD.AvoidInstantiatingObjectsInLoops" })
public class MockData {
  private static final Faker faker = LibFaker.main();
  private final UserSvc userSvc;
  private final FeedSvc feedSvc;
  private final ImageSvc imageSvc;
  private final CommentSvc commentSvc;
  private final CloudSvc cloud;
  private final ReplySvc replySvc;

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

  private final Mono<Dict> insertPairUserImg(CloudAsset asset) {
    final String randName = faker.name().fullName();
    final String asUsername = randName.replaceAll("\\s+", ".").toLowerCase();

    final User newUser = new User(randName, asUsername);

    return userSvc.insert(newUser)
        .flatMap(createdUser -> {
          final Image newImage = new Image(
              asset.getPublicId(),
              asset.getUrl(),
              createdUser.getId());
          return imageSvc.insert(newImage)
              .map(createdImage -> Dict.of("user", createdUser, "image", createdImage));
        });
  }

  private final Mono<Dict> insertFeedCommentsPairs(Dict dict) {
    final Feedback feed = new Feedback(faker.lorem().sentence(), faker.lorem().maxLengthSentence(500),
        LibRand.choiceIn(FeedCatT.values()));
    return feedSvc.insert(feed).flatMap(createdFeed -> {
      final List<Mono<Comment>> promises = new ArrayList<>();

      for (int i = 0; i < 3; i++) {
        final Comment randComment = new Comment(faker.lorem().maxLengthSentence(500),
            dict.casting("user", User.class).getId(),
            createdFeed.getId());
        promises.add(commentSvc.insert(randComment));
      }

      return Flux.merge(promises).collectList()
          .map(createdComments -> dict.mergeWith(Dict.of("feedback", createdFeed,
              "comments", createdComments)));
    });
  }

  private final void timer(Mono<?> job) {
    Flux.interval(Duration.ofSeconds(1))
        .takeUntilOther(job)
        .subscribe(sec -> LibLog.stdOut("⏳ generating mock data... " + (sec + 1) + "s"));

  }

  private final Mono<List<Reply>> insertReplies(User author, User recipient, Comment comment) {
    final List<Mono<Reply>> promises = new ArrayList<>();

    for (int i = 0; i < 3; i++) {
      final Reply reply = new Reply(author.getId(),
          recipient.getId(), comment.getId(), faker.lorem().maxLengthSentence(500));

      promises.add(replySvc.insert(reply));
    }

    return Flux.merge(promises).collectList();
  }

  private final void appendRepliesPromises(Dict curr, Dict next, List<Mono<List<Reply>>> promises) {
    final User author = curr.casting("user", User.class);
    final User recipient = next.casting("user", User.class);
    final List<?> nextComments = next.casting("comments", List.class);

    for (int j = 0; j < nextComments.size(); j++) {
      final Comment currComment;
      if (nextComments.get(j) instanceof Comment inst)
        currComment = inst;
      else
        throw new ErrAPI("expected a Comment instance");

      @SuppressWarnings("unchecked")
      Mono<List<Reply>> currPromises = insertReplies(author, recipient, currComment)
          .doOnSuccess(generatedReplies -> {
            if (!(curr.get("replies") instanceof List<?>))
              curr.put("replies", new ArrayList<List<Reply>>());

            List<List<Reply>> replies = (List<List<Reply>>) curr.casting("replies", List.class);
            replies.add(generatedReplies);
          });

      promises.add(currPromises);
    }
  }

  public final void main() {
    LibLog.logTtl("⏳ start generating mock data");

    Mono<List<Dict>> job = uploadImages()
        .flatMapMany(Flux::fromIterable)
        .flatMap(asset -> insertPairUserImg(asset)).flatMap(dict -> insertFeedCommentsPairs(dict))
        .collectList().flatMap(list -> {

          final List<Mono<List<Reply>>> promises = new ArrayList<>();
          final int n = list.size();

          for (int i = 0; i < n; i++) {
            final Dict curr = list.get(i);
            final Dict next = i + 1 >= n ? list.get(0) : list.get(i + 1);

            appendRepliesPromises(curr, next, promises);
          }

          return Flux.merge(promises).collectList().thenReturn(list);
        }).cache();

    timer(job);

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
