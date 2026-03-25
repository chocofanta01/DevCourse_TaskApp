import React from "react";
import type { ILogItem } from "../../../types";
import { author, date, logItemWrap, message } from "./LogItem.css.ts";

type TLogItemProps = {
    logItem: ILogItem;
}

const LogItem: React.FC<TLogItemProps> = ({
    logItem
}) => {
    const timeOffset = new Date(Number(logItem.logTimestamp));
    const showTime = `${timeOffset.getFullYear()}.${timeOffset.getMonth() + 1}.${timeOffset.getDate()} ${timeOffset.getHours()}:${timeOffset.getMinutes()}:${timeOffset.getSeconds()}`;

    return (
        <div className={logItemWrap}>
            <div className={author}>{logItem.logAuthor}</div>
            <div className={message}>{logItem.logMessage}</div>
            <div className={date}>{showTime}</div>
        </div>
    )
}

export default LogItem;