package server.decorators.core;

import lombok.Getter;
import server.decorators.etc.RootCls;
import server.decorators.types.Dict;
import server.decorators.types.Nullable;
import server.paperwork.Reg;

@Getter
public final class ErrAPI extends RuntimeException implements RootCls {

    private final String msg;
    private final int status;
    private final Nullable<Dict> data;

    public ErrAPI(String msg, int status, Nullable<Dict> data) {
        super(Reg.startsWithEmj(Nullable.of(msg)) ? msg : "❌ " + msg);
        this.msg = super.getMessage();
        this.status = status;
        this.data = data;
    }

    public ErrAPI(String msg, int status) {
        this(msg, status, Nullable.asNone());
    }

    public ErrAPI(String msg) {
        this(msg, 500, Nullable.asNone());
    }

    @Override
    public String toString() {
        return reflectiveToString();
    }

}
