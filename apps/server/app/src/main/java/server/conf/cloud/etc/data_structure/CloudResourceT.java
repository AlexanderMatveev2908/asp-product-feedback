package server.conf.cloud.etc.data_structure;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import server.decorators.core.ErrAPI;

@Getter
@RequiredArgsConstructor
public enum CloudResourceT {
    IMAGE("image"),
    VIDEO("video");

    private final String val;

    public static final CloudResourceT fromFileField(String field) {
        return switch (field) {
            case "images" -> IMAGE;
            case "videos" -> VIDEO;
            default -> throw new ErrAPI("field not supported => " + field);
        };
    }

    public final String plural() {
        return val + "s";
    }

    public final boolean isImage() {
        return this == IMAGE;
    }
}
