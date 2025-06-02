import { React } from 'react';
import Markdown from 'markdown-to-jsx';

import styles from './Chat.module.css';

function Message ({role, children}) {

    return (
        <div className={styles.MessageContainer} id={styles[role]}>
            <div className={styles.Message}>
                {role === "model" && (
                    <Markdown className={styles.MessageContent}>{children}</Markdown>
                )}
                {role === "user" && (
                    <p className={styles.MessageContent}>{children}</p>
                )}
            </div>
        </div>
    )

}

export default Message;