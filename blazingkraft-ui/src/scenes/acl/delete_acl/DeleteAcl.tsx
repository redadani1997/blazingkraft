import { AclBinding } from 'common/types/acl_binding';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import aclActions from '../redux/actions';
import DeleteAclComponent from './DeleteAclComponent';

interface DeleteAclProps {
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    refreshPageContent: () => void;
    aclBindingToDelete: AclBinding;
}

const DeleteAcl = (props: DeleteAclProps) => {
    // Map State To Props
    const { isDeleteAclBindingPending } = useSelector((store: ReduxStore) => {
        return {
            isDeleteAclBindingPending:
                store.aclReducer.isDeleteAclBindingPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode } = useParams();

    const deleteAclBinding = acl =>
        dispatch(aclActions.deleteAclBinding(acl, clusterCode)).then(() => {
            props.setIsModalOpen(false);
            props.refreshPageContent();
        });

    return (
        <>
            <DeleteAclComponent
                {...props}
                deleteAclBinding={deleteAclBinding}
                isDeleteAclBindingPending={isDeleteAclBindingPending}
            />
        </>
    );
};

export default DeleteAcl;
