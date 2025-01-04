import { Alert, Paper, Text } from '@mantine/core';
import classNames from 'classnames';
import CommonStyles from 'common/styles/CommonStyles';
import { CommonDesktopUtils } from 'common/utils/CommonDesktopUtils';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import CommonLoader from 'scenes/common/loading/CommonLoader';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import useCommonMediaQuery from 'scenes/common/media/useCommonMediaQuery';
import CommonScrollArea from 'scenes/common/scroll_area/CommonScrollArea';
import { BlazingKraftProperties } from 'scenes/settings/redux';
import UnRestrictedHeader from './header/UnRestrictedHeader';
import CommonRoutes from './routes/CommonRoutes';

interface MainComponentProps {
    isGetPropertiesPending: boolean;
    properties: BlazingKraftProperties;
    retryCount: number;
    errorMessage: string;
}

function computeFontSize(isSmall, isMedium) {
    if (isSmall) {
        return 25;
    }
    if (isMedium) {
        return 27;
    }
    return 32;
}

function computeWidth(isSmall, isMedium) {
    if (isSmall) {
        return 'w-full mx-2';
    }
    if (isMedium) {
        return 'w-2/3';
    }
    return 'w-1/2';
}

function renderMainBody(
    isGetPropertiesPending: boolean,
    properties: BlazingKraftProperties,
    retryCount: number,
    isSmall,
    isMedium,
) {
    if (isGetPropertiesPending) {
        if (retryCount === 0) {
            return <LoadingSpinner isLoading />;
        } else if (retryCount < 14) {
            return (
                <div className="h-full w-full flex flex-col">
                    <div className="h-16 w-full">
                        <UnRestrictedHeader />
                    </div>
                    <CommonScrollArea className="w-full h-full">
                        <div className="w-full h-full flex items-center justify-center">
                            <div
                                className={classNames(
                                    'h-1/2',
                                    computeWidth(isSmall, isMedium),
                                )}
                            >
                                <Alert radius="md">
                                    <div className="flex flex-col items-center">
                                        <Text
                                            fz={computeFontSize(
                                                isSmall,
                                                isMedium,
                                            )}
                                            className="text-center"
                                        >
                                            Initializing Blazing KRaft, thanks
                                            for waiting...
                                        </Text>

                                        <CommonLoader
                                            className="pt-5"
                                            type="bars"
                                            loaderSize="lg"
                                        />
                                    </div>
                                </Alert>
                            </div>
                        </div>
                    </CommonScrollArea>
                </div>
            );
        }
        return (
            <div className="h-full w-full flex flex-col">
                <div className="h-16 w-full">
                    <UnRestrictedHeader />
                </div>
                <CommonScrollArea className="w-full h-full">
                    <div className="w-full h-full flex items-center justify-center">
                        <div
                            className={classNames(
                                'h-1/2',
                                computeWidth(isSmall, isMedium),
                            )}
                        >
                            <Alert radius="md" color="red">
                                <div className="flex flex-col items-center">
                                    <Text
                                        fz={computeFontSize(isSmall, isMedium)}
                                        className="text-center"
                                    >
                                        Initializing Blazing KRaft, thanks for
                                        waiting...
                                    </Text>
                                    <Text className="text-center italic pt-2">
                                        It seems like its taking longer than
                                        usual. If the application fails to
                                        initialize, verify the Blazing KRaft
                                        Server logs and rerun the application.
                                    </Text>

                                    <CommonLoader
                                        className="pt-5"
                                        type="bars"
                                        loaderSize="lg"
                                        color="red"
                                    />
                                </div>
                            </Alert>
                        </div>
                    </div>
                </CommonScrollArea>
            </div>
        );
    } else if (CommonValidationUtils.isFalsy(properties)) {
        return (
            <div className="h-full w-full flex flex-col">
                <div className="h-16 w-full">
                    <UnRestrictedHeader />
                </div>
                <Text className="p-4">
                    An error occured when loading the Blazing KRaft Properties.
                    Please check the Blazing KRaft Server and refresh the page.
                </Text>
            </div>
        );
    } else {
        if (CommonDesktopUtils.isWeb()) {
            return (
                <BrowserRouter>
                    <CommonRoutes />
                </BrowserRouter>
            );
        } else {
            return (
                <HashRouter>
                    <CommonRoutes />
                </HashRouter>
            );
        }
    }
}

const MainComponent = ({
    isGetPropertiesPending,
    properties,
    retryCount,
}: MainComponentProps) => {
    const isSmall = useCommonMediaQuery({
        query: `(max-width: ${CommonStyles.SMALL_END})`,
    });
    const isMedium = useCommonMediaQuery({
        query: `(max-width: ${CommonStyles.MEDIUM_END})`,
    });
    return (
        <Paper className="h-full rounded-none">
            {renderMainBody(
                isGetPropertiesPending,
                properties,
                retryCount,
                isSmall,
                isMedium,
            )}
        </Paper>
    );
};

export default MainComponent;
