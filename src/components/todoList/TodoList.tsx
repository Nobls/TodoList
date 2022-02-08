import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "../../App";
import AddItemForm from "../addItemForm/AddItemForm";
import EditableSpan from "../editableSpan/EditableSpan";
import {Button, Checkbox} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import {Delete} from "@mui/icons-material";

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

    /*const onClickFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(props.todoListID, value)
    }*/

    const onAllClickHandler = () => props.changeFilter(props.todoListID,"All" );
    const onActiveClickHandler = () => props.changeFilter(props.todoListID,"Active");
    const onCompletedClickHandler = () => props.changeFilter(props.todoListID,"Completed");

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
                <IconButton onClick={() => props.removeTodolist(props.todoListID)} aria-label="delete">
                    <Delete />
                </IconButton>
            </h3>
            <div>
                <AddItemForm callBack={addTaskHandler}/>
            </div>
            <ul style={{listStyle:'none', padding:'0'}}>
                {
                    props.tasks.map(m => {
                        return (
                            <li key={m.id}>
                                <Checkbox
                                    checked={m.isDone}
                                    onChange={(e) => changeStatusHandler(e, m.id)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    color={'success'}
                                />
                                <EditableSpan title={m.title} callBack={(title)=>updateTaskHandler(props.todoListID, m.id, title)}/>
                                <IconButton onClick={() => removeTaskHandler(m.id)} aria-label="delete">
                                    <Delete />
                                </IconButton>
                            </li>

                        )
                    })
                }
            </ul>
            <div>
                <Button variant={props.filter === 'All' ? 'contained' : 'outlined'} color='primary' onClick={onAllClickHandler}>All</Button>
                <Button variant={props.filter === 'Active' ? 'contained' : 'outlined'} color='primary' onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === 'Completed' ? 'contained' : 'outlined'} color='primary' onClick={onCompletedClickHandler}>Completed</Button>

                {/*<Button variant={props.filter === 'All' ? 'contained' : 'outlined'} color='error' onClick={onClickFilterHandler}>All</Button>
                <Button variant={props.filter === 'Active' ? 'contained' : 'outlined'} color='secondary' onClick={onClickFilterHandler}>Active</Button>
                <Button variant={props.filter === 'Completed' ? 'contained' : 'outlined'} color='success' onClick={onClickFilterHandler}>Completed</Button>*/}
            </div>
        </div>
    );
};

