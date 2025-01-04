import { TextInput } from '@mantine/core';
import { CommonFileUtils } from 'common/utils/CommonFileUtils';
import { useState } from 'react';
import CommonButton from 'scenes/common/button/CommonButton';
import FilesManagementModal from '../modal/FilesManagementModal';

interface FilesManagementButtonComponentProps {
    value: string | null;
    setValue: (value: string) => void;
    disabled?: boolean;
}

function FilesManagementButtonComponent({
    setValue,
    value,
    disabled,
}: FilesManagementButtonComponentProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const leafname = CommonFileUtils.getLeafName(value);

    return (
        <>
            {disabled ? (
                <TextInput
                    placeholder={leafname || 'No File Selected'}
                    disabled
                />
            ) : (
                <CommonButton
                    onClick={() => setIsModalOpen(true)}
                    variant="outline"
                >
                    {leafname || 'Select file'}
                </CommonButton>
            )}
            <FilesManagementModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                value={value}
                setValue={setValue}
            />
        </>
    );
}

export default FilesManagementButtonComponent;
