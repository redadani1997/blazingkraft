import { Skeleton } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { useEffect, useMemo, useRef } from 'react';

interface CommonInfiniteScrollProps {
    fetchNextPage: () => void;
    isLoading: boolean;
    hasMore: boolean;
    children: React.ReactNode[];
    loader?: React.ReactNode;
}

function CommonInfiniteScroll({
    children,
    fetchNextPage,
    hasMore,
    isLoading,
    loader,
}: CommonInfiniteScrollProps) {
    const containerRef = useRef();
    const { ref, entry } = useIntersection({
        root: containerRef.current,
        threshold: 0.1,
    });
    const numberOfChildren = useMemo(() => children.length, [children.length]);

    function putRef(index) {
        if (index === numberOfChildren - 1) {
            return ref;
        }
    }
    const isIntersecting = useMemo(
        () => entry?.isIntersecting,
        [entry?.isIntersecting],
    );

    useEffect(() => {
        if (isIntersecting && hasMore && !isLoading) {
            fetchNextPage();
        }
    }, [isIntersecting]);

    return (
        <>
            {children.map((child, index) => {
                return (
                    <div key={index} ref={putRef(index)}>
                        {child}
                    </div>
                );
            })}
            {isLoading &&
                (loader || (
                    <>
                        <Skeleton height="2.5rem" mt={6} radius="sm" />
                        <Skeleton height="2.5rem" mt={6} radius="sm" />
                        <Skeleton height="2.5rem" mt={6} radius="sm" />
                    </>
                ))}
        </>
    );
}

export default CommonInfiniteScroll;
