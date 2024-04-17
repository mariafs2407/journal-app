import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers";

export const startNewNote = () => {
  return async (dispatch, getState) => {

    dispatch(savingNewNote());

    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      //imageUrls: [],
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);
    //console.log({newDoc,setDocResp});

    newNote.id = newDoc.id;

    // dispatch
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const starLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    //console.log({uid})

    if (!uid) throw new Error("El UID del usuario no existe");

    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving()); // nota actualizada

    //console.log({uid})
    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    //destructuramos
    const noteToFireStore = { ...note };

    delete noteToFireStore.id; //eliminar una propiedad de aqui
    //console.log(noteToFireStore);
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    //console.log(files)
    //await fileUpload(files[0]);
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photosUrls = await Promise.all(fileUploadPromises);
    //console.log(photosUrls)
    dispatch(setPhotosToActiveNote(photosUrls));
  };
};


export const startDeleteNote = () => {
  return async (dispatch,getState) => {

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    //console.log({uid,note})
    const docRef = doc(FirebaseDB,`${uid}/journal/notes/${note.id}`)
    const resp = await deleteDoc(docRef);

    //console.log({resp});
    dispatch(deleteNoteById(note.id));

  };
};
