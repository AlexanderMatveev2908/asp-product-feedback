package server.lib.data_structure.prs.sub;

import com.fasterxml.jackson.core.type.TypeReference;

import server.decorators.types.Dict;
import server.lib.data_structure.Jack;
import server.lib.data_structure.LibRuntime;

public class A_PrsBase {

  public static final String jsonFromObj(Object obj) {
    return LibRuntime.inTryBlock(() -> Jack.main.writeValueAsString(obj));
  }

  public static final Dict dictFromJson(String txt) {
    return LibRuntime.inTryBlock(() -> Jack.main.readValue(txt, new TypeReference<Dict>() {
    }));
  }
}
