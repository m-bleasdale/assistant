import { Suspense, React } from 'react';

import styles from './Login.module.css';

import { handleSignIn } from '@/lib/auth';

import LoadingPage from '../LoadingPage/LoadingPage';

function Login () {
    return (
        <Suspense fallback={<LoadingPage />}>
            <div className={styles.Login}>
                <h1>Assistant</h1>
                <button onClick={handleSignIn}>Sign In With Google</button>
            </div>
        </Suspense>
    )

}

export default Login;