import React from 'react';
import { Typography, IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { JournalLayout } from '../layout/JournalLayout';
import { NothingSelectedView } from '../views/NothingSelectedView';
import { NoteView } from '../views';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal/thunks';

const JournalPage = () => {

    const dispatch = useDispatch();

    const {isSaving,active} = useSelector(state =>state.journal)

    const onClickNewNote = () => {
        dispatch(startNewNote());
    }

    return (
        <JournalLayout >
            {/* true : noteview(escribir nota) ,NothingSelectedView(seleccionr nota)*/}
            { (!!active) ? 
                <NoteView/>:
                < NothingSelectedView />}
                        
            <IconButton
                disabled={isSaving}
                onClick={onClickNewNote}
                size='large'
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: ' error.main', opacity: 0.9 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}
            >
                <AddOutlined sx={{ fontSize: 30 }} />
            </IconButton>
        </JournalLayout>

    );
}

export default JournalPage;