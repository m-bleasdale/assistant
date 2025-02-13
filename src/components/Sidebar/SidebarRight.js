import { React } from 'react';

import ActionList from '../Action/ActionList';

import styles from './Sidebar.module.css';

function SidebarRight () {
    return (
        <div className={styles.Sidebar} id={styles.right}>
            <ActionList />
		</div>
    )

}

export default SidebarRight;
