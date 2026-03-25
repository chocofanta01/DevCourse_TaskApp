import { GrSubtract } from "react-icons/gr"
import Task from "../Task/Task";
import ActionButton from "../ActionButton/ActionButton";
import type { IList, ITask } from "../../types";
import { useTypedDispatch } from "../../hooks/redux";
import { deleteList, setModalActive } from "../../store/slices/boardSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { v4 } from "uuid";
import { setModalData } from "../../store/slices/modalSlice";
import { deleteButton, header, listWrapper, name } from "./List.css.ts";
import { Draggable, Droppable } from "@hello-pangea/dnd";

type TListProps = {
  boardId: string;
  list: IList;
  index: number;
}

const List: React.FC<TListProps> = ({
  list,
  boardId,
  index
}) => {

  const dispatch = useTypedDispatch();

  const handleListDelete = (listId: string) => {
    dispatch(deleteList({ boardId, listId }));
    dispatch(
      addLog({
        logId: v4(),
        logMessage: `리스트 삭제하기: ${list.listName}`,
        logAuthor: "User",
        logTimestamp: String(Date.now())
      })
    )
  }

  const handleTaskChange = (
    boardId: string,
    listId: string,
    task: ITask
  ) => {
    dispatch(setModalData({ boardId, listId, task }));
    dispatch(setModalActive(true));
  }

  return (
    <Draggable draggableId={list.listId} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={listWrapper}
        >
          <div {...provided.dragHandleProps} className={header}>
            <div className={name}>{list.listName}</div>
            <GrSubtract
              className={deleteButton}
              onClick={() => handleListDelete(list.listId)}
            />
          </div>
          <Droppable droppableId={list.listId} type="task">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {list.tasks.map((task, index) => (
                  <div
                    onClick={() => handleTaskChange(boardId, list.listId, task)}
                    key={task.taskId}
                  >
                    <Task
                      taskName={task.taskName}
                      taskDescription={task.taskDescription}
                      boardId={boardId}
                      id={task.taskId}
                      index={index}
                    />
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <ActionButton
            boardId={boardId}
            listId={list.listId}
          />
        </div>
      )}
    </Draggable>
  )
}

export default List;