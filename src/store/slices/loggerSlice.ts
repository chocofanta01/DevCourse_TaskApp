import { createSlice } from "@reduxjs/toolkit";
import type { ILogItem } from "../../types";

type loggerState = {
    logArray: ILogItem[];
    modalActive: boolean;
}

const initialState: loggerState = {
    logArray: [],
    modalActive: false
}

const loggerSlice = createSlice({
    name: 'logger',
    initialState,
    reducers: {
        addLog: (state, { payload }: { payload: ILogItem }) => {
            state.logArray.push(payload);
        },
        setLoggerModalActive: (state, { payload }: { payload: boolean }) => {
            state.modalActive = payload;
        }
    }
})

export const { addLog, setLoggerModalActive } = loggerSlice.actions;
export const loggerReducer = loggerSlice.reducer