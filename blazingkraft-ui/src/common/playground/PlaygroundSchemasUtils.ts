const PLAYGROUND_OPENAPI_YAML_SCHEMA_DEFAULT =
    '---\nswagger: "2.0"\ninfo:\n  version: "1.1.0"\n  title: "Swagger Blazing KRaft"\n  description: "A Mock API to be replaced by the desired one.\\n"\nconsumes:\n- "application/json"\nproduces:\n- "application/json"\npaths:\n  /kraft:\n    get:\n      description: "Blazing Api"\n      responses:\n        "200":\n          description: "Blazing Response"\n          schema:\n            $ref: "#/definitions/da_blaze"\ndefinitions:\n  da_blaze:\n    type: "string"\n';
const PLAYGROUND_OPENAPI_YAML_CONTENT_DEFAULT =
    '---\nIssuer: "Blazing KRaft"\nSymbol: "BK"\n';

const PLAYGROUND_OPENAPI_JSON_SCHEMA_DEFAULT =
    '{\n  "swagger": "2.0",\n  "info": {\n    "version": "1.1.0",\n    "title": "Swagger Blazing KRaft",\n    "description": "A Mock API to be replaced by the desired one.\\n"\n  },\n  "consumes": [\n    "application/json"\n  ],\n  "produces": [\n    "application/json"\n  ],\n  "paths": {\n    "/kraft": {\n      "get": {\n        "description": "Blazing Api",\n        "responses": {\n          "200": {\n            "description": "Blazing Response",\n            "schema": {\n              "$ref": "#/definitions/da_blaze"\n            }\n          }\n        }\n      }\n    }\n  },\n  "definitions": {\n    "da_blaze": {\n      "type": "string"\n    }\n  }\n}';

const PLAYGROUND_OPENAPI_JSON_CONTENT_DEFAULT = JSON.stringify(
    {
        Issuer: 'Blazing KRaft',
        Symbol: 'BK',
    },
    undefined,
    2,
);

const PLAYGROUND_AVRO_SCHEMA_DEFAULT = JSON.stringify(
    {
        type: 'record',
        namespace: 'redadani1997',
        name: 'BlazingKRaft',
        fields: [
            { name: 'Issuer', type: 'string' },
            { name: 'Symbol', type: 'string' },
        ],
    },
    undefined,
    2,
);

const PLAYGROUND_AVRO_CONTENT_JSON_DEFAULT = JSON.stringify(
    {
        Issuer: 'Blazing KRaft',
        Symbol: 'BK',
    },
    undefined,
    2,
);

const PLAYGROUND_AVRO_CONTENT_YAML_DEFAULT =
    '---\nIssuer: "Blazing KRaft"\nSymbol: "BK"\n';

const PLAYGROUND_JSON_SCHEMA_DEFAULT = JSON.stringify(
    {
        $schema: 'https://json-schema.org/draft/2019-09/schema',
        title: 'Blazing KRaft',
        description: 'A Blazing KRaft boilerplate schema.',
        required: ['Issuer', 'Symbol'],
        type: 'object',
        properties: {
            Issuer: {
                type: 'string',
            },
            Symbol: {
                type: 'string',
            },
        },
    },
    undefined,
    2,
);

const PLAYGROUND_JSON_CONTENT_JSON_DEFAULT = JSON.stringify(
    {
        Issuer: 'Blazing KRaft',
        Symbol: 'BK',
    },
    undefined,
    2,
);

const PLAYGROUND_JSON_CONTENT_YAML_DEFAULT =
    '---\nIssuer: "Blazing KRaft"\nSymbol: "BK"\n';

const PLAYGROUND_PROTOBUF_SCHEMA_DEFAULT = `syntax = "proto3";
/* Proto Syntax validation is not done by the Editor 
as it can be unpredictable.
For this reason it is delegated to the Server.*/

message SearchRequest {
 string Issuer = 1;
 string Symbol = 2;
}`;

const PLAYGROUND_PROTOBUF_CONTENT_JSON_DEFAULT = JSON.stringify(
    {
        Issuer: 'Blazing KRaft',
        Symbol: 'BK',
    },
    undefined,
    2,
);

const PLAYGROUND_PROTOBUF_CONTENT_YAML_DEFAULT =
    '---\nIssuer: "Blazing KRaft"\nSymbol: "BK"\n';

const PLAYGROUND_TYPESCRIPT_CONTENT_DEFAULT = `interface BlazingKRaft {
    Issuer: string;
    Symbol: string;
}`;

const PLAYGROUND_TEXT_CONTENT_DEFAULT = `Issuer: Blazing KRaft
Symbol: BK`;

const PLAYGROUND_SQL_CONTENT_DEFAULT = `CREATE TABLE BlazingKRaft (
    Issuer VARCHAR(255) NOT NULL,
    Symbol VARCHAR(255) NOT NULL
);`;

const PLAYGROUND_HTML_CONTENT_DEFAULT = `<html>
    <head>
        <title>Blazing KRaft</title>
    </head>
    <body>
        <h1>Blazing KRaft</h1>
        <p>Issuer: Blazing KRaft</p>
        <p>Symbol: BK</p>
    </body>
</html>`;

const PlaygroundSchemasUtils = {
    PLAYGROUND_OPENAPI_YAML_SCHEMA_DEFAULT,
    PLAYGROUND_OPENAPI_YAML_CONTENT_DEFAULT,
    PLAYGROUND_OPENAPI_JSON_SCHEMA_DEFAULT,
    PLAYGROUND_OPENAPI_JSON_CONTENT_DEFAULT,
    PLAYGROUND_AVRO_SCHEMA_DEFAULT,
    PLAYGROUND_AVRO_CONTENT_JSON_DEFAULT,
    PLAYGROUND_AVRO_CONTENT_YAML_DEFAULT,
    PLAYGROUND_JSON_SCHEMA_DEFAULT,
    PLAYGROUND_JSON_CONTENT_JSON_DEFAULT,
    PLAYGROUND_JSON_CONTENT_YAML_DEFAULT,
    PLAYGROUND_PROTOBUF_SCHEMA_DEFAULT,
    PLAYGROUND_PROTOBUF_CONTENT_JSON_DEFAULT,
    PLAYGROUND_PROTOBUF_CONTENT_YAML_DEFAULT,
    PLAYGROUND_TYPESCRIPT_CONTENT_DEFAULT,
    PLAYGROUND_TEXT_CONTENT_DEFAULT,
    PLAYGROUND_SQL_CONTENT_DEFAULT,
    PLAYGROUND_HTML_CONTENT_DEFAULT,
};

export { PlaygroundSchemasUtils };
