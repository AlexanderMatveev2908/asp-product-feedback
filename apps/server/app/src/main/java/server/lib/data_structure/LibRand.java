package server.lib.data_structure;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class LibRand {

  public static final <T> T choiceIn(List<T> args) {
    // ! nextInt is already exclusive max
    // ! so no need of -1
    final int max = args.size();
    final int rand = ThreadLocalRandom.current().nextInt(max);

    return args.get(rand);
  }

  public static final <T> T choiceIn(T[] args) {
    // ! nextInt is already exclusive max
    // ! so no need of -1
    final int max = args.length;
    final int rand = ThreadLocalRandom.current().nextInt(max);

    return args[rand];
  }
}
