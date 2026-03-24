import { useState } from "react";
import DropDownForm from "./DropDownForm/DropDownForm";
import { IoIosAdd } from "react-icons/io";
import { listButton, taskButton } from "./ActionButton.css.ts";

type TActionButtonProps = {
  boardId: string;
  listId?: string;
}

const ActionButton: React.FC<TActionButtonProps> = ({
  boardId,
  listId
}) => {
  const list = listId != null;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const buttonText = list ? "새로운 일 등록" : "새로운 리스트 등록";

  return isFormOpen ? (
    <DropDownForm
      setIsFormOpen={setIsFormOpen}
      boardId={boardId}
      listId={listId}
    />
  )
    : (<div
      className={list ? taskButton : listButton}
      onClick={() => setIsFormOpen(true)}
    >
      <IoIosAdd />
      <p>{buttonText}</p>
    </div>)
}

export default ActionButton