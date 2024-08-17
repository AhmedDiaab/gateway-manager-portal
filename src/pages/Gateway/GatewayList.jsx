import React, { useState } from 'react';
import { useGateways } from '../../hooks/Gateway/listGateways';
import { Link } from 'react-router-dom';
import styles from './GatewayList.module.css';

const GatewayListPage = () => {
    const [page, setPage] = useState(1);
    const limit = 10; // Number of items per page
    const { data: gateways, isLoading, isError, error } = useGateways(page, limit);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    const handleNextPage = () => setPage((prev) => prev + 1);
    const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Gateways List</h1>
            <Link to="/gateways/add" className={styles.addButton}>Add New Gateway</Link>
            <ul className={styles.list}>
                {gateways.gateways.map((gateway) => (
                    <li key={gateway.serial} className={styles.item}>
                        <p><strong>Name:</strong> {gateway.name}</p>
                        <p><strong>Serial:</strong> {gateway.serial}</p>
                        <p><strong>Address:</strong> {gateway.address}</p>
                    </li>
                ))}
            </ul>
            <div className={styles.pagination}>
                <button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    className={styles.pageButton}
                >
                    Previous
                </button>
                <span>Page {page}</span>
                <button
                    onClick={handleNextPage}
                    className={styles.pageButton}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default GatewayListPage;
