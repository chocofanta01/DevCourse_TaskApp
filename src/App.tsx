import { useState } from 'react'
import { appContainer, board, buttons, deleteBoardButton, loggerButton } from "./App.css.ts"
import BoardList from "./components/BoardList/BoardList"
import List from "./components/List/List"
import { useTypedDispatch, useTypedSelector } from "./hooks/redux"
import ActionButton from './components/ActionButton/ActionButton'
import { DragDropContext, Droppable, type DropResult } from '@hello-pangea/dnd'
import { deleteBoard, sort } from './store/slices/boardSlice'
import { addLog } from './store/slices/loggerSlice'
import { v4 } from 'uuid'
import EditModal from './components/EditModal/EditModal'
import LoggerModal from './components/LoggerModal/LoggerModal'
import { setLoggerModalActive } from './store/slices/loggerSlice'
import { auth, provider, signInWithPopup, signOut } from './firebase'
import { removeUser, setUser } from './store/slices/userSlice'

function App() {
  const dispatch = useTypedDispatch();
  const [activeBoardId, setActiveBoardId] = useState('board-0')
  const boards = useTypedSelector(state => state.boards.boardArray)
  const modalActive = useTypedSelector(state => state.boards.modalActive)
  const loggerModalActive = useTypedSelector(state => state.logger.modalActive)
  const user = useTypedSelector(state => state.user)

  const activeBoard = boards.find(b => b.boardId === activeBoardId) || boards[0]

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) return;

    const boardIndex = boards.findIndex(b => b.boardId === activeBoardId);

    dispatch(sort({
      boardIndex,
      droppableIdStart: source.droppableId,
      droppableIdEnd: destination.droppableId,
      droppableIndexStart: source.index,
      droppableIndexEnd: destination.index,
      type
    }))
  }

  const handleDeleteBoard = () => {
    if (boards.length > 1) {
      dispatch(deleteBoard({ boardId: activeBoardId }));
      dispatch(addLog({
        logId: v4(),
        logMessage: `게시판 삭제하기: ${activeBoard.boardName}`,
        logAuthor: user.email || "Guest",
        logTimestamp: String(Date.now())
      }));

      const newIndex = boards.findIndex(b => b.boardId === activeBoardId);
      const nextBoardId = boards[newIndex - 1]?.boardId || boards[newIndex + 1]?.boardId;
      setActiveBoardId(nextBoardId);
    } else {
      alert("최소 하나의 게시판은 존재해야 합니다.");
    }
  }

  const handleAuth = () => {
    if (user.email) {
      signOut(auth)
        .then(() => {
          dispatch(removeUser());
        })
        .catch((error) => {
          console.error(error);
        })
    } else {
      signInWithPopup(auth, provider)
        .then((result) => {
          dispatch(setUser({
            email: result.user.email,
            id: result.user.uid
          }));
        })
        .catch((error) => {
          console.error(error);
        })
    }
  }

  return (
    <div className={appContainer}>
      {modalActive && <EditModal />}
      {loggerModalActive && <LoggerModal />}

      <BoardList activeBoardId={activeBoardId} setActiveBoardId={setActiveBoardId} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId={activeBoardId} type='list' direction='horizontal'>
          {(provided) => (
            <div className={board} {...provided.droppableProps} ref={provided.innerRef}>
              {activeBoard.lists.map((list, index) => (
                <List key={list.listId} boardId={activeBoardId} list={list} index={index} />
              ))}
              {provided.placeholder}
              <ActionButton boardId={activeBoardId} />
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className={buttons}>
        <button className={deleteBoardButton} onClick={handleDeleteBoard}>
          이 게시판 삭제하기
        </button>
        <button className={loggerButton} onClick={() => dispatch(setLoggerModalActive(true))}>
          활동 기록 보기
        </button>
        <button className={loggerButton} onClick={handleAuth}>
          {user.email ? "로그아웃" : "로그인"}
        </button>
      </div>
    </div>
  )
}

export default App
