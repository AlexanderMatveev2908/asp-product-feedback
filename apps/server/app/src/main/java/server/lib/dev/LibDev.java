package server.lib.dev;

import org.springframework.stereotype.Service;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.RequiredArgsConstructor;
import server.lib.dev.lib_log.LibLog;
import server.models.users.User;
import server.models.users.etc.UserSvc;

@Service
@RequiredArgsConstructor
@SuppressFBWarnings({ "EI2", "EI" })
public final class LibDev {

    private final UserSvc userSvc;

    public final void main() {
        String fullName = LibFaker.main().name().fullName();
        String username = fullName.replaceAll("\\s+", ".").toLowerCase();

        User randomUs = new User(
                fullName,
                username);

        userSvc.insert(randomUs).flatMap(created -> userSvc.byId(created.getId())).subscribe(found -> {
            LibLog.log(found);
        });
    }
}
