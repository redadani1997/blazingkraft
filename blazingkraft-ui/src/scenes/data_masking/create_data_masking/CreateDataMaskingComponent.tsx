import { Alert, Button, Grid, Text } from '@mantine/core';
import { DataMaskingUtils } from 'common/utils/DataMaskingUtils';
import camelCase from 'lodash.camelcase';
import { useState } from 'react';
import { TbAlertCircle, TbPlus, TbX } from 'react-icons/tb';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import CommonModal from 'scenes/common/modal/CommonModal';
import CommonSelect from 'scenes/common/select/CommonSelect';
import { IDataMaskingRequest } from '../redux/actions';

interface CreateDataMaskingComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    createDataMasking: (request: IDataMaskingRequest) => Promise<any>;
    isCreateDataMaskingPending: boolean;
}

function renderModalBody(
    name,
    setName,
    code,
    setCode,
    dataMaskingType,
    setDataMaskingType,
    rule,
    setRule,
    ruleType,
    setRuleType,
    result,
    setResult,
    topic,
    setTopic,
    topicType,
    setTopicType,
) {
    return (
        <>
            <Grid className="items-end pb-4">
                <Grid.Col span={12} md={6} lg={4}>
                    <CommonTextInput
                        required
                        label="Name"
                        placeholder="Select a Name"
                        onChange={value => {
                            setName(value);
                            setCode(camelCase(value));
                        }}
                        error={!code ? true : false}
                        value={name}
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6} lg={4}>
                    <CommonTextInput
                        label="Code"
                        placeholder="Select a Code"
                        value={code}
                        disabled
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6} lg={4}>
                    <CommonSelect
                        label="Masking Type"
                        placeholder="Select a Masking Type"
                        data={DataMaskingUtils.MASKING_TYPES_OPTIONS}
                        value={dataMaskingType}
                        onChange={value => setDataMaskingType(value)}
                        clearable={false}
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6} lg={4}>
                    <CommonSelect
                        label="Rule Type"
                        placeholder="Rule Type"
                        data={DataMaskingUtils.RULE_TYPES_OPTIONS}
                        value={ruleType}
                        onChange={setRuleType}
                        clearable={false}
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6} lg={4}>
                    <CommonTextInput
                        required
                        label="Rule"
                        placeholder="Select a Rule"
                        onChange={setRule}
                        error={!rule ? true : false}
                        value={rule}
                    />
                </Grid.Col>
                <Grid.Col span={12} md={6} lg={4}>
                    <CommonSelect
                        label="Result"
                        placeholder="Result"
                        data={DataMaskingUtils.RESULTS_OPTIONS}
                        value={result}
                        onChange={setResult}
                        clearable={false}
                    />
                </Grid.Col>
                {(dataMaskingType === 'CONSUMER_KEY' ||
                    dataMaskingType === 'CONSUMER_VALUE') && (
                    <>
                        <Grid.Col span={12} md={6} lg={4}>
                            <CommonSelect
                                label="Topic Type"
                                placeholder="Select a Topic Type"
                                data={DataMaskingUtils.TOPIC_TYPES_OPTIONS}
                                value={topicType}
                                onChange={setTopicType}
                                clearable={false}
                            />
                        </Grid.Col>
                        <Grid.Col span={12} md={6} lg={4}>
                            <CommonTextInput
                                required
                                label="Topic"
                                placeholder="Select a Topic"
                                onChange={setTopic}
                                error={!topic ? true : false}
                                value={topic}
                            />
                        </Grid.Col>
                    </>
                )}
            </Grid>

            <Alert icon={<TbAlertCircle size={16} />} title="Info" color="blue">
                <Text>
                    * A Masking type enables you to apply the masking rule on a
                    specific type of resource (Consumer, KsqlDb query
                    result...).
                </Text>
                <Text>
                    * A Rule type enables you to choose the attribute to mask,
                    for now only the complete attribute name is available.
                    Therefore the rule should contain the attribute to mask.
                </Text>
                <Text>
                    * A Topic is only available for consumer masking types.
                </Text>
            </Alert>
        </>
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

function CreateDataMaskingComponent({
    setIsModalOpen,
    isModalOpen,
    isCreateDataMaskingPending,
    createDataMasking,
}: CreateDataMaskingComponentProps) {
    const [name, setName] = useState('Very Secret Attribute Rule');
    const [code, setCode] = useState('verySecretAttributeRule');
    const [dataMaskingType, setDataMaskingType] = useState('CONSUMER_VALUE');
    const [rule, setRule] = useState('verySecretAttributeName');
    const [ruleType, setRuleType] = useState('ATTRIBUTE_EQUALS');
    const [result, setResult] = useState('STAR');
    const [topicType, setTopicType] = useState('EQUALS');
    const [topic, setTopic] = useState('topicname');

    const action = () =>
        createDataMasking({
            name,
            code,
            dataMaskingType,
            rule,
            ruleType,
            result,
            topicType,
            topic,
        });

    const modalBody = renderModalBody(
        name,
        setName,
        code,
        setCode,
        dataMaskingType,
        setDataMaskingType,
        rule,
        setRule,
        ruleType,
        setRuleType,
        result,
        setResult,
        topic,
        setTopic,
        topicType,
        setTopicType,
    );
    const modalFooter = renderModalFooter(setIsModalOpen, action);

    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center break-all">
                    <Text className="pr-2">Create Data Masking Rule</Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isCreateDataMaskingPending}
        />
    );
}

export default CreateDataMaskingComponent;
