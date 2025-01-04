import { useMediaQuery } from '@mantine/hooks';

interface useCommonMediaQueryProps {
    query: string;
    initialValue?: boolean;
    getInitialValueInEffect?: boolean;
}

function useCommonMediaQuery({
    query,
    getInitialValueInEffect,
    initialValue,
}: useCommonMediaQueryProps) {
    return useMediaQuery(query, window.matchMedia(query).matches, {
        getInitialValueInEffect: true,
    });
}

export default useCommonMediaQuery;
