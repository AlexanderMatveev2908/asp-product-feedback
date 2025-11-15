package server.conf.env_conf.etc.paperwork;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import server.lib.data_structure.LibShape;

public final class ResolvedChecker implements ConstraintValidator<Resolved, String> {
    @Override
    public boolean isValid(String val, ConstraintValidatorContext ctx) {
        return LibShape.hasText(val) && !val.startsWith("${");
    }
}
