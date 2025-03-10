import {
    ReactNode,
} from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";

import Traffic from "./Traffic";
import Map from "./Map";
import Schedule from "./Schedule";

import style from "./index.module.scss";

const subPages = [
    {
        "icon": "directions_car",
        "name": "交通資訊",
        "href": "/info/traffic"
    },
    {
        "icon": "map",
        "name": "展場地圖",
        "href": "/info/map"
    },
    {
        "icon": "calendar_today",
        "name": "行程表",
        "href": "/info/schedule"
    },
    {
        "icon": "bookmark",
        "name": "我的行程",
        "href": "/info/my-schedule"
    }
]

export default function InformationPage(): ReactNode {
    const location = useLocation();

    return <div className={`page ${style.informationPage}`}>
        <div className={style.box}>
            <h1>參加資訊</h1>
            <div className={style.selections}>
                {
                    Array.from(Array(2)).map((_, index) => <div
                        key={index}
                        className={style.subPageGroup}
                    >{subPages.slice((index * subPages.length / 2), ((index + 1) * subPages.length / 2)).map(v => <Link
                        key={v.href}
                        to={v.href}
                        data-selected={location.pathname === v.href}
                    >
                        <span className={`ms ${style.icon}`}>{v.icon}</span>
                        <span className={style.name}>{v.name}</span>
                    </Link>)}</div>)
                }
            </div>
            <Routes>
                <Route path="" element={<Traffic />} />
                <Route path="traffic" element={<Traffic />} />
                <Route path="map" element={<Map />} />
                <Route path="schedule" element={<Schedule />} />
                <Route path="my-schedule" element={<Schedule />} />
                <Route path="*" element={<Navigate to="/info" replace />} />
            </Routes>
        </div>
    </div>
}