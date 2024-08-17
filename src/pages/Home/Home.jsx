import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css'; // Import the CSS module

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Home Page</h1>
      <Link to="/todos" className={styles.link}>Go to Todos</Link>
    </div>
  );
};

export default HomePage;
