package server.conf.cloud.etc.data_structure;

import lombok.Data;
import server.decorators.core.ErrAPI;
import server.decorators.types.Dict;

@Data
public final class CloudAsset {
    private final String publicId;
    private final String url;
    private final String resourceType;

    public static final CloudAsset fromMap(Dict arg) {

        try {
            final CloudAsset asset = new CloudAsset((String) arg.get("public_id"),
                    (String) arg.get("secure_url"),
                    (String) arg.get("resource_type"));
            return asset;
        } catch (Exception err) {
            throw new ErrAPI("Invalid cloud asset shape");
        }
    }
}
