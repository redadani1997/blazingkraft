import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import dataMaskingActions from '../redux/actions';
import AllDataMaskingsComponent from './AllDataMaskingsComponent';

const AllDataMaskings = () => {
    useDocumentTitle('Blazing KRaft - Data Maskings');

    // Map State To Props

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const refreshPageContent = () =>
        dispatch(dataMaskingActions.getAllDataMaskings());

    useEffect(() => {
        refreshPageContent();
    }, []);

    return <AllDataMaskingsComponent refreshPageContent={refreshPageContent} />;
};

export default AllDataMaskings;
