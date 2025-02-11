import { React } from 'react';
import Markdown from 'markdown-to-jsx';

import styles from './Chat.module.css';

function Message ({role, children}) {

    return (
        <div className={styles.MessageContainer} id={styles[role]}>
            <div className={styles.Message}>
                <Markdown className={styles.MessageContent}>{children}</Markdown>
            </div>
        </div>
    )

}

export default Message;