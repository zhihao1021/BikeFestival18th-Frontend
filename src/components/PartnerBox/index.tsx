import { ReactNode, useState } from "react";

import PartnerData from "@/schemas/partnerData";

import style from "./index.module.scss"
import CacheImage from "@/utils/CacheImage";

type propsType = Readonly<{
    data: PartnerData
}>;

export default function PartnerBox(props: propsType): ReactNode {
    const {
        data
    } = props;

    const [show, setShow] = useState<boolean>(false);

    if (data.link === "" && !data.intro) return <div
        className={style.partnerBox}
    >
        <CacheImage src={data.imageURL} />
    </div>

    if (!data.intro) return <a
        className={style.partnerBox}
        href={data.link}
        target="_blank"
        referrerPolicy="no-referrer"
    ><CacheImage src={data.imageURL} /></a>

    return <div className={style.partnerBox}>
        <CacheImage src={data.imageURL} onClick={() => setShow(true)} />
        <div
            className={style.detail}
            data-show={show}
            onClick={event => {
                const element = event.target as HTMLElement;
                if (element.classList.contains(style.detail)) setShow(false);
            }}
        >
            <div className={style.box}>
                <button
                    className={`ms ${style.close}`}
                    onClick={() => setShow(false)}
                >close</button>
                <CacheImage src={data.imageURL} />
                <div className={style.info}>
                    <div className={style.titleBox}>
                        <h2>贊助廠商 - {data.name}</h2>
                        <h3>{data.intro.subtitle}</h3>
                    </div>
                    <div className={style.text}>
                        <div className={style.context}>
                            {data.intro.context.split("\n").map((text, index) => {
                                return text === "" ? <br key={index} /> : text.startsWith("\b") ?
                                    <h4 key={index}>{text.replace("\b", "")}</h4> : text.startsWith("<img>") ? <CacheImage
                                        key={index}
                                        src={text.replace("<img>", "")}
                                    /> : <div key={index}>{text}</div>
                            })}
                        </div>
                        <div className={style.links}>
                            {
                                Object.entries(data.intro.links).map(([key, url]) => <div
                                    key={key}
                                    className={style.link}
                                >
                                    <span>{key}</span>
                                    {
                                        url?.startsWith("http") ? <a
                                            href={url}
                                            target="_blank"
                                            referrerPolicy="no-referrer"
                                        >{url ? url.split("?")[0] : ""}</a> : <span>{url}</span>
                                    }
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}