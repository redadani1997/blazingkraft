import { useDocumentTitle } from '@mantine/hooks';
import CreateTopicComponent from './CreateTopicComponent';

const CreateTopic = () => {
    useDocumentTitle('Blazing KRaft - Create Topic');

    return <CreateTopicComponent />;
};

export default CreateTopic;
