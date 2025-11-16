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

    public static final String fromFileField(String field) {
        return switch (field) {
            case "images" -> IMAGE.getVal();
            case "videos" -> VIDEO.getVal();
            default -> throw new ErrAPI("field not supported => " + field);
        };
    }
}
