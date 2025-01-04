import { Alert, Button, Grid, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { TbAlertTriangle, TbArrowUpRightCircle, TbX } from 'react-icons/tb';
import CommonNumberInput from 'scenes/common/input/CommonNumberInput';
import CommonModal from 'scenes/common/modal/CommonModal';

interface IncreaseTopicPartitionsComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    increaseTopicPartitions: (increaseTo: number) => Promise<any>;
    isIncreaseTopicPartitionsPending: boolean;
    topicToIncrease: string;
    numberOfPartitions: number;
}

function renderModalBody(increaseTo, setIncreaseTo) {
    return (
        <div className="flex flex-col">
            <Grid>
                <Grid.Col span={12} md={6} xl={4}>
                    <CommonNumberInput
                        label="Increase To"
                        value={increaseTo}
                        onChange={setIncreaseTo}
                        className="mb-4"
                    />
                </Grid.Col>
            </Grid>
            <Alert
                icon={<TbAlertTriangle size="1.4rem" />}
                title="Beware"
                color="lime"
                className="mb-4"
            >
                <Text>
                    If partitions are increased for a topic that has a key, the
                    partition logic or ordering of the messages will be
                    affected.
                </Text>
            </Alert>
            <Alert
                icon={<TbAlertTriangle size="1.4rem" />}
                title="Confirmation"
                color="lime"
            >
                <Text>Please confirm Topic Partitions Increase.</Text>
            </Alert>
        </div>
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
                color="red"
                leftIcon={<TbArrowUpRightCircle size="1rem" />}
                onClick={() => action()}
            >
                Increase
            </Button>
        </div>
    );
}

function IncreaseTopicPartitionsComponent({
    setIsModalOpen,
    isModalOpen,
    isIncreaseTopicPartitionsPending,
    topicToIncrease,
    increaseTopicPartitions,
    numberOfPartitions,
}: IncreaseTopicPartitionsComponentProps) {
    const [increaseTo, setIncreaseTo] = useState(numberOfPartitions);

    const action = () => increaseTopicPartitions(increaseTo);

    const modalBody = renderModalBody(increaseTo, setIncreaseTo);
    const modalFooter = renderModalFooter(setIsModalOpen, action);

    useEffect(() => {
        setIncreaseTo(numberOfPartitions);
    }, [numberOfPartitions]);

    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center break-all">
                    <Text className="pr-2">Increase Topic Partitions</Text>
                    <Text color="dimmed" size="xs">
                        {topicToIncrease}
                    </Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isIncreaseTopicPartitionsPending}
        />
    );
}

export default IncreaseTopicPartitionsComponent;
