import { createSlice } from "@reduxjs/toolkit";
import type { ILogItem } from "../../types";

type loggerState = {
    logArray: ILogItem[]
}

const initialState: loggerState = {
    logArray: []
}

const loggerSlice = createSlice({
    name: 'logger',
    initialState,
    reducers: {
        addLog: (state, { payload }: { payload: ILogItem }) => {
            state.logArray.push(payload);
        }
    }
})

export const { addLog } = loggerSlice.actions;
export const loggerReducer = loggerSlice.reducer