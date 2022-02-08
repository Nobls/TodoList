import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type PropsType = {
    title: string
    callBack: (title: string) => void
}

const EditableSpan = (props: PropsType) => {

    const [edit, setEdit] = useState(false)

    const [newTitle, setNewTitle] = useState(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onDoubleClickHandler = () => {
        setEdit(true)

    }
    const onBlurHandler = () => {
        setEdit(false)
        props.callBack(newTitle)
    }

    return (
        edit
            ?
            <TextField
                id="outlined-basic"
                variant="standard"
                value={newTitle}
                size="small"
                onBlur={onBlurHandler}
                onChange={onChangeHandler}
                autoFocus
            />
            /*<input
                value={newTitle}
                onBlur={onBlurHandler}
                autoFocus
                onChange={onChangeHandler}
            />*/
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
};

export default EditableSpan;