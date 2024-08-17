import React from 'react';
import { Spinner } from '@shadcn/ui'; // Import Spinner from ShadCN UI
import styles from './Loader.module.css'; // Create your own CSS module for styling

const Loader = () => {
    return (
        <div className={styles.loader}>
            <Spinner size={40} />
        </div>
    );
};

export default Loader;
