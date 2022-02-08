import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from "../todoList/todoList.module.css";

type PropsType = {
    callBack: (title:string)=>void
}

const AddItemForm = (props:PropsType) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState(false)

    const addTask = () => {
        if (title.trim() === '') {
            setTitle('')
            setError(true)
        } else {
            props.callBack(title)
            setTitle('')
        }
    }

    const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
            setTitle('')
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeTaskHandler}
                   onKeyPress={onKeyPressTaskHandler}
                   className={error ? styles.error : ''}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={styles.errorMessage}>Title is required</div>}
        </div>
    );
};

export default AddItemForm;