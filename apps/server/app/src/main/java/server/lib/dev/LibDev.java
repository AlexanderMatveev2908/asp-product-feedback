package server.lib.dev;

import org.springframework.stereotype.Service;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import net.datafaker.Faker;
import reactor.util.function.Tuples;
import server.lib.data_structure.LibRand;
import server.lib.dev.lib_log.LibLog;
import server.models.feedbacks.Feedback;
import server.models.feedbacks.etc.FeedSvc;
import server.models.feedbacks.etc.types.FeedCatT;
import server.models.feedbacks.etc.types.FeedStatT;
import server.models.users.User;
import server.models.users.etc.UserSvc;

@Service
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI" })
public final class LibDev {

    private final UserSvc userSvc;
    private final FeedSvc feedSvc;

    public final void main() {
        Faker faker = LibFaker.main();

        String fullName = faker.name().fullName();
        String username = fullName.replaceAll("\\s+", ".").toLowerCase();

        User randomUs = new User(
                fullName,
                username);
        Feedback randomFeed = new Feedback(
                faker.lorem().sentence(),
                faker.lorem().maxLengthSentence(500),
                LibRand.choiceIn(FeedCatT.values()),
                LibRand.choiceIn(FeedStatT.values()));

        userSvc.insert(randomUs)
                .flatMap(newUser -> feedSvc.insert(randomFeed).map(newFeed -> Tuples.of(newUser, newFeed)))
                .subscribe(tpl -> {
                    LibLog.log(tpl.getT1());
                    LibLog.log(tpl.getT2());
                });
    }
}
