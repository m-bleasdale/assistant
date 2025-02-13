import { React } from 'react';

import styles from './Sidebar.module.css';

function SidebarLeft () {
    return (
        <div className={styles.Sidebar} id={styles.left}>
            <h1 className={styles.SidebarTitle}>Schedule</h1>
            <a href='/api/auth/login'>Log In</a>
            <a href='/api/auth/logout'>Log Out</a>
		</div>
    )

}

export default SidebarLeft;
