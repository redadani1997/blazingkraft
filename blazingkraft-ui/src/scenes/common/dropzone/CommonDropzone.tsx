import { Group, Text, rem, useMantineTheme } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { BiImport } from 'react-icons/bi';
import { TbX } from 'react-icons/tb';

interface CommonDropzoneProps {
    onDrop: (file: FileWithPath) => void;
    droppedFile: FileWithPath | null;
    acceptedFiles: string[];
    title: string;
}

function CommonDropzone({
    onDrop,
    droppedFile,
    acceptedFiles,
    title,
}: CommonDropzoneProps) {
    const theme = useMantineTheme();
    return (
        <Dropzone
            onDrop={files => {
                if (files && files.length > 0) {
                    onDrop(files[0]);
                }
            }}
            accept={acceptedFiles}
            maxFiles={1}
        >
            <Group
                position="center"
                spacing="xl"
                style={{ minHeight: rem(120), pointerEvents: 'none' }}
            >
                <Dropzone.Accept>
                    <BiImport
                        size="3.2rem"
                        color={
                            theme.colors[theme.primaryColor][
                                theme.colorScheme === 'dark' ? 4 : 6
                            ]
                        }
                    />
                </Dropzone.Accept>
                <Dropzone.Reject>
                    <TbX
                        size="3.2rem"
                        color={
                            theme.colors.red[
                                theme.colorScheme === 'dark' ? 4 : 6
                            ]
                        }
                    />
                </Dropzone.Reject>
                <Dropzone.Idle>
                    <BiImport size="3.2rem" />
                </Dropzone.Idle>

                <div>
                    <Text size="lg" inline>
                        {title}
                    </Text>
                    <Text size="sm" color="dimmed" inline mt={7}>
                        {droppedFile ? droppedFile.name : 'No Selected File'}
                    </Text>
                </div>
            </Group>
        </Dropzone>
    );
}

export default CommonDropzone;
