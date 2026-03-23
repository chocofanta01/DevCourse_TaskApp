import {createSlice} from "@reduxjs/toolkit";
import type { ILogItem } from "../../types";

type loggerState = {
    logArray: ILogItem[]
}

const initialState : loggerState = {
    logArray: []
}

const loggerSlicer = createSlice({
    name: 'logger',
    initialState,
    reducers: {

    }
})

export const loggerReducer = loggerSlicer.reducer