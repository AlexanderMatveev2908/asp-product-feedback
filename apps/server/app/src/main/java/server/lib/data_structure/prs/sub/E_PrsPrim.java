package server.lib.data_structure.prs.sub;

import server.decorators.Nullable;
import server.decorators.flow.ErrAPI;
import server.lib.data_structure.LibShape;

public class E_PrsPrim extends D_PrsB64 {

  public static final Nullable<String> fromAnyToStr(Object arg) {
    return LibShape.hasText(arg) ? Nullable.of((String) arg) : Nullable.asNone();
  }

  public static final long fromAnyToLong(Object arg) {
    if (arg instanceof final Number num)
      return num.longValue();

    if (arg instanceof final String str)
      return Long.parseLong(str);

    throw new ErrAPI("unknown arg type");
  }
}
