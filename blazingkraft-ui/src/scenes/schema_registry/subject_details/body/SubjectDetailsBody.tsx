import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import SubjectDetailsBodyComponent from './SubjectDetailsBodyComponent';

const SubjectDetailsBody = () => {
    // Map State To Props
    const { subjectDetails } = useSelector((store: ReduxStore) => {
        return {
            subjectDetails: store.schemaRegistryReducer.subjectDetails,
        };
    }, shallowEqual);

    // Map Dispatch To Props

    return (
        <>
            {subjectDetails && (
                <SubjectDetailsBodyComponent subjectDetails={subjectDetails} />
            )}
        </>
    );
};

export default SubjectDetailsBody;
