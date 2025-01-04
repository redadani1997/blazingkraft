import CommonTabs from 'scenes/common/tabs/CommonTabs';
import ConversionsBytes from './bytes/ConversionsBytes';
import ConversionsJsonToYaml from './json2yaml/ConversionsJsonToYaml';
import ConversionsTime from './time/ConversionsTime';
import ConversionsYamlToJson from './yaml2json/ConversionsYamlToJson';

const ConversionsBodyComponent = () => {
    return (
        <CommonTabs
            container={{
                variant: 'default',
                defaultValue: 'Json To Yaml',
                className: 'h-full',
            }}
            items={[
                {
                    label: 'Json To Yaml',
                    value: 'Json To Yaml',
                    children: <ConversionsJsonToYaml />,
                },
                {
                    label: 'Yaml To Json',
                    value: 'Yaml To Json',
                    children: <ConversionsYamlToJson />,
                },
                {
                    label: 'Bytes',
                    value: 'Bytes',
                    children: <ConversionsBytes />,
                },
                {
                    label: 'Time',
                    value: 'Time',
                    children: <ConversionsTime />,
                },
            ]}
        />
    );
};

export default ConversionsBodyComponent;
