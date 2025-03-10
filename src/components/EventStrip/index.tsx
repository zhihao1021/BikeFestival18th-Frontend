import { ReactNode, useContext, useMemo } from "react";

import SignupIcon from "@/components/SignupIcon";

import markedEventContext from "@/context/markedEvents";

import EventData from "@/schemas/eventData";

import style from "./index.module.scss";

type propsType = Readonly<{
    data: EventData,
    onClick?: () => void,
    showDate?: boolean
}>;

export default function EventStrip(props: propsType): ReactNode {
    const {
        data,
        onClick,
        showDate
    } = props;

    const {
        markedEventIds,
        switchEvent,
    } = useContext(markedEventContext);

    const marked = useMemo(() => markedEventIds.includes(data.id), [data, markedEventIds]);

    return <div className={style.eventStrip} onClick={event => {
        const element = event.target as HTMLElement;
        if (element.classList.contains(style.bookmark) || element.tagName === "INPUT") return;
        if (onClick) onClick();
    }}>
        <SignupIcon className={style.signupIcon} data={data} />
        <div className={style.box}>
            <div className={style.projectName}>{data.project}</div>
            <h3>{data.name}</h3>
            <div className={style.info}>
                <div>
                    <span className="ms">schedule</span>
                    <span>{`${showDate ? data.date + " " : ""}${data.startTime}~${data.endTime}`}</span>
                </div>
                <div>
                    <span className="ms">person</span>
                    <span>{data.host}</span>
                </div>
                <div>
                    <span className="ms">location_on</span>
                    <span>{data.location}</span>
                </div>
            </div>
        </div>
        <div>
            <label className={`mso-p ${style.bookmark}`}>
                <input
                    className={style.bookmarkInput}
                    type="checkbox"
                    checked={marked}
                    onChange={() => switchEvent(data.id)}
                />
            </label>
        </div>
    </div>
}