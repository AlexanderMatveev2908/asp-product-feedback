package server.lib.data_structure;

import java.util.List;
import java.util.UUID;

import server.decorators.Nullable;
import server.paperwork.Reg;

public final class LibShape {
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
        } catch (Exception err) {
            return false;
        }
    }

    public static final boolean isList(Object arg) {
        if (arg instanceof final List<?> argList)
            return !argList.isEmpty();

        return false;
    }
}
