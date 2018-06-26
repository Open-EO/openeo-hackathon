```bash
brew install swagger-codegen

swagger-codegen generate -o gen-ts -l typescript-fetch -i https://raw.githubusercontent.com/Open-EO/openeo-api/0.0.2/swagger.json -t openeo-ts-tpl
```

The available properties for the templates can be derived from the classes in https://github.com/swagger-api/swagger-codegen/tree/master/modules/swagger-codegen/src/main/java/io/swagger/codegen. The actual codegen language implementation can add more properties.

The templates in openeo-ts-tpl were started from https://github.com/swagger-api/swagger-codegen/tree/master/modules/swagger-codegen/src/main/resources/typescript-fetch.