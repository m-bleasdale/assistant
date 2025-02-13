'use client';

import { React, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Action from './Action';

import styles from './Action.module.css';

function ActionList () {
    const { actions, status, error } = useSelector((state) => state.chat);

    function InterpretActions(actions) {
        if (!actions) return;
        console.log(actions);
        const ActionSequences = actions.filter(action => action.length !== 0);
        
        let Actions = [];

        ActionSequences.forEach(sequence => {
            sequence.forEach(action => {
                Actions.push(action);
            });
        });

        console.log(Actions);
        return Actions;
    }

    InterpretActions(actions);

    return (
        <div className={styles.ActionList}>
            {InterpretActions(actions).map((action, index) =>                 
                <Action 
                    key={index} 
                    action={action}
                />
            )
            }
		</div>
    )

}

export default ActionList;

