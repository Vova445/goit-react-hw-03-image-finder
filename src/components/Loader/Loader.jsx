import React from 'react';
import { TailSpin } from 'react-loader-spinner';
import 'react-loader-spinner';
import styles from '../styles.module.css';
const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <TailSpin
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
};

export default Loader;
