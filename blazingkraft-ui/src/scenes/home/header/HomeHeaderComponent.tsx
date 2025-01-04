import { Text } from '@mantine/core';
import CommonStyles from 'common/styles/CommonStyles';
import useCommonMediaQuery from 'scenes/common/media/useCommonMediaQuery';

function fontSize(isSmall, isMedium) {
    if (isSmall) {
        return 40;
    }
    if (isMedium) {
        return 80;
    }
    return 110;
}

function HomeHeaderComponent() {
    const isSmall = useCommonMediaQuery({
        query: `(max-width: ${CommonStyles.SMALL_END})`,
    });
    const isMedium = useCommonMediaQuery({
        query: `(max-width: ${CommonStyles.MEDIUM_END})`,
    });
    return (
        <div className="flex justify-center pt-8">
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
                Blazing KRaft
            </Text>
        </div>
    );
}

export default HomeHeaderComponent;
