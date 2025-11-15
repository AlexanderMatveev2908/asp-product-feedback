package server.decorators.flow.res_api.data_structure;

import java.io.IOException;
import java.util.Map.Entry;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import server.decorators.flow.res_api.ResAPI;

public final class ResApiJson extends JsonSerializer<ResAPI> {
    @Override
    public final void serialize(ResAPI res, JsonGenerator gen, SerializerProvider serializers) throws IOException {

        gen.writeStartObject();
        gen.writeStringField("msg", res.getMsg());
        gen.writeNumberField("status", res.getStatus());

        if (res.getData() == null)
            gen.writeNullField("data");
        else
            for (final Entry<String, Object> pair : res.getData().entrySet())
                gen.writeObjectField(pair.getKey(), pair.getValue());

        gen.writeEndObject();
    }
}
