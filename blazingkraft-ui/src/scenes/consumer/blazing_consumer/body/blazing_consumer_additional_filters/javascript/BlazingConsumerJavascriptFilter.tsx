import { Alert, Checkbox, Text } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { TbAlertCircle, TbAlertTriangle } from 'react-icons/tb';
import CommonEditor from 'scenes/common/editor/CommonEditor';
import CommonEditorWrapper from 'scenes/common/editor/CommonEditorWrapper';
import CommonSchemaEditorErrors from 'scenes/common/schema_editor/editor/CommonSchemaEditorErrors';
import CommonTabs, { CommonTabsItemProps } from 'scenes/common/tabs/CommonTabs';
import { JavascriptFilter } from '../../blazing_consumer_filter/BlazingConsumerFilterComponent';
import { BlazingConsumerJavascriptUtils } from './BlazingConsumerJavascriptUtils';

interface BlazingConsumerJavascriptFilterProps {
    setJavascriptFilter: (additionalFilters: JavascriptFilter) => void;
    javascriptFilter: JavascriptFilter;
    javascriptTabValue;
    setJavascriptTabValue;
}

function renderDocs(
    javascriptFilter: JavascriptFilter,
    setJavascriptFilter: (javascriptFilter: JavascriptFilter) => void,
) {
    const { disabled } = javascriptFilter;
    return (
        <div className="flex flex-col">
            <Checkbox
                className="my-2"
                checked={disabled}
                onChange={() =>
                    setJavascriptFilter({
                        ...javascriptFilter,
                        disabled: !disabled,
                    })
                }
                label="Disabled"
            />
            <Alert icon={<TbAlertCircle size={20} />} title="Info" color="blue">
                <Text>
                    * The Javascript filter is disabled by default. To enable
                    it, you must check the "Disabled" checkbox.
                </Text>
                <Text>
                    * The reason behind this decision is that the filter is
                    executed on the server side on a graalvm sandbox env, which
                    may take more time than expected.
                </Text>
                <Text>
                    * The doFilter function arguments are documented as
                    Typescript types.
                </Text>
            </Alert>
            <Alert
                className="mt-2"
                icon={<TbAlertTriangle size="1.4rem" />}
                title="Beware"
                color="lime"
            >
                <Text>
                    * You should not change the doFilter function signature,
                    only the body.
                </Text>
                <Text>
                    * If the doFilter implementation results in a runtime error,
                    the record will be ignored.
                </Text>
                <Text>
                    * If the Javascript filter is enabled and there's a
                    deserialization error, the record will be ignored.
                </Text>
                <Text>
                    * Please don't write infinite loops xD, because it will
                    exhaust the Blazing KRaft resources. If you do do it make
                    sure you stop the consumer. (It will eventually be
                    terminated after 2 hours)
                </Text>
            </Alert>
        </div>
    );
}

function renderContent(
    javascriptFilter: JavascriptFilter,
    setJavascriptFilter: (javascriptFilter: JavascriptFilter) => void,
    editorErrors,
    setEditorErrors,
    jsContent,
    setJsContent,
) {
    const { disabled } = javascriptFilter;
    const handleEditorValidation = useCallback(markers => {
        const errorMessages = markers
            .filter(
                ({ message }) =>
                    message &&
                    !String(message).includes(
                        'is declared but its value is never read',
                    ),
            )
            .map(
                ({ startLineNumber, message }) =>
                    `Line ${startLineNumber}: ${message}`,
            );
        setEditorErrors(errorMessages);
    }, []);
    return (
        <CommonEditorWrapper>
            <CommonEditor
                content={jsContent}
                outerHeightStyle={!disabled ? '75%' : undefined}
                language={'javascript'}
                onContentChange={(value: string) => {
                    setJsContent(value);
                }}
                onValidate={handleEditorValidation}
                readOnly={disabled}
            />
            {!disabled && (
                <div className="h-1/4">
                    <CommonSchemaEditorErrors editorErrors={editorErrors} />
                </div>
            )}
        </CommonEditorWrapper>
    );
}

function renderExamples() {
    return (
        <CommonEditorWrapper>
            <CommonEditor
                content={BlazingConsumerJavascriptUtils.EXAMPLES}
                language={'typescript'}
                readOnly
            />
        </CommonEditorWrapper>
    );
}

function BlazingConsumerJavascriptFilter({
    javascriptFilter,
    setJavascriptFilter,
    javascriptTabValue,
    setJavascriptTabValue,
}: BlazingConsumerJavascriptFilterProps) {
    const [editorErrors, setEditorErrors] = useState([]);
    const [jsContent, setJsContent] = useState(javascriptFilter.content || '');

    useEffect(() => {
        setJavascriptFilter({
            ...javascriptFilter,
            content: jsContent,
        });
    }, [jsContent]);

    const items: CommonTabsItemProps[] = [
        {
            label: 'Docs',
            value: 'docs',
            children: renderDocs(javascriptFilter, setJavascriptFilter),
        },
        {
            label: 'Content',
            value: 'content',
            children: renderContent(
                javascriptFilter,
                setJavascriptFilter,
                editorErrors,
                setEditorErrors,
                jsContent,
                setJsContent,
            ),
        },
        {
            label: 'Examples',
            value: 'examples',
            children: renderExamples(),
        },
    ];

    return (
        <CommonTabs
            container={{
                variant: 'outline',
                defaultValue: javascriptTabValue,
                onTabChange: setJavascriptTabValue,
                value: javascriptTabValue,
            }}
            items={items}
        />
    );
}

export default BlazingConsumerJavascriptFilter;
