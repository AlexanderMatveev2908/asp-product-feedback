package server.decorators.types;

import java.io.IOException;
import java.lang.reflect.Field;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.UUID;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import lombok.Getter;
import server.conf.cloud.etc.data_structure.CloudResourceT;
import server.decorators.core.ErrAPI;
import server.lib.data_structure.LibRuntime;
import server.lib.paths.LibPath;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY, getterVisibility = JsonAutoDetect.Visibility.NONE, isGetterVisibility = JsonAutoDetect.Visibility.NONE)
@SuppressFBWarnings("EI_EXPOSE_REP")
@Getter
public final class AppFile {
    private final CloudResourceT field;
    private final String filename;
    private final Nullable<String> contentType;
    private final Nullable<byte[]> bts;
    private final Nullable<Path> filePath;

    public AppFile(
            CloudResourceT field,
            String filename,
            Nullable<String> contentType,
            Nullable<byte[]> bts) {

        this.field = field;
        this.contentType = contentType;
        this.bts = bts;
        this.filename = randomFilename(filename);
        this.filePath = Nullable.of(LibPath.ASSETS_DIR.resolve(this.field.plural()).resolve(this.filename));
    }

    // ? this constructor below is used mostly for dev uploads of mock data images
    public AppFile(
            String filename,
            Path filePath) {
        this.field = CloudResourceT.IMAGE;
        this.filename = randomFilename(filename);
        this.contentType = Nullable.asNone();
        this.bts = Nullable.of(LibRuntime.inTryBlock(() -> Files.readAllBytes(filePath)));
        this.filePath = Nullable.of(filePath);
    }

    public AppFile(String filename, byte[] bts) {
        this.field = CloudResourceT.IMAGE;
        this.filename = randomFilename(filename);
        this.contentType = Nullable.asNone();
        this.bts = Nullable.of(bts);
        this.filePath = Nullable.asNone();
    }

    private final String findExt(String arg) {
        final String ext;
        final int idxDot = arg.lastIndexOf('.');
        if (idxDot != -1 && idxDot < arg.length() - 1)
            ext = arg.substring(idxDot);
        else
            throw new ErrAPI("invalid filename");

        return ext;
    }

    private final String randomFilename(String arg) {
        final String ext = findExt(arg);
        return UUID.randomUUID().toString() + ext;
    }

    public final void saveLocally() {
        if (filePath.isNone())
            throw new ErrAPI("tried to save locally without filepath present");
        if (bts.isNone())
            throw new ErrAPI("tried to save locally without binary code present");

        if (!Files.exists(filePath.orYell()))
            throw new ErrAPI("file does not exist at => " + filePath.orYell());

        try {
            Files.write(this.getFilePath().orYell(), this.getBts().orYell(),
                    StandardOpenOption.CREATE,
                    StandardOpenOption.TRUNCATE_EXISTING);
        } catch (IOException err) {
            throw new ErrAPI("err saving asset locally");
        }
    }

    public final void deleteLocally() {
        if (filePath.isNone())
            throw new ErrAPI("tried to delete locally without filepath present");

        try {
            Files.deleteIfExists(this.getFilePath().orYell());
        } catch (IOException err) {
            throw new ErrAPI("err deleting asset locally");
        }
    }

    public final ByteArrayResource getResourceFromBts() {
        if (bts.isNone())
            throw new ErrAPI("tried to create resource from binary without binary present");

        return new ByteArrayResource(this.bts.orYell()) {
            @Override
            public String getFilename() {
                return filename;
            }
        };
    }

    public final FileSystemResource getResourceFromPath() {
        if (filePath.isNone())
            throw new ErrAPI("tried to create resource from filepath without filepath present");

        return new FileSystemResource(filePath.orYell());
    }

    public final Dict getFancyShape() {
        final Dict fancyMap = new Dict();

        try {
            final Class<?> cls = this.getClass();

            for (final Field f : cls.getDeclaredFields()) {
                f.setAccessible(true);

                final Object val = f.get(this);

                if ("bts".equals(f.getName()))
                    fancyMap.put("bytes", val);
                else
                    fancyMap.put(f.getName(), val instanceof Nullable<?> inst ? inst.orNone() : val);

            }
        } catch (IllegalAccessException | IllegalArgumentException err) {
            throw new ErrAPI("err parsing file to fancy shape");
        }

        return fancyMap;
    }

}
