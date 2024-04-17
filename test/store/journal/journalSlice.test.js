 import {journalSlice} from '../../../src/store/journal/journalSlice';
import { initialState } from '../../fixtures/authFixtures';

describe('Pruebas en el journalSlice',() =>{
    test('debe de regresar al estado inicial y llamarse: journal', ()=>{
        //console.log(journalSlice)
        //estado inicial
        const state = journalSlice.reducer(initialState, {});

        //console.log(state)
        expect(state).toEqual(initialState);
        expect(journalSlice.name).toBe('journal')
    });
    test('savingNewNote, debe cambiar estado al guardar nueva nota', ()=>{
        
    });
    // test('', ()=>{

    // });
    // test('', ()=>{

    // });
    // test('', ()=>{

    // });
})