import { React } from 'react';

import styles from './Sidebar.module.css';

import { handleSignOut } from '@/lib/auth';

function SidebarLeft () {
    return (
        <div className={styles.Sidebar} id={styles.left}>
            <h1 className={styles.SidebarTitle}>Schedule</h1>
            <button onClick={handleSignOut}>Sign Out</button>
		</div>
    )

}

export default SidebarLeft;
