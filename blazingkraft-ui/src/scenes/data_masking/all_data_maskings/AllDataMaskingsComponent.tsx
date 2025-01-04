import { useState } from 'react';
import CommonBody from 'scenes/common/body/CommonBody';
import DeleteDataMasking from '../delete_data_masking/DeleteDataMasking';
import EditDataMasking from '../edit_data_masking/EditDataMasking';
import { IDataMasking } from '../redux';
import AllDataMaskingsBody from './body/AllDataMaskingsBody';
import AllDataMaskingsHeader from './header/AllDataMaskingsHeader';

interface AllDataMaskingsComponentProps {
    refreshPageContent: () => void;
}

function AllDataMaskingsComponent({
    refreshPageContent,
}: AllDataMaskingsComponentProps) {
    const [dataMaskingToDelete, setDataMaskingToDelete] = useState<
        string | null
    >(null);
    const [isDeleteDataMaskingModalOpen, setIsDeleteDataMaskingModalOpen] =
        useState(false);

    const [dataMaskingToEdit, setDataMaskingToEdit] =
        useState<IDataMasking | null>(null);
    const [isEditDataMaskingModalOpen, setIsEditDataMaskingModalOpen] =
        useState(false);

    return (
        <>
            <AllDataMaskingsHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <AllDataMaskingsBody
                    setDataMaskingToDelete={setDataMaskingToDelete}
                    setIsDeleteDataMaskingModalOpen={
                        setIsDeleteDataMaskingModalOpen
                    }
                    setDataMaskingToEdit={setDataMaskingToEdit}
                    setIsEditDataMaskingModalOpen={
                        setIsEditDataMaskingModalOpen
                    }
                />
            </CommonBody>
            <DeleteDataMasking
                dataMaskingToDelete={dataMaskingToDelete}
                isModalOpen={isDeleteDataMaskingModalOpen}
                setIsModalOpen={setIsDeleteDataMaskingModalOpen}
                onSuccess={refreshPageContent}
            />
            <EditDataMasking
                dataMaskingToEdit={dataMaskingToEdit}
                isModalOpen={isEditDataMaskingModalOpen}
                setIsModalOpen={setIsEditDataMaskingModalOpen}
                onSuccess={refreshPageContent}
            />
        </>
    );
}

export default AllDataMaskingsComponent;
