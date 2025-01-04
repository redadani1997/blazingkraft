package com.redadani1997.blazingkraft.io.service.impl;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.core.TreeNode;
import com.redadani1997.blazingkraft.common.model.CommonObjectMapper;
import com.redadani1997.blazingkraft.error.io.IOImportException;
import java.io.Closeable;
import java.io.InputStream;
import java.util.function.BiConsumer;

public class IOImportJsonInputStreamServiceImpl implements Closeable {

    private final JsonParser jsonParser;
    private Boolean canParse = true;

    public IOImportJsonInputStreamServiceImpl(InputStream inputStream) throws IOImportException {
        try {
            JsonFactory factory = new JsonFactory();
            this.jsonParser = factory.createParser(inputStream);
        } catch (Exception ex) {
            throw new IOImportException(
                    String.format(
                            "Error when trying to initialize JSON Parser from imported file, with Error => '%s'",
                            ex.getMessage()));
        }
    }

    public void doParse(BiConsumer<TreeNode, Throwable> consumer) {
        JsonToken token = null;
        try {
            token = this.jsonParser.nextToken();
        } catch (Exception ex) {
            throw new IOImportException(
                    String.format(
                            "Error when trying to read first token from JSON File, with Error => '%s'",
                            ex.getMessage()));
        }

        if (token == null) {
            throw new IOImportException("Found no token in JSON File");
        }

        if (!JsonToken.START_ARRAY.equals(token)) {
            throw new IOImportException("JSON File is not an array");
        }

        while (this.canParse) {
            try {
                token = this.jsonParser.nextToken();
                if (!JsonToken.START_OBJECT.equals(token)) {
                    break;
                }
                if (token == null) {
                    break;
                }
                TreeNode treeNode = CommonObjectMapper.OBJECT_MAPPER.readTree(this.jsonParser);
                if (this.canParse) {
                    consumer.accept(treeNode, null);
                }
            } catch (Exception ex) {
                if (this.canParse) {
                    consumer.accept(null, ex);
                }
            }
        }
    }

    public void breakParsing() {
        this.canParse = false;
    }

    @Override
    public void close() {}
}
