import { Loader, Text, ThemeIcon, useMantineTheme } from '@mantine/core';
import { TbAlertTriangle } from 'react-icons/tb';
import { CommonTableColumn, CommonTableData } from '.';
import CommonTooltip from '../tooltip/CommonTooltip';

interface CommonTableBodyProps {
    columns: CommonTableColumn[];
    data: CommonTableData[];
}

function renderNoAvailableData(theme) {
    return (
        <tr
            style={{
                backgroundColor:
                    theme.colorScheme === 'dark'
                        ? theme.colors.dark[4]
                        : theme.colors.gray[0],
            }}
        >
            <td>
                <Text weight={500} color="dimmed" className="">
                    <Text>No Available Data</Text>
                </Text>
            </td>
        </tr>
    );
}

function renderValue(row: CommonTableData, column: CommonTableColumn) {
    const value = row[column.id];
    if (!value) {
        return value;
    }
    if (value.isLoading) {
        return <Loader size="sm" />;
    }
    if (value.isError) {
        return (
            <CommonTooltip label={value.errorMessage}>
                <ThemeIcon variant="outline" color="red" className="w-full">
                    <TbAlertTriangle />
                </ThemeIcon>
            </CommonTooltip>
        );
    }
    return (
        <div className="h-full w-full break-all">
            {row[column.id].displayedValue}
        </div>
    );
}

function getKey(row: CommonTableData) {
    return Object.keys(row)
        .map(key => row[key].value)
        .join(' ; ');
    // return columns
    //     .map(column => `${column.id} : ${row[column.id]?.value}`)
    //     .join(' ; ');
}

const CommonTableBody = ({ data, columns }: CommonTableBodyProps) => {
    const theme = useMantineTheme();
    return (
        <tbody>
            {data.length > 0
                ? data.map(row => (
                      <tr key={getKey(row)}>
                          {columns.map((column, columnIndex) => (
                              <td
                                  key={column.id}
                                  style={{
                                      borderLeft:
                                          columnIndex === 0 ? '0px' : '1px',
                                      borderRight:
                                          columnIndex === columns.length - 1
                                              ? '0px'
                                              : '1px',
                                      borderTop: '0px',
                                      borderBottom: '1px',
                                      borderStyle: 'solid',
                                      borderColor:
                                          theme.colorScheme === 'dark'
                                              ? theme.colors.dark[3]
                                              : theme.colors.gray[4],
                                      width: column.width,
                                      minWidth: column.minWidth,
                                      maxWidth: column.maxWidth,
                                  }}
                                  className="py-3"
                              >
                                  <Text
                                      weight={500}
                                      className="flex items-center"
                                      style={{ minHeight: '2rem' }}
                                  >
                                      {renderValue(row, column)}
                                  </Text>
                              </td>
                          ))}
                      </tr>
                  ))
                : renderNoAvailableData(theme)}
        </tbody>
    );
};

export default CommonTableBody;
