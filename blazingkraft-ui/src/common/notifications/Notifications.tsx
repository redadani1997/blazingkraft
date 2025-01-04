import {
    hideNotification,
    showNotification,
    updateNotification,
} from '@mantine/notifications';
import { TbCheck, TbX } from 'react-icons/tb';
import { TiWarningOutline } from 'react-icons/ti';
import { v4 as uuid4 } from 'uuid';

const notifySuccess = ({
    title,
    message,
    id,
    autoClose,
}: {
    title: string;
    message: React.ReactNode;
    id?: string;
    autoClose?: number;
}) => {
    showNotification({
        id,
        title,
        message,
        autoClose: autoClose ?? 3000,
        color: 'green',
        icon: <TbCheck size={18} />,
    });
};

const notifyError = ({
    title,
    message,
    id,
    autoClose,
}: {
    title: string;
    message: React.ReactNode;
    id?: string;
    autoClose?: number;
}) => {
    showNotification({
        id,
        title,
        message,
        autoClose: autoClose ?? 60000,
        color: 'red',
        icon: <TbX size={18} />,
    });
};

const notifyLoading = ({
    title,
    message,
    id,
}: {
    title: string;
    message: React.ReactNode;
    id?: string;
}) => {
    const newId = id ? id : uuid4();
    showNotification({
        id: newId,
        title,
        message,
        autoClose: false,
        color: 'blue',
        loading: true,
        withCloseButton: false,
    });
    return newId;
};

const notifyUpdateToLoading = ({
    title,
    message,
    id,
}: {
    title: string;
    message: React.ReactNode;
    id: string;
}) => {
    updateNotification({
        id,
        title,
        message,
        autoClose: false,
        color: 'blue',
        loading: true,
        withCloseButton: false,
    });
};

const notifyUpdateToSuccess = ({
    title,
    message,
    id,
    autoClose,
}: {
    title: string;
    message: React.ReactNode;
    id: string;
    autoClose?: number;
}) => {
    updateNotification({
        id,
        title,
        message,
        autoClose: autoClose ?? 2000,
        color: 'green',
        icon: <TbCheck size={18} />,
    });
};

const notifyUpdateToError = ({
    title,
    message,
    id,
}: {
    title: string;
    message: React.ReactNode;
    id: string;
}) => {
    updateNotification({
        id,
        title,
        message,
        autoClose: false,
        color: 'red',
        icon: <TbX size={18} />,
    });
};

const notifyWarning = ({
    title,
    message,
    id,
}: {
    title: string;
    message: React.ReactNode;
    id?: string;
}) => {
    showNotification({
        id,
        title,
        message,
        autoClose: 60000,
        color: 'yellow',
        icon: <TiWarningOutline size={18} />,
    });
};

const removeNotification = ({ id }: { id: string }) => {
    hideNotification(id);
};

export {
    notifyError,
    notifyLoading,
    notifySuccess,
    notifyUpdateToError,
    notifyUpdateToLoading,
    notifyUpdateToSuccess,
    notifyWarning,
    removeNotification
};

