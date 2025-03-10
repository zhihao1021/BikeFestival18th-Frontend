import { ReactNode, useMemo } from "react";
import { Link } from "react-router-dom";

import CacheImage from "@/utils/CacheImage";
import scrollToTop from "@/utils/scrollToTop";
import randomChoice from "@/utils/randomChoice";

import HomeEventBox from "@/components/HomeEventBox";

import gear from "@/assets/home/gear2.svg";

import activities from "@/data/activities.json";

import style from "./index.module.scss";

export default function Events(): ReactNode {
    const displayEvents = useMemo(() => {
        return randomChoice(activities, 3);
    }, []);

    return <div className={style.events}>
        <div className={style.box}>
            <div className={style.smallTitle}>
                <CacheImage src={gear} />
                <span>Events</span>
            </div>
            <h2>主題活動</h2>
            <div className={style.content}>
                <div className={style.eventList}>
                    {
                        displayEvents.map(data => <HomeEventBox
                            key={data.title}
                            data={data}
                        />)
                    }
                </div>
                <Link to="/activity" className={style.seeMore} onClick={scrollToTop} >
                    <span className="ms">arrow_right_alt</span>
                    <span>查看更多</span>
                </Link>
            </div>
        </div>
    </div>
}