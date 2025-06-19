import { React } from 'react';

import styles from './Sidebar.module.css';

import { handleSignOut } from '@/lib/auth';

function SidebarLeft () {
    return (
        <div className={styles.Sidebar} id={styles.left}>
            <div className={styles.Top}>
                <button onClick={handleSignOut}>Sign Out</button>
                <h1 className={styles.SidebarTitle}>Schedule Assistant</h1>   
            </div>
            <p className={styles.Credit}>By M Bleasdale, 2025</p>
            <div className={styles.Links}>
                <a className={styles.GitHub} href="https://github.com/m-bleasdale/assistant/blob/main/README.md">View on Github</a>
            </div>
            <div className={styles.Text}>
                <p>This tool is designed to take a simple free text input and update a user's events and tasks.</p>
                    
                <p>
                    <strong>No account information is stored anywhere.</strong> 
                    <br/><br/> 
                    A Google account is only needed to access Google Calendar and Tasks
                </p>
            </div>         
            
		</div>
    )

}

export default SidebarLeft;
