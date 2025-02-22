'use client';

import { React, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import Action from './Action';

import styles from './Action.module.css';

function ActionList () {
    const listRef = useRef(null);
    const { actions, status, error } = useSelector((state) => state.chat);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [actions]);

    if (actions.length === 0) return;

    function InterpretActions(actions) {
        const ActionSequences = actions.filter(action => action.length !== 0);
        
        let Actions = [];

        ActionSequences.forEach(sequence => {
            sequence.forEach(action => {
                Actions.push(action);
            });
        });

        return Actions;
    }

    InterpretActions(actions);

    return (
        <div ref={listRef} className={styles.ActionList}>
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

