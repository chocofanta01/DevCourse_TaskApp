import { useState } from 'react'
import { appContainer, board, buttons, deleteBoardButton, loggerButton } from "./App.css.ts"
import BoardList from "./components/BoardList/BoardList"
import List from "./components/List/List"
import { useTypedSelector } from "./hooks/redux"
import ActionButton from './components/ActionButton/ActionButton'

function App() {
  const [activeBoardId, setActiveBoardId] = useState('board-0')
  const boards = useTypedSelector(state => state.boards.boardArray)
  const activeBoard = boards.find(b => b.boardId === activeBoardId) || boards[0]

  return (
    <div className={appContainer}>
      <BoardList activeBoardId={activeBoardId} setActiveBoardId={setActiveBoardId} />
      <div className={board}>
        {activeBoard.lists.map(list => (
          <List key={list.listId} boardId={activeBoardId} list={list} />
        ))}
        <ActionButton boardId={activeBoardId} />
      </div>
      <div className={buttons}>
        <button className={deleteBoardButton}>
          이 게시판 삭제하기
        </button>
        <button className={loggerButton}>
          활동 기록 보기
        </button>
      </div>
    </div>
  )
}

export default App
