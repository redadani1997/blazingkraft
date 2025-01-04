import {
    ActionIcon,
    Alert,
    Anchor,
    Button,
    Grid,
    Input,
    Loader,
    Table,
    Text,
    TextInput,
} from '@mantine/core';
import { SchemaReference, SubjectVersions } from 'common/types/schema_registry';
import { useEffect, useMemo, useState } from 'react';
import { TbAlertCircle, TbTrashX } from 'react-icons/tb';
import { useLocation } from 'react-router';
import CommonModal from 'scenes/common/modal/CommonModal';
import CommonSelect from 'scenes/common/select/CommonSelect';
import CommonTooltip from 'scenes/common/tooltip/CommonTooltip';

interface SchemaReferencesModalComponentProps {
    schemaReferences: SchemaReference[];
    setSchemaReferences: any;
    getSubjectsVersions: any;
    isGetSubjectsVersionsPending: boolean;
    subjectsVersions: SubjectVersions[];
}

function renderModalBody(
    schemaReferences: SchemaReference[],
    setSchemaReferences,
    subject,
    setSubject,
    version,
    setVersion,
    name,
    setName,
    subjectsOptions,
    subjectVersionsOptions,
    isGetSubjectsVersionsPending,
) {
    return (
        <div className="flex flex-col">
            <Alert icon={<TbAlertCircle size={16} />} title="Info" color="blue">
                <Text>A schema reference consists of the following:</Text>
                <Text>
                    * A name for the reference. (For Avro, the reference name is
                    the fully qualified schema name, for JSON Schema it is a
                    URL, and for Protobuf, it is the name of another Protobuf
                    file.)
                </Text>
                <Text>
                    * A subject, representing the subject under which the
                    referenced schema is registered.
                </Text>
                <Text>
                    * A version, representing the exact version of the schema
                    under the registered subject.
                </Text>
            </Alert>
            <Grid className="mt-4 mx-0">
                <Grid.Col span={5}>
                    <Input.Wrapper required label="Name">
                        <TextInput
                            placeholder="Name"
                            onChange={e => {
                                const name = e.target.value;
                                setName(name);
                            }}
                            error={!name}
                            value={name}
                        />
                    </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Input.Wrapper required label="Subject">
                        <CommonSelect
                            data={subjectsOptions}
                            onChange={value => setSubject(value)}
                            value={subject}
                            placeholder="Subject"
                            searchable
                            error={!subject}
                            icon={
                                isGetSubjectsVersionsPending ? (
                                    <Loader size="sm" />
                                ) : undefined
                            }
                            creatable
                        />
                    </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={2}>
                    <Input.Wrapper required label="Version">
                        <CommonSelect
                            data={subjectVersionsOptions}
                            onChange={value => setVersion(value)}
                            value={version}
                            placeholder="Version"
                            searchable
                            error={!version}
                            icon={
                                isGetSubjectsVersionsPending ? (
                                    <Loader size="sm" />
                                ) : undefined
                            }
                            creatable
                        />
                    </Input.Wrapper>
                </Grid.Col>
                <Grid.Col span={1} className="flex items-end">
                    <Button
                        disabled={!name || !version || !subject}
                        onClick={() => {
                            const lineIndex =
                                schemaReferences.length === 0
                                    ? 1
                                    : Math.max(
                                          ...schemaReferences.map(
                                              ref => ref.lineIndex,
                                          ),
                                      ) + 1;
                            setSchemaReferences([
                                ...schemaReferences,
                                {
                                    name,
                                    subject,
                                    version,
                                    lineIndex,
                                },
                            ]);
                        }}
                    >
                        Add
                    </Button>
                </Grid.Col>
            </Grid>
            {schemaReferences.length > 0 && (
                <div className="pt-4">
                    <Table verticalSpacing="sm">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Subject</th>
                                <th>Version</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {schemaReferences.map(ref => (
                                <tr key={ref.lineIndex}>
                                    <td>{ref.name}</td>
                                    <td>{ref.subject}</td>
                                    <td>{ref.version}</td>
                                    <td className="flex justify-end">
                                        <ActionIcon
                                            onClick={() => {
                                                setSchemaReferences(
                                                    schemaReferences.filter(
                                                        oldRef =>
                                                            oldRef.lineIndex !==
                                                            ref.lineIndex,
                                                    ),
                                                );
                                            }}
                                        >
                                            <TbTrashX />
                                        </ActionIcon>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}

            <Text className="pt-2" size="xs" color="dimmed">
                Props to Confluent for this intriguing documentation,
                <Anchor
                    className="pl-1"
                    size="xs"
                    href={`https://docs.confluent.io/platform/current/schema-registry/serdes-develop/index.html#schema-references`}
                    target="_blank"
                >
                    learn more here
                </Anchor>
            </Text>
        </div>
    );
}

function SchemaReferencesModalComponent({
    schemaReferences,
    setSchemaReferences,
    getSubjectsVersions,
    isGetSubjectsVersionsPending,
    subjectsVersions,
}: SchemaReferencesModalComponentProps) {
    const location = useLocation();
    const [isOpened, setIsOpened] = useState(false);
    const [subject, setSubject] = useState('');
    const [version, setVersion] = useState(undefined);
    const [name, setName] = useState('');
    const [subjectVersionsOptions, setSubjectVersionsOptions] = useState([]);
    const subjectsOptions = useMemo(() => {
        return subjectsVersions.map(subjet => ({
            label: subjet.subject,
            value: subjet.subject,
        }));
    }, [subjectsVersions]);
    useEffect(() => {
        let versions = [];
        if (!subject) {
            return;
        }
        const computed = subjectsVersions.find(s => s.subject === subject);
        if (!computed) {
            return;
        }
        versions = computed.versions.map(version => ({
            label: `Version ${version}`,
            value: version,
        }));
        setSubjectVersionsOptions(versions);
        setVersion('');
    }, [subjectsVersions, subject]);

    useEffect(() => {
        getSubjectsVersions();
    }, [location]);

    const modalBody = renderModalBody(
        schemaReferences,
        setSchemaReferences,
        subject,
        setSubject,
        version,
        setVersion,
        name,
        setName,
        subjectsOptions,
        subjectVersionsOptions,
        isGetSubjectsVersionsPending,
    );
    return (
        <>
            <CommonTooltip label="If your schema references other schemas click here to add them!">
                <Button
                    variant="outline"
                    color="cyan"
                    onClick={() => setIsOpened(!isOpened)}
                    className="w-full flex justify-center"
                >
                    {`Schema Rerences (${schemaReferences.length})`}
                </Button>
            </CommonTooltip>
            <CommonModal
                modalTitle="Schema References"
                isOpen={isOpened}
                onClose={() => setIsOpened(false)}
                modalBody={modalBody}
            />
        </>
    );
}

export default SchemaReferencesModalComponent;
