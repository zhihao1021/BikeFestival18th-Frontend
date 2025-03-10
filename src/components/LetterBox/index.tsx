import { ReactNode } from "react";
import { Link } from "react-router-dom";

import scrollToTop from "@/utils/scrollToTop";

import LetterData from "@/schemas/letterData";

import style from "./index.module.scss";

type propsType = Readonly<{
    data: LetterData
}>;

export default function LetterBox(props: propsType): ReactNode {
    const {
        data
    } = props;

    return <Link to={`/forum/letters/${data.id}`} className={style.letterBox} onClick={scrollToTop}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 243 210">
            <rect x="1" y="55" width="241" height="155" rx="5" fill="#2DAAC0" shapeRendering="crispEdges" />
            <path fill="#168499" d="M5.6,53.7C2.5,53.7,0,56.2,0,59.2v14.9C0,76.7,1.8,79,4.3,79.5l117.4,27.4c.8.2,1.7.2,2.6,0l114.4-27.4c2.5-.6,4.3-2.8,4.3-5.4v-14.9c0-3.1-2.5-5.6-5.6-5.6H5.6Z" />
            <rect x="31.5" y="85" width="180" height="100" rx="2" fill="#F8E8DF" shapeRendering="crispEdges" />
            <path fill="#33a1b6" d="M238.7,79.6l-114.4,27.4c-.8.2-1.7.2-2.6,0L4.3,79.5c-1.7-.4-3.1-1.6-3.8-3.1v128.8c0,2.8,2.3,5.1,5.1,5.1h231.9c2.8,0,5.1-2.3,5.1-5.1V76.4c-.7,1.5-2,2.7-3.8,3.1Z" />
            <path stroke="#f4f4f5" fill="none" d="M5.6,53.7c-3.1,0-5.6,2.5-5.6,5.6v14.9c0,2.6,1.8,4.8,4.3,5.4l117.4,27.4c.8.2,1.7.2,2.6,0l114.4-27.4c2.5-.6,4.3-2.8,4.3-5.4v-14.9c0-3.1-2.5-5.6-5.6-5.6H5.6Z" />
            <path style={{ transformOrigin: "0 25.5%" }} stroke="#f4f4f5" fill="#d9b43e" d="M5.6,53.7c-3.1,0-5.6,2.5-5.6,5.6v14.9c0,2.6,1.8,4.8,4.3,5.4l117.4,27.4c.8.2,1.7.2,2.6,0l114.4-27.4c2.5-.6,4.3-2.8,4.3-5.4v-14.9c0-3.1-2.5-5.6-5.6-5.6H5.6Z" />
        </svg>
        <h2>{`FROM ${data.title}`}</h2>
    </Link>
}