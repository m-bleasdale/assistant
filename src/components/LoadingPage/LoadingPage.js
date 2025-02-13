import {React, useEffect} from 'react';

import styles from './LoadingPage.module.css';

function LoadingPage () {

    useEffect(() => {
        import("ldrs/trefoil");
    }, []);

    return (
        <div className={styles.LoadingPage}>
            <l-trefoil
            size="80"
            stroke="6"
            stroke-length="0.15"
            bg-opacity="0.1"
            speed="2"
            color="#597ef7" 
            ></l-trefoil>
		</div>
    )

}

export default LoadingPage;
