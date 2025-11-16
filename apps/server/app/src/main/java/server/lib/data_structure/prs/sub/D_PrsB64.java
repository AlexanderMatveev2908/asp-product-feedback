package server.lib.data_structure.prs.sub;

import java.util.Base64;

import server.decorators.types.Dict;

public class D_PrsB64 extends C_PrsHex {
  public static final String utf8FromB64(String arg) {
    return utf8FromBinary(Base64.getDecoder().decode(arg));
  }

  public static final Dict dictFromB64(String arg) {
    final String json = utf8FromB64(arg);
    return dictFromJson(json);
  }

  public static final String b64FromDict(Dict arg) {
    final String json = jsonFromObj(arg);
    final byte[] binary = binaryFromUtf8(json);
    final byte[] binaryBase64 = Base64.getEncoder().encode(binary);

    return utf8FromBinary(binaryBase64);
  }

  public static final String b64FromBinary(byte[] arg) {
    final byte[] binaryBase64 = Base64.getEncoder().encode(arg);
    return utf8FromBinary(binaryBase64);
  }
}
