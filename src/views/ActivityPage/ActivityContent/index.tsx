import { ReactElement, ReactNode, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import EventStrip from "@/components/EventStrip";
import EventDetail from "@/components/EventDetail";

import CacheImage from "@/utils/CacheImage";
import scrollToTop from "@/utils/scrollToTop";

import EventData from "@/schemas/eventData";
import ProjectData from "@/schemas/projectData";

import events from "@/data/events.json";

import style from "./index.module.scss";

type propsType = Readonly<{
    path: string,
    data: {
        title: string,
        imageURL: string,
        projects: Array<ProjectData>
    }
}>;

export default function ActivityContent(props: propsType): ReactNode {
    const {
        path,
        data
    } = props;

    const [currentProject, setCurrentProject] = useState<number>(0);
    const [eventDetail, setEventDetail] = useState<EventData>();
    const [showEventDetail, setShowEventDetail] = useState<boolean>(false);

    const location = useLocation();
    const navigate = useNavigate();

    const project: ProjectData | undefined = useMemo(
        () => data.projects[currentProject],
        [data, currentProject]
    );

    const relativeEvents = useMemo(
        () => project ? events.filter(data => data.project === project.subtitle).sort((event1, event2) => {
            if (event1.date === event2.date) {
                if (event1.startTime === event2.startTime)
                    return parseInt(event1.endTime.replace(":", "")) - parseInt(event2.endTime.replace(":", ""))
                return parseInt(event1.startTime.replace(":", "")) - parseInt(event2.startTime.replace(":", ""))
            }
            return Date.parse(event1.date) - Date.parse(event2.date)
        }) : [],
        [project]
    );

    useEffect(() => {
        if (data.projects.length === 1) setCurrentProject(0);

        const pathSplit = location.pathname.split("/");
        const projectId = parseInt(pathSplit[pathSplit.length - 1]);

        if (isNaN(projectId) || projectId >= data.projects.length) setCurrentProject(0);
        else setCurrentProject(projectId);
    }, [location, path, data]);

    useEffect(() => {
        if (currentProject === 0 && data.projects.length === 1) navigate(`/activity/${path}`, { replace: true });
        else navigate(`/activity/${path}/${currentProject}`, { replace: true });
        scrollToTop();
    }, [navigate, currentProject, data]);

    return <div className={style.activityContent}>
        {
            data.projects.length === 1 ? undefined : <div
                className={style.navigator}
            >
                <div className={style.navigatorBox}>
                    <h3>{data.title}</h3>
                    {
                        data.projects.map((data, index) => <Link
                            key={index}
                            to={`/activity/${path}/${index}`}
                            data-selected={index === currentProject}
                        >{data.subtitle}</Link>)
                    }
                </div>
            </div>
        }
        <div className={style.box}>
            <div className={style.titleBox}>
                <CacheImage
                    src={data.imageURL.replace("webp", "defer.webp")}
                    blurImage={data.imageURL.replace("webp", "blur.webp")}
                />
                <h2>{data.title}</h2>
                <h1>{project?.subtitle}</h1>
            </div>
            <h3>活動介紹</h3>
            <div className={style.intro}>
                {project?.intro.split("</b>").reduce((pv, v, index) => {
                    let result: Array<ReactElement> = [];
                    if (v.includes("<b>")) {
                        const [priv, colored] = v.split("<b>");
                        result = priv.includes("\n") ? [
                            ...priv.split("\n").map((c, subIndex) => c ? <div
                                key={`${index}-${subIndex}`}
                                data-tab={c.startsWith("\t")}
                            >{c}</div> : <br key={`${index}-${subIndex}`} />)
                        ] : [<span key={`${index}-0`}>{priv}</span>];

                        result.push(<span key={`${index}-h`} className={style.colored}>{colored}</span>);
                    } else if (v.includes("\n")) result = v.split("\n").map((c, subIndex) => c ? <div
                        key={`${index}-${subIndex}`}
                        data-tab={c.startsWith("\t")}
                    >{c}</div> : <br key={`${index}-${subIndex}`} />);
                    else result = [<span key={`${index}-0`}>{v}</span>];

                    return [...pv, ...result];
                }, [] as Array<ReactElement>)}
            </div>
            <div className={style.infoBlock}>
                <h3>活動地點</h3>
                <div className={style.context}>{project?.info}</div>
            </div>
            <div className={style.infoBlock}>
                <h3>報名方式</h3>
                <div className={style.context}>{project?.register}</div>
            </div>
            {
                relativeEvents.length === 0 ? undefined : <>
                    <h3>相關活動行程</h3>
                    <div className={style.relativeEvents}>
                        {
                            relativeEvents.map(data => <EventStrip
                                key={data.id}
                                data={data}
                                onClick={() => {
                                    setEventDetail(data);
                                    setShowEventDetail(true);
                                }}
                                showDate
                            />)
                        }
                    </div>
                    <EventDetail
                        show={showEventDetail}
                        data={eventDetail ? [eventDetail] : undefined}
                        close={() => setShowEventDetail(false)}
                    />
                </>
            }
        </div>
    </div>
}