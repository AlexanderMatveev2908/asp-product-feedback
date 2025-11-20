package server.middleware.base_mdw.etc.services;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.core.ErrAPI;
import server.decorators.core.api.Api;
import server.decorators.types.Dict;
import server.decorators.types.Nullable;

@Service
@RequiredArgsConstructor
public final class FormChecker {
    private final Validator checker;

    public final <T> Mono<Void> check(Api api, T form) {
        final Set<ConstraintViolation<T>> errs = checker.validate(form);

        if (errs.isEmpty())
            return Mono.fromRunnable(() -> api.setTypedDataAttr(form));

        final List<Map<String, String>> errors = errs.stream()
                .map(err -> Map.of("field", err.getPropertyPath().toString(), "msg", err.getMessage())).toList();

        return Mono.error(new ErrAPI(errors.get(0).get("msg"), 422, Nullable.of(Dict.of("errs", errors))));
    }

}
