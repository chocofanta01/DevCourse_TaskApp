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
        deleteBoard: (state, { payload }: { payload: { boardId: string } }) => {
            state.boardArray = state.boardArray.filter(b => b.boardId !== payload.boardId);
        },
        addList: (state, { payload }: { payload: { boardId: string; list: IList } }) => {
            const board = state.boardArray.find(b => b.boardId === payload.boardId);
            if (board) {
                board.lists.push(payload.list);
            }
        },
        deleteList: (state, { payload }: { payload: { boardId: string; listId: string } }) => {
            const board = state.boardArray.find(b => b.boardId === payload.boardId);
            if (board) {
                board.lists = board.lists.filter(l => l.listId !== payload.listId);
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
        updateTask: (state, { payload }: { payload: { boardId: string; listId: string; task: ITask } }) => {
            const board = state.boardArray.find(b => b.boardId === payload.boardId);
            if (board) {
                const list = board.lists.find(l => l.listId === payload.listId);
                if (list) {
                    list.tasks = list.tasks.map(t => t.taskId === payload.task.taskId ? payload.task : t);
                }
            }
        },
        deleteTask: (state, { payload }: { payload: { boardId: string; listId: string; taskId: string } }) => {
            const board = state.boardArray.find(b => b.boardId === payload.boardId);
            if (board) {
                const list = board.lists.find(l => l.listId === payload.listId);
                if (list) {
                    list.tasks = list.tasks.filter(t => t.taskId !== payload.taskId);
                }
            }
        },
        setModalActive: (state, { payload }: { payload: boolean }) => {
            state.modalActive = payload;
        },
        sort: (state, { payload }: {
            payload: {
                boardIndex: number;
                droppableIdStart: string;
                droppableIdEnd: string;
                droppableIndexStart: number;
                droppableIndexEnd: number;
                type: string;
            }
        }) => {
            const board = state.boardArray[payload.boardIndex];

            // 리스트 드래그 앤 드롭
            if (payload.type === 'list') {
                const [removed] = board.lists.splice(payload.droppableIndexStart, 1);
                board.lists.splice(payload.droppableIndexEnd, 0, removed);
                return;
            }

            // 태스크 드래그 앤 드롭
            const listStart = board.lists.find(l => l.listId === payload.droppableIdStart);
            const listEnd = board.lists.find(l => l.listId === payload.droppableIdEnd);

            if (listStart === listEnd && listStart) {
                // 같은 리스트 내 이동
                const [removed] = listStart.tasks.splice(payload.droppableIndexStart, 1);
                listStart.tasks.splice(payload.droppableIndexEnd, 0, removed);
            } else if (listStart && listEnd) {
                // 다른 리스트 간 이동
                const [removed] = listStart.tasks.splice(payload.droppableIndexStart, 1);
                listEnd.tasks.splice(payload.droppableIndexEnd, 0, removed);
            }
        }
    }
})

export const { addBoard, deleteBoard, addList, deleteList, addTask, updateTask, deleteTask, setModalActive, sort } = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;