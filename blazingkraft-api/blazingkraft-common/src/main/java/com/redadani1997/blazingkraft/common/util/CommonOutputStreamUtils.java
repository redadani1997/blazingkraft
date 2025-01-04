package com.redadani1997.blazingkraft.common.util;

import com.redadani1997.blazingkraft.common.model.CommonObjectMapper;
import java.io.IOException;
import java.io.OutputStream;
import lombok.experimental.UtilityClass;

@UtilityClass
public class CommonOutputStreamUtils {

    public static void writeAndFlush(OutputStream outputStream, Object object) throws IOException {
        CommonObjectMapper.OBJECT_MAPPER.writeValue(outputStream, object);

        outputStream.flush();
    }
}
