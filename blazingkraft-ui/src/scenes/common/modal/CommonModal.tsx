import { Divider, Modal, ScrollArea, Title } from '@mantine/core';
import classNames from 'classnames';
import CommonStyles from 'common/styles/CommonStyles';
import LoadingSpinner from '../loading/LoadingSpinner';
import useCommonMediaQuery from '../media/useCommonMediaQuery';

interface CommonModalProps {
    modalTitle: any;
    modalBody: any;
    isOpen: boolean;
    onClose: any;
    centered?: boolean;
    modalFooter?: any;
    modalFooterHeight?: string;
    size?: string;
    modalClassName?: string;
    innerClassName?: string;
    autoClose?: boolean;
    isLoading?: boolean;
}

function CommonModal({
    modalTitle,
    isOpen,
    onClose,
    modalBody,
    modalFooter,
    modalClassName,
    innerClassName,
    centered,
    autoClose,
    isLoading,
}: CommonModalProps) {
    const isLarge = useCommonMediaQuery({
        query: `(min-width: ${CommonStyles.LARGE_START})`,
    });

    return (
        <Modal
            opened={isOpen}
            onClose={onClose}
            title={
                <div className="flex flex-col w-full">
                    <Title order={4}>{modalTitle}</Title>
                    <div className="w-full">
                        <Divider className="mt-3 w-full" />
                    </div>
                </div>
            }
            centered={centered}
            size={isLarge ? '68%' : '85%'}
            className={modalClassName}
            closeOnEscape={autoClose && !isLoading}
            closeOnClickOutside={autoClose && !isLoading}
            styles={{
                inner: {
                    paddingLeft: '0px !important',
                },
                content: { padding: '0px !important' },
                header: {
                    paddingLeft: '20px',
                    paddingTop: '15px',
                    paddingRight: '20px',
                    zIndex: 201,
                },
                title: {
                    width: '100%',
                },
            }}
            transitionProps={{
                transition: 'pop',
                duration: 100,
                timingFunction: 'ease',
            }}
            keepMounted
            scrollAreaComponent={ScrollArea.Autosize}
        >
            <>
                <div className={classNames('px-2 break-words', innerClassName)}>
                    {modalBody}
                </div>
                {modalFooter && (
                    <div className="pt-4">
                        <div className="px-2">
                            <Divider className="pb-4" />
                        </div>

                        <div className="px-4">{modalFooter}</div>
                    </div>
                )}
                <LoadingSpinner isLoading={isLoading} />
            </>
        </Modal>
    );
}

CommonModal.defaultProps = {
    size: '50%',
    centered: false,
    autoClose: true,
    isLoading: false,
    modalFooterHeight: '2.7rem',
};

export default CommonModal;
