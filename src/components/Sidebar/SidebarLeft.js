'use client';

import { React } from 'react';

import { useUser } from '@auth0/nextjs-auth0/client';

import styles from './Sidebar.module.css';

function SidebarLeft () {
    const { user, error, isLoading } = useUser();

    function Title () {
        if (isLoading) return "Loading...";
        if (error) return "error.message";
        
        if (user) return user.name;
    }

    return (
        <div className={styles.Sidebar} id={styles.left}>
            <h1 className={styles.SidebarTitle}>{Title()}</h1>
            <a href='/api/auth/login'>Log In</a>
            <a href='/api/auth/logout'>Log Out</a>
		</div>
    )

}

export default SidebarLeft;
