import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";

type AddItemFormPropsType = {
    titleMaxLength: number
    addItem: (title: string) => void


}
const AddItemForm: FC<AddItemFormPropsType> = ({titleMaxLength, addItem}) => {


    let [title, setTitle] = useState('')
    let [error, setError] = useState<boolean>(false)


    const isTitleLengthTooLong: boolean = title.length > titleMaxLength
    const isAddButtonDisabled: boolean = !title.length || isTitleLengthTooLong
    const titleMaxLengthWarning = isTitleLengthTooLong
        ? <div style={{color: 'red'}}>Title is to long!</div>
        : null
    const userMessage = error
        ? <div style={{color: 'red'}}>Title is required!</div>
        : null
    const inputClasses = error || isTitleLengthTooLong ? 'input-error' : undefined


    const SetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const addItemHandler = () => {
        const trimmedTask = title.trim()
        if (trimmedTask) {
            addItem(trimmedTask)
        } else {
            setError(true)
        }
        setTitle('')

    }

    const onEnterAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && !isAddButtonDisabled && addItemHandler()

    const muiStyles = {
        maxWidth: '39px', maxHeight: '39px', minWidth: '39px', minHeight: '39px'
    }
    return (

        <div className={'add-form'}>

            <TextField
                error={!!error}
                id="outlined-basic"
                size={"small"}
                label={error? 'Title is required!': 'Type out smth'}
                variant="outlined"
                placeholder={'pleas, enter title'}
                value={title}
                onChange={SetLocalTitle}
                onKeyDown={onEnterAddTask}/>
            {/*className={inputClasses}*/}
            <Button variant="contained" onClick={addItemHandler} style={muiStyles} size="small">+</Button>



        </div>
    )

};

export default AddItemForm;
