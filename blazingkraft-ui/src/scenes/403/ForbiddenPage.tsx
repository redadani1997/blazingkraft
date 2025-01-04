import { Text } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import CommonStyles from 'common/styles/CommonStyles';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useCommonMediaQuery from 'scenes/common/media/useCommonMediaQuery';
import routeActions from 'scenes/main/navbar/redux/actions';

function fontSize(isSmall, isMedium) {
    if (isSmall) {
        return 40;
    }
    if (isMedium) {
        return 80;
    }
    return 110;
}

function ForbiddenPage() {
    useDocumentTitle('Blazing KRaft - Forbidden');

    const isSmall = useCommonMediaQuery({
        query: `(max-width: ${CommonStyles.SMALL_END})`,
    });
    const isMedium = useCommonMediaQuery({
        query: `(max-width: ${CommonStyles.MEDIUM_END})`,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(routeActions.setActiveLink({ id: 'NOT_FOUND' }));
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="flex justify-center pt-1">
                <Text
                    variant="gradient"
                    gradient={{
                        from: 'violet',
                        to: 'yellow',
                        deg: 100,
                    }}
                    fw={1000}
                    fz={fontSize(isSmall, isMedium)}
                    className="text-center"
                >
                    403
                </Text>
            </div>
            <div className="flex justify-center pt-6">
                <Text
                    variant="gradient"
                    gradient={{
                        from: 'violet',
                        to: 'yellow',
                        deg: 100,
                    }}
                    fw={1000}
                    fz={fontSize(isSmall, isMedium)}
                    className="text-center"
                >
                    Forbidden
                </Text>
            </div>
        </div>
    );
}

export default ForbiddenPage;
