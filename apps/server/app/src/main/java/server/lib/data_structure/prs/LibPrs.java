package server.lib.data_structure.prs;

import server.lib.data_structure.prs.sub.G_PrsType;

public final class LibPrs extends G_PrsType {

    public static final String asUsername(String arg) {
        return arg.replaceAll("\\s+", ".").toLowerCase().replaceAll("\\.+", ".");
    }
}
