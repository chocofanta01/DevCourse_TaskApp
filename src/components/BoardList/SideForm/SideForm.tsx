import { useRef, useState, type ChangeEvent } from "react";
import type React from "react"
import { FiCheck } from "react-icons/fi";
import { icon, input, sideForm } from "./SideForm.css.ts";
import { useTypedDispatch } from "../../../hooks/redux";
import { v4 as uuidv4 } from 'uuid';
import { addBoard } from "../../../store/slices/boardSlice";
import { addLog } from "../../../store/slices/loggerSlice";

type TSideFormProps = {
  inputRef: React.RefObject<HTMLInputElement>,
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const SideForm: React.FC<TSideFormProps> = ({
  setFormOpen,
  inputRef
}) => {
  const [inputText, setInputText] = useState('');
  const dispatch = useTypedDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }

  const handleOnBlur = () => {
    setFormOpen(false);
  }

  const handleClick = () => {
    if (inputText) {
      dispatch(
        addBoard({
          board: {
            boardId: uuidv4(),
            boardName: inputText,
            lists: []
          }
        })
      )
    }

    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `게시판 등록: ${inputText}`,
        logAuthor: "User",
        logTimestamp: String(Date.now()),
      })
    )
  }


  return (
    <div className={sideForm}>
      <input
        autoFocus
        ref={inputRef}
        className={input}
        type="text"
        placeholder="새로운 게시판 등록하기"
        value={inputText}
        onChange={handleChange}
        onBlur={handleOnBlur}
      />
      {/* 아래의 마우스 다운은 onBlur보다 먼저 실행되도록 하기 위함 */}
      <FiCheck className={icon} onMouseDown={handleClick} />
    </div>
  )
}

export default SideForm