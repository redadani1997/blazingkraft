import { LoadingOverlay } from '@mantine/core';
import CommonLoader from './CommonLoader';

interface LoadingSpinnerProps {
    isLoading: boolean;
    loaderSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

function LoadingSpinner({ isLoading, loaderSize }: LoadingSpinnerProps) {
    return (
        <LoadingOverlay
            visible={isLoading}
            loader={<CommonLoader loaderSize={loaderSize} />}
        />
    );
}

export default LoadingSpinner;
