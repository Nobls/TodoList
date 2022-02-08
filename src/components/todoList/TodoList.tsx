import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "../../App";
import styles from './todoList.module.css'
import AddItemForm from "../addItemForm/AddItemForm";
import EditableSpan from "../editableSpan/EditableSpan";

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
    updateTask:(todoListID: string,id:string, title:string)=>void
    updateTodolist:(todolistID: string, title:string)=>void
}

export const TodoList = (props: propsType) => {

    const addTaskHandler = (title:string) => {
            props.addTask(props.todoListID, title)
    }

    const removeTaskHandler = (id: string) => {
        props.removeTask(props.todoListID, id)
    }

    const onClickFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(props.todoListID, value)
    }

    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        props.changeStatus(props.todoListID, id, e.currentTarget.checked)
    }
    
    const updateTaskHandler = (todoListID: string,id:string, title:string) => {
      props.updateTask(todoListID,id, title)
    }

    const updateTodolistHandler = (title:string) => {
      props.updateTodolist(props.todoListID,title)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callBack={updateTodolistHandler}/>
                <button onClick={() => props.removeTodolist(props.todoListID)}>X</button>
            </h3>
            <div>
                <AddItemForm callBack={addTaskHandler}/>
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
                                <EditableSpan title={m.title} callBack={(title)=>updateTaskHandler(props.todoListID, m.id, title)}/>
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

