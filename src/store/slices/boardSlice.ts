import { createSlice } from "@reduxjs/toolkit";
import type { IBoard, IList, ITask } from "../../types";

type TBoardsState = {
    modalActive: boolean;
    boardArray: IBoard[]
}

const initialState: TBoardsState = {
    modalActive: false,
    boardArray: [
        {
            boardId: 'board-0',
            boardName: "첫 번째 게시물",
            lists: [
                {
                    listId: "list-0",
                    listName: "List 1",
                    tasks: [{
                        taskId: "task-0",
                        taskName: "Task 1",
                        taskDescription: "Description",
                        taskOwner: "Jeahyuk"
                    }, {
                        taskId: "task-1",
                        taskName: "Task 2",
                        taskDescription: "Description",
                        taskOwner: "Jeahyuk"
                    },
                    ]
                }, {
                    listId: "list-1",
                    listName: "List 2",
                    tasks: [{
                        taskId: "task-2",
                        taskName: "Task 3",
                        taskDescription: "Description",
                        taskOwner: "Jeahyuk"
                    }, {
                        taskId: "task-3",
                        taskName: "Task 4",
                        taskDescription: "Description",
                        taskOwner: "Jeahyuk"
                    },
                    ]
                }
            ]
        }
    ],
}

const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        addBoard: (state, { payload }: { payload: { board: IBoard } }) => {
            state.boardArray.push(payload.board);
        },
        addList: (state, { payload }: { payload: { boardId: string; list: IList } }) => {
            const board = state.boardArray.find(b => b.boardId === payload.boardId);
            if (board) {
                board.lists.push(payload.list);
            }
        },
        addTask: (state, { payload }: { payload: { boardId: string; listId: string; task: ITask } }) => {
            const board = state.boardArray.find(b => b.boardId === payload.boardId);
            if (board) {
                const list = board.lists.find(l => l.listId === payload.listId);
                if (list) {
                    list.tasks.push(payload.task);
                }
            }
        },
        deleteList: (state, { payload }: { payload: { boardId: string; listId: string } }) => {
            const board = state.boardArray.find(b => b.boardId === payload.boardId);
            if (board) {
                board.lists = board.lists.filter(l => l.listId !== payload.listId);
            }
        },
        setModalActive: (state, { payload }: { payload: boolean }) => {
            state.modalActive = payload;
        }
    }
})

export const { addBoard, addList, addTask, deleteList, setModalActive } = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;