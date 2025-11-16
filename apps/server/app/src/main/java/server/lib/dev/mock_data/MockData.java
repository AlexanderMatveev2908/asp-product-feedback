// package server.lib.dev.mock_data;

// import java.nio.file.Files;
// import java.nio.file.Path;

// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
// import lombok.RequiredArgsConstructor;
// import server.lib.data_structure.LibRuntime;
// import server.lib.paths.LibPath;

// @Service
// @Transactional
// @RequiredArgsConstructor
// @SuppressFBWarnings({ "EI2", "EI" })
// public class MockData {
//   private static final void readMock() {
//     LibRuntime.inTryBlock(() -> {
//       Path mockPath = LibPath.ASSETS_DIR.resolve("mock.json").normalize();

//       String json = Files.readString(mockPath);
//     });
//   }
// }
