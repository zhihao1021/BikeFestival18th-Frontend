import { ReactNode } from "react";

import MemberData from "@/schemas/memberData";

import style from "./index.module.scss";
import CacheImage from "@/utils/CacheImage";

type propsType = Readonly<{
    data: MemberData
}>;

export default function MemberCard(props: propsType): ReactNode {
    const {
        data
    } = props;

    return <div className={style.memberCard}>
        <div className={style.imgBlock}>
            <CacheImage src={data.imageURL} />
        </div>
        <div className={style.info}>
            <div className={style.title}>{`${data.department}‧${data.class}`}</div>
            <div className={style.name}>{data.name}</div>
            <div className={style.tags}>{data.tags}</div>
            {
                data.song ? <div className={style.song}>
                    <span className="ms">music_note</span>
                    <span>{data.song}</span>
                </div> : undefined
            }
        </div>
    </div>
}