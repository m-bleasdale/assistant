import { React } from 'react';

import styles from './Login.module.css';

import { handleSignIn } from '@/lib/auth';

function Login () {
    return (
        <div className={styles.Login}>
            <h1>Assistant</h1>
            <button onClick={handleSignIn}>Sign In With Google</button>
		</div>
    )

}

export default Login;