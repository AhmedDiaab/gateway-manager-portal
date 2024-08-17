import React from 'react';
import { useGateways } from '../../hooks/Gateway/listGateways';
import { Link } from 'react-router-dom';
import styles from './GatewayList.module.css';

const GatewayListPage = () => {
    const { data: gateways, isLoading, isError, error } = useGateways();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

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
        </div>
    );
};

export default GatewayListPage;
