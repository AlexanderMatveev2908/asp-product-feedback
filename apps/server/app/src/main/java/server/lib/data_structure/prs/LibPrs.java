package server.lib.data_structure.prs;

import server.lib.data_structure.prs.sub.H_PrsSql;

public final class LibPrs extends H_PrsSql {

    public static final String asUsername(String arg) {
        return arg.replaceAll("\\s+", ".").toLowerCase().replaceAll("\\.+", ".");
    }

}
