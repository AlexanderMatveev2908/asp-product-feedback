package server.lib.data_structure.prs.sub;

import java.util.HexFormat;

import server.decorators.types.Dict;

public class C_PrsHex extends B_PrsUtf8 {
  public static final String utf8FromHex(String txtHex) {
    final byte[] utf8Bytes = HexFormat.of().parseHex(txtHex);
    return utf8FromBinary(utf8Bytes);
  }

  public static final String hexFromBinary(byte[] arg) {
    return HexFormat.of().formatHex(arg);
  }

  public static final byte[] binaryFromHex(String arg) {
    return HexFormat.of().parseHex(arg);
  }

  public static final Dict dictFromHex(String arg) {
    return dictFromJson(utf8FromHex(arg));
  }

  public static final String hexFromDict(Dict arg) {
    return hexFromBinary(binaryFromDict(arg));
  }
}
