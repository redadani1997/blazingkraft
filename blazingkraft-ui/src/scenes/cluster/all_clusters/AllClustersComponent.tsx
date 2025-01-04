import { useState } from 'react';
import CommonBody from 'scenes/common/body/CommonBody';
import DeleteCluster from '../delete_cluster/DeleteCluster';
import AllClustersBody from './body/AllClustersBody';
import AllClustersHeader from './header/AllClustersHeader';

interface AllClustersComponentProps {
    refreshPageContent: () => void;
}

function AllClustersComponent({
    refreshPageContent,
}: AllClustersComponentProps) {
    const [clusterToDelete, setClusterToDelete] = useState<string | null>(null);
    const [isDeleteClusterModalOpen, setIsDeleteClusterModalOpen] =
        useState(false);

    return (
        <>
            <AllClustersHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <AllClustersBody
                    setClusterToDelete={setClusterToDelete}
                    setIsDeleteClusterModalOpen={setIsDeleteClusterModalOpen}
                />
            </CommonBody>
            <DeleteCluster
                clusterToDelete={clusterToDelete}
                isModalOpen={isDeleteClusterModalOpen}
                setIsModalOpen={setIsDeleteClusterModalOpen}
                onSuccess={refreshPageContent}
            />
        </>
    );
}

export default AllClustersComponent;
