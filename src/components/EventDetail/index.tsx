import { MouseEvent, ReactNode, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import markedEventContext from "@/context/markedEvents";

import scrollToTop from "@/utils/scrollToTop";

import EventData from "@/schemas/eventData";

import activityDetails from "@/data/activityDetails.json";

import style from "./index.module.scss";

type propsType = Readonly<{
    show: boolean,
    data?: Array<EventData>,
    close: () => void,
}>;

const hrefMap = Object.entries(activityDetails).reduce((result, [key, value]) => {
    if (value.projects.length === 1) result[value.projects[0].subtitle] = `/activity/${key}`;
    else value.projects.forEach((project, index) => result[project.subtitle] = `/activity/${key}/${index}`);
    return result;
}, {} as { [key: string]: string });

export default function EventDetail(props: propsType): ReactNode {
    const {
        show,
        data,
        close,
    } = props;

    const ref = useRef<HTMLDivElement>(null);

    const {
        markedEventIds,
        switchEvent,
    } = useContext(markedEventContext);

    useEffect(() => {
        if (show) ref.current?.scroll({ top: 0, behavior: "smooth" })
    }, [show]);

    return <div
        ref={ref}
        className={style.detail}
        data-show={show && data !== undefined}
        onClick={(event: MouseEvent<HTMLElement>) => {
            const element = event.target as HTMLElement;
            if (element.classList.contains(style.detail) || element.classList.contains(style.box)) close();
        }}
        data-single={data && data.length === 1}
    >
        <div className={style.box}>
            {
                data ? data.map(data => <div
                    key={data.id}
                    className={style.detailBox}
                    data-mark={markedEventIds.includes(data.id)}
                >
                    <button className={`ms ${style.close}`} onClick={close}>close</button>
                    <button
                        className={`${style.bookmark} mso-p`}
                        onClick={() => switchEvent(data.id)}
                    />
                    <Link
                        to={hrefMap[data.project]}
                        className={style.projectName}
                        onClick={() => {
                            close();
                            scrollToTop();
                        }}
                    >{data.project}</Link>
                    <h2>{data.name}</h2>
                    <div className={style.info}>
                        <div>
                            <span className="ms">schedule</span>
                            <span>{`${data.startTime}~${data.endTime}`}</span>
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
                    <div className={style.description}>
                        {data.description}
                    </div>
                    {data.link ? Date.parse(data.signupEnd || `${YEAR}/${data.date} ${data.startTime}`) > Date.now() ? <a
                        href={data.link}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className={style.signUp}
                    >即刻報名</a> : <div className={style.signUp}>報名截止</div> : undefined}
                </div>) : undefined
            }
        </div>
    </div>
}