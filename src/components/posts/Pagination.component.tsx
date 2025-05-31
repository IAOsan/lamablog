'use client';

import { Button } from "react-bootstrap";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

function Pagination({ totalPages, currentPage }: { totalPages: number, currentPage: number }): React.JSX.Element {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    function handlePagination(page: number): void {
        const params = new URLSearchParams(searchParams);

        if (page) {
            params.set('page', page.toString());
        } else {
            params.delete('page');
        }

        router.replace(`${pathname}?${params.toString()}`);
    }

    return <div className='d-flex justify-content-between pt-5'>
        <Button onClick={() => {
            handlePagination(currentPage - 1)
        }} variant='danger' disabled={currentPage === 1} type="button">
            Previous
        </Button>
        <Button onClick={() => {
            handlePagination(currentPage + 1)
        }} variant='danger' disabled={currentPage === totalPages} type="button">
            Next
        </Button>
    </div>
}

export default Pagination;