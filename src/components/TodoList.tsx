import React from 'react';
import {filterType} from "../App";

type inPropsType={
    id: number,
    title: string,
    isDone: boolean
}

type propsType ={
    title: string
    tasks: Array<inPropsType>
    removeTask:(mId:number)=>void
    setFilter:(value:filterType)=>void
}

export const TodoList = (props:propsType) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(m=> {
                        return (
                            <li>
                                <input type="checkbox" checked={m.isDone}/>
                                <span>{m.title}</span>
                                <button onClick={()=>props.removeTask(m.id)}></button>
                            </li>

                        )
                    })
                }
            </ul>
            <div>
                <button onClick={()=> props.setFilter('All')}>All</button>
                <button onClick={()=> props.setFilter('Active')}>Active</button>
                <button onClick={()=> props.setFilter('Completed')}>Completed</button>
            </div>
        </div>
    );
};

