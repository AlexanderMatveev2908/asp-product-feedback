package server.lib.data_structure.prs.sub;

import java.util.Map;

import com.fasterxml.jackson.core.type.TypeReference;

import server.lib.data_structure.Jack;
import server.lib.data_structure.LibRuntime;

public class A_PrsBase {

  public static final String jsonFromObj(Object obj) {
    return LibRuntime.inTryBlock(() -> Jack.mapper.writeValueAsString(obj));
  }

  public static final Map<String, Object> mapFromJson(String txt) {
    return LibRuntime.inTryBlock(() -> Jack.mapper.readValue(txt, new TypeReference<Map<String, Object>>() {
    }));
  }
}
