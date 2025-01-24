import { React } from 'react';

import styles from './Chat.module.css';

function Message ({role, children}) {

    return (
        <div className={styles.MessageContainer} id={styles[role]}>
            <div className={styles.Message}>
                <p className={styles.MessageContent}>{children}</p>
            </div>
        </div>
    )

}

export default Message;