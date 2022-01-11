import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {filterType} from "../App";
import styles from '../modulesCSS/todoList.module.css'

type inPropsType={
    id: string,
    title: string,
    isDone: boolean
}

type propsType ={
    title: string
    tasks: Array<inPropsType>
    removeTask:(mId:string)=>void
    addTask:(title:string)=>void
    filterTasks:(value:filterType)=>void
    changeStatus:(id:string, isDone:boolean)=>void
    filter:filterType
}

export const TodoList = (props:propsType) => {

    const [title, setTitle]= useState('')
    const [error, setError] = useState(false)

    const addTaskHandler = ()=>{
        if (title.trim()===''){
            setTitle('')
            setError(true)
        }else{
            props.addTask(title)
            setTitle('')
        }
    }

    const removeTaskHandler = (mId:string) => {
      props.removeTask(mId)
    }

    const onChangeTaskHandler = (e:ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressTaskHandler = (e:KeyboardEvent<HTMLInputElement>) =>{
        if (e.key==='Enter'){
            addTaskHandler()
            setTitle('')
        }
    }

    const onClickFilterHandler = (value:filterType)=> {
        props.filterTasks(value)
    }

    const changeStatusHandler = (e:ChangeEvent<HTMLInputElement>, id:string) => {
      props.changeStatus(id,e.currentTarget.checked)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeTaskHandler}
                       onKeyPress={onKeyPressTaskHandler}
                       className={error ? styles.error : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error  && <div className={styles.errorMessage}>Title is required</div>}
            </div>
            <ul>
                {
                    props.tasks.map(m=> {
                        return (
                            <li>
                                <input type="checkbox"
                                       checked={m.isDone}
                                       onChange={(e)=>changeStatusHandler(e,m.id)}
                                />
                                <span className={m.isDone ? styles.isDone : ''}>{m.title}</span>
                                <button onClick={()=>removeTaskHandler(m.id)}>X</button>
                            </li>

                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'All' ? styles.activeFilter: ''} onClick={()=> onClickFilterHandler('All')}>All</button>
                <button className={props.filter === 'Active' ? styles.activeFilter: ''} onClick={()=> onClickFilterHandler('Active')}>Active</button>
                <button className={props.filter === 'Completed' ? styles.activeFilter: ''} onClick={()=> onClickFilterHandler('Completed')}>Completed</button>
            </div>
        </div>
    );
};

