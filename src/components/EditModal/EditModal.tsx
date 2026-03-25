import { useState } from "react";
import { FiX } from "react-icons/fi";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { deleteTask, setModalActive, updateTask } from "../../store/slices/boardSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { v4 } from "uuid";
import { buttons, closeButton, deleteButton, header, input, modalWindow, title, updateButton, wrapper } from "./EditModal.css.ts";

const EditModal = () => {
    const dispatch = useTypedDispatch();
    const editingData = useTypedSelector(state => state.modal);
    const [data, setData] = useState(editingData);

    const handleClose = () => {
        dispatch(setModalActive(false));
    }

    const handleUpdate = () => {
        dispatch(updateTask({
            boardId: data.boardId,
            listId: data.listId,
            task: data.task
        }));

        dispatch(addLog({
            logId: v4(),
            logMessage: `일 수정하기: ${data.task.taskName}`,
            logAuthor: "User",
            logTimestamp: String(Date.now())
        }));

        dispatch(setModalActive(false));
    }

    const handleDelete = () => {
        dispatch(deleteTask({
            boardId: data.boardId,
            listId: data.listId,
            taskId: data.task.taskId
        }));

        dispatch(addLog({
            logId: v4(),
            logMessage: `일 삭제하기: ${data.task.taskName}`,
            logAuthor: "User",
            logTimestamp: String(Date.now())
        }));

        dispatch(setModalActive(false));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({
            ...data,
            task: {
                ...data.task,
                [e.target.name]: e.target.value
            }
        });
    }

    return (
        <div className={wrapper}>
            <div className={modalWindow}>
                <div className={header}>
                    <div className={title}>{data.task.taskName}</div>
                    <FiX className={closeButton} onClick={handleClose} />
                </div>
                <div className={title}>제목</div>
                <input
                    className={input}
                    type="text"
                    name="taskName"
                    value={data.task.taskName}
                    onChange={handleChange}
                />
                <div className={title}>설명</div>
                <input
                    className={input}
                    type="text"
                    name="taskDescription"
                    value={data.task.taskDescription}
                    onChange={handleChange}
                />
                <div className={title}>담당자</div>
                <input
                    className={input}
                    type="text"
                    name="taskOwner"
                    value={data.task.taskOwner}
                    onChange={handleChange}
                />
                <div className={buttons}>
                    <button className={updateButton} onClick={handleUpdate}>수정하기</button>
                    <button className={deleteButton} onClick={handleDelete}>삭제하기</button>
                </div>
            </div>
        </div>
    )
}

export default EditModal;