package server.paperwork.enums.enum_match;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import server.lib.data_structure.LibShape;

public class EnumMatchCheck implements ConstraintValidator<EnumMatch, Object> {
  private Set<String> whitelist;

  @Override
  public final void initialize(EnumMatch arg) {
    whitelist = Arrays.stream(arg.enumTarget().getEnumConstants()).map(Enum::name).collect(Collectors.toSet());
  }

  @Override
  public final boolean isValid(Object val, ConstraintValidatorContext ctx) {
    if (LibShape.isNone(val))
      return true;

    return whitelist.contains(val.toString());
  }
}
