import { SubjectPermissions } from 'common/permissions/schema_registry/SubjectPermissions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import schemaRegistryActions from 'scenes/schema_registry/redux/actions';
import SubjectDetailsHeaderComponent from './SubjectDetailsHeaderComponent';

const SubjectDetailsHeader = () => {
    // Map State To Props
    const { isGetSubjectDetailsPending, subjectDetails } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetSubjectDetailsPending:
                    store.schemaRegistryReducer.isGetSubjectDetailsPending,
                subjectDetails: store.schemaRegistryReducer.subjectDetails,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { schemaRegistryCode, subject } = useParams();
    const navigate = useNavigate();

    const refreshPageContent = () =>
        dispatch(
            schemaRegistryActions.getSubjectDetails(
                subject,
                schemaRegistryCode,
            ),
        ).catch(() => {
            navigate(`/schema_registries/${schemaRegistryCode}/subjects`);
        });

    // Authorization
    const { isAuthorized: isAuthorizedDeleteSubject } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'SCHEMA_REGISTRY',
                permission:
                    SubjectPermissions.SUBJECT_PERMISSIONS.DELETE_SUBJECT,
            },
        ],
    });
    const { isAuthorized: isAuthorizedDeleteSubjectVersion } = useAuthorization(
        {
            requiredPermissions: [
                {
                    authorizationType: 'SCHEMA_REGISTRY',
                    permission:
                        SubjectPermissions.SUBJECT_PERMISSIONS
                            .DELETE_SUBJECT_VERSION,
                },
            ],
        },
    );
    const { isAuthorized: isAuthorizedUpdateSubjectCompatibility } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'SCHEMA_REGISTRY',
                    permission:
                        SubjectPermissions.SUBJECT_PERMISSIONS
                            .UPDATE_SUBJECT_COMPATIBILITY,
                },
            ],
        });
    const { isAuthorized: isAuthorizedUpdateSubjectMode } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'SCHEMA_REGISTRY',
                permission:
                    SubjectPermissions.SUBJECT_PERMISSIONS.UPDATE_SUBJECT_MODE,
            },
        ],
    });
    const { isAuthorized: isAuthorizedCreateSubjectVersion } = useAuthorization(
        {
            requiredPermissions: [
                {
                    authorizationType: 'SCHEMA_REGISTRY',
                    permission:
                        SubjectPermissions.SUBJECT_PERMISSIONS
                            .CREATE_SUBJECT_VERSION,
                },
            ],
        },
    );

    return (
        <SubjectDetailsHeaderComponent
            refreshPageContent={refreshPageContent}
            isRefreshPageContentPending={isGetSubjectDetailsPending}
            subjectDetails={subjectDetails}
            isAuthorizedDeleteSubject={isAuthorizedDeleteSubject}
            isAuthorizedDeleteSubjectVersion={isAuthorizedDeleteSubjectVersion}
            isAuthorizedUpdateSubjectCompatibility={
                isAuthorizedUpdateSubjectCompatibility
            }
            isAuthorizedUpdateSubjectMode={isAuthorizedUpdateSubjectMode}
            isAuthorizedCreateSubjectVersion={isAuthorizedCreateSubjectVersion}
        />
    );
};

export default SubjectDetailsHeader;
