package server.lib.data_structure.prs.sub;

import java.nio.charset.StandardCharsets;

import server.decorators.types.Dict;

public class B_PrsUtf8 extends A_PrsBase {
  public static final byte[] binaryFromUtf8(String arg) {
    return arg.getBytes(StandardCharsets.UTF_8);
  }

  public static final String utf8FromBinary(byte[] arg) {
    return new String(arg, StandardCharsets.UTF_8);
  }

  public static final byte[] binaryFromDict(Dict arg) {
    return binaryFromUtf8(jsonFromObj(arg));
  }
}
