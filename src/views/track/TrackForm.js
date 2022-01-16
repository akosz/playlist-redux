import React, { useEffect, useState } from "react";
import { Modal } from "semantic-ui-react";

const Field = ({label, placeholder, value, name, onChange, ...attrs}) => {
    return(
        <div className="field">
            <label>{label}</label>
            <input name={name} type="text" placeholder={placeholder} value={value} onChange={onChange} {...attrs}/>
        </div>
    )
}

const defaultFormState = {
    artist: "",
    title: "",
    length: "",
    thumbnailURL: "",
    spotifyURL: "",
    chordsURL: "",
    lyricsURL: "",
}

export function TrackForm({open, onClose, onSubmit, track}) {
    const [formState, setFormState] = useState(defaultFormState)
    const resetFormState = (state) => setFormState(state)
    
    useEffect(() => {
        if(open)
            resetFormState({...defaultFormState, ...track})
    }, [open, track])

    const handleChange = e => {
        const {name, value} = e.target
        setFormState({...formState, [name]: value })
    }

    const handleSubmit = e =>{
        e.preventDefault()
        onSubmit(formState)
        onClose()
    }


    return (
        <Modal as="form" open={open} onClose={onClose} onSubmit={handleSubmit} className="ui modal">
            <i onClick={onClose} className="close icon"></i>
            <div className="header">Add new Track</div>
            <div className="image content">
                <div className="description">
                    <div className="ui form">
                        <div className="three fields">
                            <Field name="artist" onChange={handleChange} value={formState.artist} label="Author" placeholder="John Williams" required/>
                            <Field name="title" onChange={handleChange} value={formState.title} label="Track name" placeholder="Imperial March" required/>
                            <Field name="length" onChange={handleChange} value={formState.length} label="Length" placeholder="3:44" />
                        </div>
                        <div className="three fields">
                            <Field name="spotifyURL" onChange={handleChange} value={formState.spotifyURL} label="Spotify URL" placeholder="https://" />
                            <Field name="lyricsURL" onChange={handleChange} value={formState.lyricsURL} label="Lyrics URL" placeholder="https://" />
                            <Field name="chordsURL" onChange={handleChange} value={formState.chordsURL} label="Guitar tab URL" placeholder="https://" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="actions">
                <button type="button" onClick={onClose} className="ui black deny button">
                    Cancel
                </button>
                <button type="submit" className="ui positive right labeled icon button">
                    Add
                     <i className="plus icon"></i>
                </button>
            </div>
        </Modal>
    )
}