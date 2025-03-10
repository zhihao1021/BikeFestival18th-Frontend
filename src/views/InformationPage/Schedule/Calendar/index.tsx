import { CSSProperties, ReactNode, useContext, useMemo, useRef } from "react";

import SignupIcon from "@/components/SignupIcon";

import markedEventContext from "@/context/markedEvents";

import EventData from "@/schemas/eventData";

import activityCategory from "@/data/activityCategory.json";

import style from "./index.module.scss";
import groupingEvents from "@/utils/eventsGrouping";

const TIME_COUNT = 10;
const TIME_START = 8;

type propsType = Readonly<{
    events: Array<EventData>,
    showDetails: (events: Array<EventData>) => void
}>

function timeToFloat(timeString: string): number {
    const [h, m] = timeString.split(":");
    return parseInt(h) + parseInt(m) / 60;
}

function calcStart(event: EventData): number {
    return timeToFloat(event.startTime) - TIME_START;
}

function calcHeight(events: Array<EventData>): number {
    const startTime = Math.min(...events.map(data => timeToFloat(data.startTime)));
    const endTime = Math.max(...events.map(data => timeToFloat(data.endTime)));
    return endTime - startTime;
}

function checkSameTalker(events: Array<EventData>): boolean {
    return new Set(events.map(data => data.host)).size === 1;
}

function checkSameLocation(events: Array<EventData>): boolean {
    return new Set(events.map(data => data.location)).size === 1;
}

export default function Calendar(props: propsType): ReactNode {
    const categoryRef = useRef<HTMLDivElement>(null);

    const {
        events,
        showDetails
    } = props;

    const {
        markedEventIds,
        switchEvent,
    } = useContext(markedEventContext);

    const originProjectList = useMemo(() => Object.values(activityCategory).reduce((v, v2) => [
        ...v, ...v2
    ]), [activityCategory]);

    const projectList = useMemo(() => originProjectList.filter(
        v => new Set(events.map(data => data.project)).has(v)
    ), [originProjectList, events]);
    const showEventCategory = useMemo(() => Object.entries(activityCategory).reduce((result, [key, values]) => {
        const newValues = values.filter(v => projectList.includes(v))
        if (newValues.length !== 0) result[key] = newValues;
        return result;
    }, {} as { [key: string]: Array<string> }), [projectList, activityCategory]);

    return <>
        <div className={style.categoryBox} style={{ "--pc": projectList.length } as CSSProperties}>
            <div ref={categoryRef} className={style.eventCategory}>
                {
                    Object.entries(showEventCategory).map(([key, values]) => <div
                        key={key}
                        className={style.eventNameGroup}
                        data-key={key}
                    >
                        {
                            (activityCategory as { [key: string]: Array<string> })[key].length === 1 ? <div
                                className={style.eventName}
                            >{key}</div> : <>
                                <div className={style.eventTitle}>{key}</div>
                                <div className={style.subGroup}>
                                    {values.map(subKey => <div
                                        key={subKey}
                                        className={style.subEventName}
                                    >{subKey}</div>)}
                                </div>
                            </>
                        }
                    </div>)
                }
            </div>
        </div>
        <div className={style.calendar} style={{ "--pc": projectList.length } as CSSProperties}>
            {
                Array.from(Array(TIME_COUNT)).map((_, index) => <div
                    key={index}
                    className={style.time}
                    data-last={index === TIME_COUNT - 1}
                >{`${(TIME_START + index)}`.padStart(2, "0")}:00</div>)
            }
            <div className={style.eventBlock} onScroll={event => {
                const element = event.target as HTMLDivElement;
                const category = categoryRef.current;
                if (element && category) category.scrollLeft = element.scrollLeft;
            }}>
                <div className={style.events}>
                    {
                        projectList.map(key => <div key={key} className={style.snapElement} />)
                    }
                    {
                        groupingEvents(events).map(data => <div
                            key={data[0].id}
                            className={style.eventBox}
                            style={{
                                "--x": projectList.indexOf(data[0].project),
                                "--y": calcStart(data[0]),
                                "--h": calcHeight(data)
                            } as CSSProperties}
                            onClick={event => {
                                const element = event.target as HTMLElement;
                                if (element.classList.contains(style.bookmark)) return;
                                showDetails(data)
                            }}
                            data-mark={markedEventIds.includes(data[0].id)}
                        >
                            <div className={style.projectName}>{data[0].project}</div>
                            {
                                data.length === 1 ? <button
                                    className={`${style.bookmark} mso-p`}
                                    onClick={() => switchEvent(data[0].id)}
                                /> : undefined
                            }

                            {data.slice(0, Math.round(7.5 * (calcHeight(data) - 0.4))).map(d => <h3 key={d.id}>{d.name}</h3>)}
                            {Math.round(7.5 * (calcHeight(data) - 0.4)) < data.length ? <h3>更多...</h3> : undefined}
                            <div className={style.eventInfo}>
                                <div className={style.pair}>
                                    <span className="ms">schedule</span>
                                    <span>{`${data[0].date} ${data[0].startTime}~${data[data.length - 1].endTime}`}</span>
                                </div>
                                {
                                    checkSameTalker(data) ? <div className={style.pair}>
                                        <span className="ms">person</span>
                                        <span>{data[0].host}</span>
                                    </div> : undefined
                                }
                                {
                                    checkSameLocation(data) ? <div className={style.pair}>
                                        <span className="ms">location_on</span>
                                        <span>{data[0].location}</span>
                                    </div> : undefined
                                }
                            </div>
                            <SignupIcon className={style.signupIcon} data={data[0]} />
                        </div>)
                    }
                </div>
            </div>
        </div>
    </>
}