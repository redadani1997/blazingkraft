import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import aclActions from '../redux/actions';
import CreateAclComponent from './CreateAclComponent';

interface CreateAclProps {
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    refreshPageContent: () => void;
}

const CreateAcl = (props: CreateAclProps) => {
    // Map State To Props
    const { isCreateAclBindingPending } = useSelector((store: ReduxStore) => {
        return {
            isCreateAclBindingPending:
                store.aclReducer.isCreateAclBindingPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode } = useParams();

    const createAclBinding = acl =>
        dispatch(aclActions.createAclBinding(acl, clusterCode)).then(() => {
            props.setIsModalOpen(false);
            props.refreshPageContent();
        });

    return (
        <>
            <CreateAclComponent
                {...props}
                createAclBinding={createAclBinding}
                isCreateAclBindingPending={isCreateAclBindingPending}
            />
        </>
    );
};

export default CreateAcl;
