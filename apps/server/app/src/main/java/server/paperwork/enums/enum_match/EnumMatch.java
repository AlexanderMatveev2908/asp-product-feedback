package server.paperwork.enums.enum_match;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EnumMatchCheck.class)
public @interface EnumMatch {
  public abstract String message() default "invalid enum value";

  public abstract Class<?>[] groups() default {};

  public abstract Class<? extends Payload>[] payload() default {};

  public abstract Class<? extends Enum<?>> enumTarget();
}