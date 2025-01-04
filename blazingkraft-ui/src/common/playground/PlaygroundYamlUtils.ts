import jsyaml from 'js-yaml';

function validateYamlSyntax(yaml: string): null | string {
    try {
        jsyaml.load(yaml);
        return null;
    } catch (err) {
        return err.message;
    }
}

const PlaygroundYamlUtils = {
    validateYamlSyntax,
};

export { PlaygroundYamlUtils };
