import { useRef, useState } from "react";
import { useTypedSelector } from "../../hooks/redux";
import SideForm from "./SideForm/SideForm";
import { IoIosAdd } from "react-icons/io";
import { addButton, addSection, boardItem, boardItemActive, container, title } from "./BoardList.css.ts";

type TBoardListProps = {
    activeBoardId: string;
    setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
}

const BoardList: React.FC<TBoardListProps> = ({
    activeBoardId,
    setActiveBoardId
}) => {
    const { boardArray } = useTypedSelector(state => state.boards);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        setIsFormOpen(!isFormOpen);
    }

    return (
        <div className={container}>
            <div className={title}>
                게시판:
            </div>
            {boardArray.map((board) => (
                <div
                    key={board.boardId}
                    onClick={() => setActiveBoardId(board.boardId)}
                    className={
                        board.boardId === activeBoardId
                            ? boardItemActive
                            : boardItem
                    }
                >
                    <div>
                        {board.boardName}
                    </div>
                </div>
            ))}
            <div className={addSection}>
                {
                    isFormOpen
                        ? <SideForm inputRef={inputRef as any} setFormOpen={setIsFormOpen} />
                        : <IoIosAdd className={addButton} onClick={handleClick} />
                }
            </div>
        </div>
    )
}

export default BoardList;