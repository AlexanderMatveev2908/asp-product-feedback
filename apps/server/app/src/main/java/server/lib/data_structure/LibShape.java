package server.lib.data_structure;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import server.decorators.core.ErrAPI;
import server.decorators.types.Nullable;
import server.paperwork.Reg;

public final class LibShape {

    public static final <T> boolean isNone(T arg) {
        return !isPresent(arg);
    }

    public static final <T> boolean isPresent(T arg) {
        return arg != null;
    }

    public static final <T> void yellNone(T arg) {
        if (isNone(arg))
            throw new ErrAPI("expected Object, received None");
    }

    public static final boolean hasText(Object val) {
        if (val instanceof final String str)
            return !str.isBlank();

        return false;
    }

    public static final boolean isV4(String arg) {
        try {
            final boolean res = Reg.isUUID(Nullable.of(arg));
            UUID.fromString(arg);

            return res;
        } catch (final Exception err) {
            return false;
        }
    }

    public static final boolean hasListItems(Object arg) {
        if (arg instanceof final List<?> list)
            return !list.isEmpty();

        return false;
    }

    public static final boolean hasObjKeys(Object arg) {
        if (arg instanceof Map<?, ?> map)
            return !map.isEmpty();

        return false;
    }

    public static final boolean isPrim(Object arg) {
        if (isNone(arg))
            return false;

        final Class<?> type = arg.getClass();

        return type.isPrimitive()
                || arg instanceof String
                || arg instanceof Number
                || arg instanceof Boolean
                || arg instanceof Enum<?>;
    }

}
