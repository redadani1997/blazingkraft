import { Anchor, SimpleGrid } from '@mantine/core';
import { SubjectDescription, SubjectMeta } from 'common/types/schema_registry';
import {
    SCHEMA_COMPATIBILITY_OPTIONS,
    SCHEMA_REGISTRY_MODE_OPTIONS,
    SCHEMA_TYPES_OPTIONS,
    schemaTypeLabelByType,
} from 'common/utils/SchemaRegistryUtils';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';

interface SubjectsBodyComponentProps {
    isGetSubjectsMetaPending: boolean;
    isGetSubjectsDescriptionPending: boolean;
    subjectsDescription: Map<string, SubjectDescription>;
    subjectsMeta: SubjectMeta[];
}

function getColumns(): CommonTableColumn[] {
    return [
        {
            id: 'subject',
            label: 'Subject',
            filterable: true,
            sortable: true,
            minWidth: '14rem',
            width: '30%',
        },
        {
            id: 'latestSchemaType',
            label: 'Type',
            filterable: true,
            sortable: true,
            customOptions: SCHEMA_TYPES_OPTIONS,
            minWidth: '10rem',
            width: '20%',
        },
        {
            id: 'latestSchemaVersion',
            label: 'Version',
            filterable: true,
            sortable: true,
            minWidth: '8rem',
            width: '10%',
        },
        {
            id: 'compatibility',
            label: 'Compatibility',
            filterable: true,
            sortable: true,
            customOptions: SCHEMA_COMPATIBILITY_OPTIONS,
            minWidth: '10rem',
            width: '20%',
        },
        {
            id: 'mode',
            label: 'Mode',
            filterable: true,
            sortable: true,
            customOptions: SCHEMA_REGISTRY_MODE_OPTIONS,
            minWidth: '10rem',
            width: '20%',
        },
    ];
}

function getData(
    schemaRegistryCode,
    subjectsMeta: SubjectMeta[],
    isGetSubjectsDescriptionPending: boolean,
    subjectsDescription: Map<string, SubjectDescription>,
): CommonTableData[] {
    return subjectsMeta.map(subjectMeta => {
        const subjectDescription = subjectsDescription.get(subjectMeta.subject);
        return {
            subject: {
                value: subjectMeta.subject,
                displayedValue: (
                    <Anchor
                        component={Link}
                        to={`/schema_registries/${schemaRegistryCode}/subjects/${subjectMeta.subject}/versions`}
                    >
                        {subjectMeta.subject}
                    </Anchor>
                ),
            },
            latestSchemaType: {
                value: subjectDescription?.latestSchemaType,
                displayedValue: schemaTypeLabelByType(
                    subjectDescription?.latestSchemaType,
                ),
                isLoading: isGetSubjectsDescriptionPending,
                isError: false,
                errorMessage: undefined,
            },
            latestSchemaVersion: {
                value: subjectDescription?.latestSchemaVersion,
                displayedValue: subjectDescription?.latestSchemaVersion,
                isLoading: isGetSubjectsDescriptionPending,
                isError: false,
                errorMessage: undefined,
            },
            compatibility: {
                value: subjectDescription?.compatibility,
                displayedValue: subjectDescription?.compatibility,
                isLoading: isGetSubjectsDescriptionPending,
                isError: false,
                errorMessage: undefined,
            },
            mode: {
                value: subjectDescription?.mode,
                displayedValue: subjectDescription?.mode,
                isLoading: isGetSubjectsDescriptionPending,
                isError: false,
                errorMessage: undefined,
            },
        };
    });
}

const SubjectsBodyComponent = ({
    isGetSubjectsDescriptionPending,
    isGetSubjectsMetaPending,
    subjectsDescription,
    subjectsMeta,
}: SubjectsBodyComponentProps) => {
    const { schemaRegistryCode } = useParams();
    const memoizedData = useMemo(
        () =>
            getData(
                schemaRegistryCode,
                subjectsMeta,
                isGetSubjectsDescriptionPending,
                subjectsDescription,
            ),
        [
            schemaRegistryCode,
            subjectsMeta,
            isGetSubjectsDescriptionPending,
            subjectsDescription,
        ],
    );
    return (
        <SimpleGrid cols={1} className="h-full w-full">
            <CommonClientTable
                filterType="menu"
                columns={getColumns()}
                data={memoizedData}
                withPaging
                withTopFilter
                totalElements={subjectsMeta.length}
                perPage={15}
                isLoading={isGetSubjectsMetaPending}
                paperClassName="h-full w-full"
                // tableClassName="h-full w-full"
            />
        </SimpleGrid>
    );
};

export default SubjectsBodyComponent;
