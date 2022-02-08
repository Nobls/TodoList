import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";

type PropsType = {
    callBack: (title: string) => void
}

const AddItemForm = (props: PropsType) => {

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
            <TextField
                id="outlined-basic"
                label={error ? "Title is required" : ''}
                error={error}
                variant="outlined"
                value={title}
                size="small"
                onChange={onChangeTaskHandler}
                onKeyPress={onKeyPressTaskHandler}
                className={error ? "error" : ""}
                autoComplete={'off'}
            />
            <Button style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}
                    variant="contained" onClick={addTask} disabled={error}>
                +
            </Button>
        </div>
    );
};

export default AddItemForm;