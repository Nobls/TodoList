import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "../../App";
import styles from './todoList.module.css'

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type propsType = {
    title: string
    todoListID: string
    tasks: Array<TaskType>
    removeTask: (todoListID: string, id: string) => void
    addTask: (todoListID: string, title: string) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    changeStatus: (todoListID: string, idCheckBox: string, isDoneCheckBox: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
}

export const TodoList = (props: propsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)

    const addTaskHandler = () => {
        if (title.trim() === '') {
            setTitle('')
            setError(true)
        } else {
            props.addTask(props.todoListID, title)
            setTitle('')
        }
    }

    const removeTaskHandler = (id: string) => {
        props.removeTask(props.todoListID, id)
    }

    const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
            setTitle('')
        }
    }

    const onClickFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(props.todoListID, value)
    }

    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        props.changeStatus(props.todoListID, id, e.currentTarget.checked)
    }

    return (
        <div>
            <h3>{props.title}
                <button onClick={() => props.removeTodolist(props.todoListID)}>X</button>
            </h3>
            <div>
                <input value={title}
                       onChange={onChangeTaskHandler}
                       onKeyPress={onKeyPressTaskHandler}
                       className={error ? styles.error : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={styles.errorMessage}>Title is required</div>}
            </div>
            <ul>
                {
                    props.tasks.map(m => {
                        return (
                            <li key={m.id}>
                                <input type="checkbox"
                                       checked={m.isDone}
                                       onChange={(e) => changeStatusHandler(e, m.id)}
                                />
                                <span className={m.isDone ? styles.isDone : ''}>{m.title}</span>
                                <button onClick={() => removeTaskHandler(m.id)}>X</button>
                            </li>

                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'All' ? styles.activeFilter : ''}
                        onClick={() => onClickFilterHandler('All')}>All
                </button>
                <button className={props.filter === 'Active' ? styles.activeFilter : ''}
                        onClick={() => onClickFilterHandler('Active')}>Active
                </button>
                <button className={props.filter === 'Completed' ? styles.activeFilter : ''}
                        onClick={() => onClickFilterHandler('Completed')}>Completed
                </button>
            </div>
        </div>
    );
};

