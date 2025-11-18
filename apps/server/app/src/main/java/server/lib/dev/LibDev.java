package server.lib.dev;

import org.springframework.stereotype.Service;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import server.conf.cloud.CloudSvc;
import server.lib.dev.lib_log.LibLog;
import server.lib.dev.mock_data.MockData;

@Service
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI" })
public final class LibDev {
    private final MockData mock;
    private final CloudSvc cloud;

    public final void main() {
    }

    public final void mockData() {
        mock.main().subscribe(
                res -> {
                    LibLog.logTtl("🎉 generated mock data");
                    LibLog.wOk(res);
                },
                err -> {
                    LibLog.logErr(err);
                });
    }

    public final void delAssetsCloud() {
        cloud.delAssetsApp().subscribe(list -> {
            LibLog.wOk(list);
            LibLog.log(list);
        });
    }
}

/*
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
                    LibLog.log(tpl.getT1(), tpl.getT2());
                });
 */