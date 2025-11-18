package server.lib.data_structure.prs;

import java.lang.reflect.Field;

import server.decorators.core.ErrAPI;
import server.decorators.types.Dict;
import server.lib.data_structure.Jack;
import server.lib.data_structure.LibRuntime;
import server.lib.data_structure.prs.sub.F_PrsCases;

public final class LibPrs extends F_PrsCases {

    public static final <T> T tFromJson(String json, Class<T> cls) {
        final Dict dict = dictFromJson(json);
        return tFromDict(dict, cls);
    }

    public static final <T> T tFromDict(Dict dict, Class<T> cls) {
        try {
            return Jack.main.convertValue(dict, cls);
        } catch (final Exception err) {
            throw new ErrAPI("invalid data", 400);
        }
    }

    public static final <T> Dict dictFromT(T arg) {
        final Dict dict = new Dict();

        for (final Field field : arg.getClass().getDeclaredFields()) {
            field.setAccessible(true);
            LibRuntime.inTryBlock(() -> dict.put(field.getName(), field.get(arg)));
        }

        return dict;
    }

    public static final String asUsername(String arg) {
        return arg.replaceAll("\\s+", ".").toLowerCase();
    }
}
