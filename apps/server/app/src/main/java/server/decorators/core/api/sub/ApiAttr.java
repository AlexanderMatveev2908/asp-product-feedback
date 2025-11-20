package server.decorators.core.api.sub;

import org.springframework.web.server.ServerWebExchange;

import server.decorators.types.Dict;
import server.decorators.types.Nullable;
import server.lib.data_structure.LibShape;

public interface ApiAttr {
  ServerWebExchange getExch();

  default <T> void setAttr(String key, T value) {
    LibShape.yellNone(value);

    getExch().getAttributes().put(key, value);
  }

  // ? instance form parsed in mdw and set before svc or ctrl
  default <T> void setTypedDataAttr(T data) {
    setAttr("typedForm", data);
  }

  default <T> Nullable<T> getTypedData() {
    return Nullable.of(getExch().getAttribute("typedForm"));
  }

  // ? parsed query
  default void setParsedQueryAttr(Dict parsed) {
    setAttr("parsedQuery", parsed);
  }

  default Nullable<Dict> getParsedQuery() {
    Dict val = getExch().getAttribute("parsedQuery");
    return Nullable.of(val);
  }

  // ? parsed form
  default void setParsedFormAttr(Dict parsed) {
    setAttr("parsedForm", parsed);
  }

  default Nullable<Dict> getParsedForm() {
    Dict val = getExch().getAttribute("parsedForm");
    return Nullable.of(val);
  }

}
