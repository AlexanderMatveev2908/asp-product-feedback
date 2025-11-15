package server.paperwork;

import java.util.regex.Pattern;

import server.decorators.Nullable;
import server.decorators.flow.ErrAPI;

public final class Reg {
        public static final String CITY = "^[\\p{L}\\s'\\-]+$";
        public static final String NAME = "^[\\p{L}\\s,`'\\-]*$";
        public static final String TXT = "^[\\p{L}\\d\\s\\-'\\\".,;!?]*$";
        public static final String EMOJI = "^\\s*[\\p{So}\\p{Cn}].*";
        public static final String INT = "^\\d+$";
        public static final String FLOAT = "^(?:\\d+(?:\\.\\d{1,2})?|\\.\\d{1,2})$";
        public static final String UUID = "^([a-f0-9]{8})-([a-f0-9]{4})-4[a-f0-9]{3}-([a-f0-9]{4})-([a-f0-9]{12})$";

        public Reg() {
                throw new ErrAPI("Keep Reg class as static helper");
        }

        private static final boolean checkReg(Nullable<String> arg, String reg) {
                return arg.isPresent() && Pattern.matches(reg, arg.get());
        }

        public static final boolean isName(Nullable<String> arg) {
                return checkReg(arg, NAME);
        }

        public static final boolean isTxt(Nullable<String> arg) {
                return checkReg(arg, TXT);
        }

        public static final boolean isInt(Nullable<String> arg) {
                return checkReg(arg, INT);
        }

        public static final boolean isFloat(Nullable<String> arg) {
                return checkReg(arg, FLOAT);
        }

        public static final boolean isUUID(Nullable<String> arg) {
                return checkReg(arg, UUID);
        }

        public static final boolean startsWithEmj(Nullable<String> arg) {
                return checkReg(arg, EMOJI);

        }

}
