package server.lib.data_structure.prs;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import server.decorators.flow.ErrAPI;
import server.lib.data_structure.Jack;
import server.lib.data_structure.LibRuntime;
import server.lib.data_structure.prs.sub.F_PrsCases;

public final class LibPrs extends F_PrsCases {

    public static final <T> T tFromJson(String json, Class<T> cls) {
        final Map<String, Object> map = mapFromJson(json);
        return tFromMap(map, cls);
    }

    public static final <T> T tFromMap(Map<String, Object> map, Class<T> cls) {
        return Jack.mapper.convertValue(map, cls);
    }

    public static final LinkedHashMap<String, Object> linkedMap(Object... kvp) {
        final LinkedHashMap<String, Object> map = new LinkedHashMap<>();

        if (kvp.length % 2 != 0)
            throw new ErrAPI("passed odd pairs kv");

        for (int i = 0; i < kvp.length; i += 2)
            map.put((String) kvp[i], kvp[i + 1]);

        return map;
    }

    public static final <T> Map<String, Object> mapFromT(T arg) {
        final Map<String, Object> map = new HashMap<>();

        for (final Field field : arg.getClass().getDeclaredFields()) {
            field.setAccessible(true);
            LibRuntime.inTryBlock(() -> map.put(field.getName(), field.get(arg)));
        }

        return map;
    }
}
