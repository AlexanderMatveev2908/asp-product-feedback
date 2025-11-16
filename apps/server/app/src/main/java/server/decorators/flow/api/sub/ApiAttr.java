package server.decorators.flow.api.sub;

import java.util.Map;

import org.springframework.web.server.ServerWebExchange;

import server.decorators.Nullable;
import server.lib.data_structure.LibShape;

public interface ApiAttr {
  ServerWebExchange getExch();

  default <T> void setAttr(String key, T value) {
    LibShape.yellNone(value);

    getExch().getAttributes().put(key, value);
  }

  // ? instance form parsed in mdw and set before svc or ctrl
  default <T> void setTypedFormAttr(T data) {
    setAttr("typedForm", data);
  }

  default <T> Nullable<T> getTypedForm() {
    return getExch().getAttribute("typedForm");
  }

  // ? parsed query
  default void setParsedQueryAttr(Map<String, Object> parsed) {
    setAttr("parsedQuery", parsed);
  }

  default Nullable<Map<String, Object>> getParsedQuery() {
    Map<String, Object> val = getExch().getAttribute("parsedQuery");
    return Nullable.of(val);
  }

  // ? parsed form
  default void setParsedFormAttr(Map<String, Object> parsed) {
    setAttr("parsedForm", parsed);
  }

  default Nullable<Map<String, Object>> getParsedForm() {
    Map<String, Object> val = getExch().getAttribute("parsedForm");
    return Nullable.of(val);
  }

}
