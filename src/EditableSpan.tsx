import React, {ChangeEvent, FC, useState} from 'react';
import TextField from '@mui/material/TextField';

type EditableSpanType = {
    title: string
    classes?: string
    changeTitle: (title: string)=> void

}
const EditableSpan: FC<EditableSpanType> = ({title, classes,changeTitle}) => {

    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    let [localTitle, setLocalTitle] = useState(title)

    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)
    }

    const onEditMode = () => setIsEditMode(true)
    const offEditMode = () => {
        setIsEditMode(false)
        changeTitle(localTitle)
    }

    return (
        isEditMode
            ?
            <input value={localTitle} onChange={setLocalTitleHandler} onBlur={offEditMode} autoFocus/>
            // <TextField id="outlined-basic" label="Outlined" variant="outlined" value={localTitle} onChange={setLocalTitleHandler} onBlur={offEditMode} autoFocus/>
            : <span className={classes} onDoubleClick={onEditMode}>{title}</span>
    );

}

export default EditableSpan;
