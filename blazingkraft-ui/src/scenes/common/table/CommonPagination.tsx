import { Pagination, useMantineTheme } from '@mantine/core';
import { CommonTableData } from '.';

function getNumOfPages(totalElements: number, perPage: number | undefined) {
    if (!perPage || totalElements === 0) {
        return 1;
    }
    return Math.ceil(totalElements / perPage);
}

interface CommonPaginationProps {
    totalElements: number;
    perPage: number | undefined;
    handlePageChange: Function;
    data: CommonTableData[];
    currentPage: number;
}

const CommonPagination = ({
    handlePageChange,
    perPage,
    totalElements,
    currentPage,
}: CommonPaginationProps) => {
    const theme = useMantineTheme();
    const numOfPages = getNumOfPages(totalElements, perPage);

    return (
        <div
            className="flex items-center p-4 justify-end"
            style={{
                borderLeft: '0px',
                borderRight: '0px',
                borderTop: '1px',
                borderBottom: '0px',
                borderStyle: 'solid',
                borderColor:
                    theme.colorScheme === 'dark'
                        ? theme.colors.dark[3]
                        : theme.colors.gray[4],
            }}
        >
            <Pagination
                total={numOfPages}
                radius="md"
                withEdges
                value={currentPage}
                onChange={newPage => handlePageChange(newPage)}
            />
        </div>
    );
};

export default CommonPagination;
