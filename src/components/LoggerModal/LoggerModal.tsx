import { FiX } from "react-icons/fi";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { setLoggerModalActive } from "../../store/slices/loggerSlice";
import LogItem from "./LogItem/LogItem";
import { body, closeButton, header, modalWindow, title, wrapper } from "./LoggerModal.css.ts";

const LoggerModal = () => {
    const dispatch = useTypedDispatch();
    const logs = useTypedSelector(state => state.logger.logArray);

    const handleClose = () => {
        dispatch(setLoggerModalActive(false));
    }

    return (
        <div className={wrapper}>
            <div className={modalWindow}>
                <div className={header}>
                    <div className={title}>활동 기록</div>
                    <FiX className={closeButton} onClick={handleClose} />
                </div>
                <div className={body}>
                    {logs.map(log => (
                        <LogItem key={log.logId} logItem={log} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LoggerModal;