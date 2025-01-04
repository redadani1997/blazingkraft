import { Grid } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useMemo, useState } from 'react';
import CommonNumberInput from 'scenes/common/input/CommonNumberInput';
import CommonTextInput from 'scenes/common/input/CommonTextInput';

const ConversionsBytesComponent = () => {
    const [bytes, setBytes] = useState<number | ''>(10000000);

    const beautifiedBytes = useMemo(
        () => CommonUtils.beautifyBytes(bytes),
        [bytes],
    );

    return (
        <Grid className="">
            <Grid.Col span={12} md={6} lg={4}>
                <CommonNumberInput
                    label="Bytes"
                    value={bytes}
                    onChange={value => setBytes(value)}
                    placeholder="Enter bytes"
                />
            </Grid.Col>
            <Grid.Col span={12} md={6} lg={4}>
                <CommonTextInput
                    label="Beautified Bytes"
                    value={beautifiedBytes}
                    placeholder="Beautified bytes"
                    onChange={() => {
                        // no-op
                    }}
                />
            </Grid.Col>
        </Grid>
    );
};

export default ConversionsBytesComponent;
