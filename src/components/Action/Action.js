import { React } from 'react';

import styles from './Action.module.css';

function Action (action) {
    
    function GetActionType(){
        const prefix = String(action.action.type).charAt(0).toUpperCase() + String(action.action.type).slice(1);
        return `${prefix} ${action.action.scope}`;
    }

    return (
        <div className={styles.Action} id={styles[action.action.type]}>
            <p>{GetActionType()}</p>
            <p>{action.action.content.name}</p>
            <div className={styles.ActionTimes}>
                <p>{action.action.content.start_datetime}</p>
                <p>{action.action.content.end_datetime}</p>

            </div>
		</div>
    )

}

export default Action;
