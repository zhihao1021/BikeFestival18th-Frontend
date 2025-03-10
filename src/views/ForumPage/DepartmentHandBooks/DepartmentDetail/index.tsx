import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";

import EventDetail from "@/components/EventDetail";
import EventStrip from "@/components/EventStrip";

import CachePDF from "@/utils/CachePDF";

import EventData from "@/schemas/eventData";
import DepartmentData from "@/schemas/departmentData";

import events from "@/data/events.json";

import style from "./index.module.scss";

type propsType = Readonly<{
    data: DepartmentData,
    collegeName: string
}>;

export default function DepartmentDetail(props: propsType): ReactNode {
    const {
        data,
        collegeName
    } = props;

    const [eventDetail, setEventDetail] = useState<EventData>();
    const [showEventDetail, setShowEventDetail] = useState<boolean>(false);

    return <div className={style.departmentDetail}>
        <h2>{collegeName}</h2>
        <Link
            to={data.officialWebsite}
            target="_blank"
            referrerPolicy="no-referrer"
            className={style.titleBox}
        >
            <h1>{data.name}</h1>
            <span className={`ms ${style.icon}`}>open_in_new</span>
        </Link>
        <CachePDF pdfUrl={`/pdf/${data.id}.pdf`} className={style.pdfEmbed} />
        {/* <div className={style.pdfEmbed}>
            <LoadIFrame
                src={data.pdfEmbeddedURL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
            <LoadingBackground text="PDF 載入中" />
        </div> */}
        {
            data.related_event_id.length === 0 ? undefined : <>
                <h3>相關活動行程</h3>
                {
                    events.filter(
                        event => data.related_event_id.includes(event.id)
                    ).sort((event1, event2) => {
                        if (event1.date === event2.date) {
                            if (event1.startTime === event2.startTime)
                                return parseInt(event1.endTime.replace(":", "")) - parseInt(event2.endTime.replace(":", ""))
                            return parseInt(event1.startTime.replace(":", "")) - parseInt(event2.startTime.replace(":", ""))
                        }
                        return Date.parse(event1.date) - Date.parse(event2.date)
                    }).map(event => <EventStrip
                        key={event.id}
                        data={event}
                        onClick={() => {
                            setEventDetail(event);
                            setShowEventDetail(true);
                        }}
                        showDate
                    />)
                }
                <EventDetail
                    show={showEventDetail}
                    data={eventDetail ? [eventDetail] : undefined}
                    close={() => setShowEventDetail(false)}
                />
            </>
        }
    </div>;
}