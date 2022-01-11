import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {filterType} from "../App";

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
}

export const TodoList = (props:propsType) => {

    const [title, setTitle]= useState('')

    const addTaskHandler = ()=>{
        props.addTask(title)
        setTitle('')
    }

    const removeTaskHandler = (mId:string) => {
      props.removeTask(mId)
    }

    const onChangeTaskHandler = (e:ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
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

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeTaskHandler} onKeyPress={onKeyPressTaskHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(m=> {
                        return (
                            <li>
                                <input type="checkbox" checked={m.isDone}/>
                                <span>{m.title}</span>
                                <button onClick={()=>removeTaskHandler(m.id)}>X</button>
                            </li>

                        )
                    })
                }
            </ul>
            <div>
                <button onClick={()=> onClickFilterHandler('All')}>All</button>
                <button onClick={()=> onClickFilterHandler('Active')}>Active</button>
                <button onClick={()=> onClickFilterHandler('Completed')}>Completed</button>
            </div>
        </div>
    );
};

