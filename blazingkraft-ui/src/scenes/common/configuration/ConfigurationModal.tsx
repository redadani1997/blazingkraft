import { Grid, Text } from '@mantine/core';
import classNames from 'classnames';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { KafkaConfiguration } from 'kafka/index';
import CommonCardDetails from '../card_details/CommonCardDetails';
import CommonCode from '../code/CommonCode';
import CommonModal from '../modal/CommonModal';

function renderAttribute(label: string, value: any, capitalize = false) {
    return (
        <Grid.Col span={12} sm={6} md={4} xl={3}>
            <CommonCardDetails
                title={label}
                content={
                    <Text
                        className={classNames('italic', {
                            capitalize: capitalize,
                        })}
                    >
                        {value}
                    </Text>
                }
                copyText={value}
            />
        </Grid.Col>
    );
}
function renderTruthyAttribute(label: string, value: any, capitalize = false) {
    if (CommonValidationUtils.isFalsy(value)) return <></>;
    return renderAttribute(label, value, capitalize);
}

function renderTruthyArrayAttribute(label: string, value: any) {
    if (CommonValidationUtils.isFalsyArray(value)) return <></>;
    return renderAttribute(label, value.join(', '));
}

const ConfigurationModal = ({
    opened,
    setOpened,
    configuration,
}: {
    opened: boolean;
    setOpened: Function;
    configuration: KafkaConfiguration;
}) => {
    return (
        configuration && (
            <CommonModal
                modalTitle={
                    <CommonCode className="text-base">
                        {configuration.displayedName}
                    </CommonCode>
                }
                isOpen={opened}
                onClose={() => setOpened(false)}
                modalBody={
                    <div className="flex flex-col">
                        {configuration.documentation}
                        <Grid className="pt-5">
                            {renderTruthyAttribute('Name', configuration.name)}
                            {renderTruthyAttribute(
                                'Type',
                                configuration.type.toLocaleLowerCase(),
                                true,
                            )}
                            {renderTruthyAttribute(
                                'Default Value',
                                configuration.displayedDefault,
                            )}
                            {renderTruthyAttribute(
                                'Valid Values',
                                configuration.validValues,
                            )}
                            {renderAttribute(
                                'Importance',
                                configuration.importance.toLocaleLowerCase(),
                                true,
                            )}
                            {renderTruthyAttribute(
                                'Group',
                                configuration.group,
                            )}
                            {renderTruthyArrayAttribute(
                                'Dependents',
                                configuration.dependents,
                            )}
                            {renderTruthyAttribute(
                                'Order',
                                configuration.order,
                                true,
                            )}
                            {renderTruthyAttribute(
                                'Order In Group',
                                configuration.orderInGroup,
                                true,
                            )}
                            {renderTruthyAttribute(
                                'Read Only',
                                configuration.readOnly ? 'Yes' : 'No',
                            )}
                            {renderTruthyAttribute(
                                'Sensitive',
                                configuration.sensitive ? 'Yes' : 'No',
                            )}
                            {renderTruthyAttribute(
                                'Source',
                                configuration.source,
                                true,
                            )}
                        </Grid>

                        {configuration.documentationProps}
                    </div>
                }
            />
        )
    );
};

export default ConfigurationModal;
