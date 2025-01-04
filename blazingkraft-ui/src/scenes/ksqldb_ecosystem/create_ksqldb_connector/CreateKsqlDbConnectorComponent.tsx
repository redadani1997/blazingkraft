import { Button, Grid, Text } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useState } from 'react';
import { TbPlus, TbX } from 'react-icons/tb';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonCheckbox from 'scenes/common/input/CommonCheckbox';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import CommonModal from 'scenes/common/modal/CommonModal';
import CommonTabs from 'scenes/common/tabs/CommonTabs';

interface CreateKsqlDbConnectorComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    createKsqlDbConnector: Function;
    isCreateKsqlDbConnectorPending: boolean;
}

function renderModalBody(
    connectorName,
    isSource,
    properties,
    setConnectorName,
    setIsSource,
    setProperties,
) {
    return (
        <CommonTabs
            container={{
                variant: 'outline',
                defaultValue: 'Details',
            }}
            items={[
                {
                    label: 'Details',
                    value: 'Details',
                    children: (
                        <Grid>
                            <Grid.Col span={12} sm={6}>
                                <CommonTextInput
                                    placeholder="Connector Name"
                                    value={connectorName}
                                    onChange={setConnectorName}
                                    label="Connector Name"
                                />
                            </Grid.Col>
                            <Grid.Col span={12} sm={6}>
                                <CommonCheckbox
                                    checked={isSource}
                                    onChange={() => setIsSource(!isSource)}
                                    label="Is Source"
                                />
                            </Grid.Col>
                        </Grid>
                    ),
                },
                {
                    label: 'Properties',
                    value: 'Properties',
                    children: (
                        <CommonEditorWrapper minHeight="23rem">
                            <CommonEditor
                                content={properties}
                                defaultValue={properties}
                                onContentChange={setProperties}
                                readOnly={false}
                                language="json"
                            />
                        </CommonEditorWrapper>
                    ),
                },
            ]}
        />
    );
}

function renderModalFooter(setIsModalOpen, action) {
    return (
        <div className="flex justify-between">
            <Button
                color="blue"
                variant="outline"
                leftIcon={<TbX size="1rem" />}
                onClick={() => setIsModalOpen(false)}
            >
                Cancel
            </Button>
            <Button
                color="blue"
                leftIcon={<TbPlus size="1rem" />}
                onClick={() => action()}
            >
                Create
            </Button>
        </div>
    );
}

function CreateKsqlDbConnectorComponent({
    isModalOpen,
    setIsModalOpen,
    createKsqlDbConnector,
    isCreateKsqlDbConnectorPending,
}: CreateKsqlDbConnectorComponentProps) {
    const [connectorName, setConnectorName] = useState<string>('');
    const [isSource, setIsSource] = useState<boolean>(false);
    const [properties, setProperties] = useState<string>(
        CommonUtils.beautifyJson({
            'connector.class': '',
        }),
    );

    const action = () =>
        createKsqlDbConnector(connectorName, isSource, properties);
    const modalBody = renderModalBody(
        connectorName,
        isSource,
        properties,
        setConnectorName,
        setIsSource,
        setProperties,
    );
    const modalFooter = renderModalFooter(setIsModalOpen, action);
    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center">
                    <Text className="pr-2">KsqlDb Connector Creation</Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isCreateKsqlDbConnectorPending}
        />
    );
}

export default CreateKsqlDbConnectorComponent;
