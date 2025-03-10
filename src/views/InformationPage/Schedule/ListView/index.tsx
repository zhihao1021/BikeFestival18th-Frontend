import { ReactNode, useMemo } from "react";

import EventStrip from "@/components/EventStrip";

import EventData from "@/schemas/eventData";

import style from "./index.module.scss";

type propsType = Readonly<{
    events: Array<EventData>,
    showDetails: (events: Array<EventData>) => void
}>

export default function ListView(props: propsType): ReactNode {
    const {
        events,
        showDetails
    } = props;

    const eventsByTime = useMemo(() => events.reduce((result, value) => {
        if (result[value.startTime]) result[value.startTime].push(value);
        else result[value.startTime] = [value];
        return result
    }, {} as { [key: string]: Array<EventData> }), [events]);

    return <div className={style.listView}>
        <div className={style.box}>
            {
                Object.entries(eventsByTime).map(([time, events]) => <div
                    key={time}
                    className={style.block}
                >
                    <div className={style.time}>{time}</div>
                    {
                        events.map(data => <EventStrip
                            key={data.id}
                            data={data}
                            onClick={() => showDetails([data])}
                        />)
                    }
                </div>)
            }
        </div>
    </ div>
}