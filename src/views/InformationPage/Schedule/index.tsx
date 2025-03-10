import {
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";
import { useLocation } from "react-router-dom";

import EventDetail from "@/components/EventDetail";
import LoadingBackground from "@/components/LoadingBackground";

import markedEventContext from "@/context/markedEvents";

import scrollToTop from "@/utils/scrollToTop";

import EventData from "@/schemas/eventData";

import events from "@/data/events.json";
import activityCategory from "@/data/activityCategory.json";

import Calendar from "./Calendar";
import ListView from "./ListView";

import style from "./index.module.scss";

interface Filter {
    notNeedSignUp: boolean,
    canSignUp: boolean,
    signUpEnd: boolean,
    projects: Array<boolean>;
};

const dateList = Array.from(new Set(events.map(data => data.date))).sort();
const projectList = Object.values(activityCategory).reduce((v1, v2) => [...v1, ...v2]);

export default function Schedule(): ReactNode {
    const [day, setDay] = useState<number>(0);
    const [detail, setDetail] = useState<Array<EventData>>([]);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [gridView, setGridView] = useState<boolean>(true);
    const [onTop, setOnTop] = useState<boolean>(window.screenY === 0);

    const [filter, setFilter] = useState<Filter>({
        notNeedSignUp: true,
        canSignUp: true,
        signUpEnd: true,
        projects: projectList.map(() => true)
    });

    const {
        markedEventIds
    } = useContext(markedEventContext);

    const location = useLocation();

    const mySchedule = useMemo(() => location.pathname.includes("my-schedule"), [location]);
    const showEvents = useMemo(() => {
        let result = events.filter(data => dateList.indexOf(data.date) === day);
        if (mySchedule) result = result.filter(data => markedEventIds.includes(data.id));

        if (!filter.notNeedSignUp) result = result.filter(data => data.link !== "");
        if (!filter.canSignUp) result = result.filter(data => data.signupEnd === "" || Date.parse(data.signupEnd) < Date.now());
        if (!filter.signUpEnd) result = result.filter(data => data.signupEnd === "" || Date.parse(data.signupEnd) > Date.now());
        const displayProjects = projectList.filter((_, index) => filter.projects[index]);
        result = result.filter(data => displayProjects.includes(data.project));

        result.sort((a, b) => {
            if (a.startTime === b.startTime)
                return projectList.indexOf(a.project) - projectList.indexOf(b.project);
            return parseInt(a.startTime.replace(":", "")) - parseInt(b.startTime.replace(":", ""));
        })
        return result;
    }, [day, markedEventIds, mySchedule, filter]);

    const scrollToTopIcon = useCallback(() => {
        setOnTop(window.scrollY === 0);
    }, []);

    useEffect(() => scrollToTop(), [day, mySchedule, gridView]);
    useEffect(() => window.addEventListener("scroll", scrollToTopIcon), [scrollToTop])
    useEffect(() => () => window.removeEventListener("scroll", scrollToTopIcon), [scrollToTop])

    return <div className={style.schedule}>
        <div className={style.daySelector}>
            {dateList.map((date, index) => <button
                key={date}
                onClick={() => setDay(index)}
                data-selected={day === index}
            >DAY {index + 1} {date.split("/").map(v => v.padStart(2, "0")).join("/")}</button>)}
        </div>
        <div className={style.functionBar}>
            <div className={style.stickyBox}>
                <div className={style.functions}>
                    <div
                        className={`ms ${style.scrollToTop}`}
                        data-on-top={onTop}
                        onClick={scrollToTop}
                    >keyboard_arrow_up</div>
                    <label className={`ms-p ${style.filter}`}>
                        <input type="checkbox" />
                        <div className={style.container} onClick={e => {
                            const element = e.target as HTMLElement;
                            if (element.classList.contains(style.container)) e.preventDefault();
                        }}>
                            <div className={style.classBlock}>
                                <div className={style.filterClass}>報名狀態</div>
                                <label className="ms-p">
                                    <input
                                        type="checkbox" checked={filter.notNeedSignUp}
                                        onChange={e => setFilter(v => {
                                            const nv = Object.assign({}, v);
                                            nv.notNeedSignUp = e.target.checked;
                                            return nv;
                                        })}
                                    />
                                    <div>不須報名</div>
                                </label>
                                <label className="ms-p">
                                    <input
                                        type="checkbox" checked={filter.canSignUp}
                                        onChange={e => setFilter(v => {
                                            const nv = Object.assign({}, v);
                                            nv.canSignUp = e.target.checked;
                                            return nv;
                                        })}
                                    />
                                    <div>報名中</div>
                                </label>
                                <label className="ms-p">
                                    <input
                                        type="checkbox" checked={filter.signUpEnd}
                                        onChange={e => setFilter(v => {
                                            const nv = Object.assign({}, v);
                                            nv.signUpEnd = e.target.checked;
                                            return nv;
                                        })}
                                    />
                                    <div>報名結束</div>
                                </label>
                            </div>
                            <div className={style.classBlock}>
                                <div className={style.filterClass}>活動分類</div>
                                {
                                    projectList.map((value, index) => <label key={value} className="ms-p">
                                        <input
                                            type="checkbox" checked={filter.projects[index]}
                                            onChange={e => setFilter(v => {
                                                const nv = Object.assign({}, v);
                                                nv.projects[index] = e.target.checked;
                                                return nv;
                                            })}
                                        />
                                        <div>{value}</div>
                                    </label>)
                                }
                            </div>
                        </div>
                    </label>
                    <label className={`ms-p ${style.viewMode}`}>
                        <input type="checkbox" checked={gridView} onChange={e => setGridView(e.target.checked)} />
                    </label>
                </div>
            </div>
        </div>
        {
            showEvents.length === 0 ? <div className={style.loading}><LoadingBackground
                text="目前還沒有行程喔，快去添加吧！"
                color="#666"
                replaceText
                noBackground
            /></div> : gridView ? <Calendar
                events={showEvents}
                showDetails={(events: Array<EventData>) => {
                    setDetail(events);
                    setShowDetail(true);
                }}
            /> : <ListView
                events={showEvents}
                showDetails={(events: Array<EventData>) => {
                    setDetail(events);
                    setShowDetail(true);
                }}
            />
        }
        <EventDetail
            show={showDetail}
            data={detail}
            close={() => setShowDetail(false)}
        />
    </div>
}