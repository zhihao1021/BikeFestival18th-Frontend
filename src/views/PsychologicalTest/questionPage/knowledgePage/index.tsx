import { ReactNode } from "react";

import CacheImage from "@/utils/CacheImage";

import knowledges from "@/data/psychological-knowledge.json";

import bg from "@/assets/psychological-test/knowledge-bg.webp";
import lineBg from "@/assets/psychological-test/knowledge-line-bg.svg";
import buttonBg from "@/assets/psychological-test/button-bg.webp";

import style from "./index.module.scss";

type propsType = Readonly<{
    show: boolean,
    index: number,
    callback: () => void
}>

export default function KnowledgePage(props: propsType): ReactNode {
    const {
        show,
        index,
        callback
    } = props;

    return <div className={style.knowledge} data-show={show}>
        <CacheImage src={bg} className={style.bg} />
        <CacheImage src={lineBg} className={style.lineBg} />
        <h1>成大單車節</h1>
        <div className={style.arrowLine}>
            <svg viewBox="0 0 1000 10">
                <line x1="0" y1="5" x2="1000" y2="5" />
            </svg>
            <svg className={style.arrows} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 227.5 47.7">
                {
                    Array.from(Array(5)).map((_, index) => <polygon
                        key={index}
                        points={`${2.8 + 45.4 * index} 0 ${28 + 45.4 * index} 0 ${45.8 + 45.4 * index} 23.4 ${28 + 45.4 * index} 47.7 ${0.9 + 45.4 * index} 47.7 ${18.7 + 45.4 * index} 23.4 ${45.4 * index} 0 ${2.8 + 45.4 * index} 0`}
                        style={{ animationDelay: `${0.6 * index}s` }}
                    />)
                }
            </svg>
        </div>
        <div className={style.context}>
            <div>{knowledges[index]?.context}</div>
        </div>
        <div className={style.arrowLine} data-reverse>
            <svg viewBox="0 0 1000 10">
                <line x1="0" y1="5" x2="1000" y2="5" />
            </svg>
            <svg className={style.arrows} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 227.5 47.7">
                {
                    Array.from(Array(5)).map((_, index) => <polygon
                        key={index}
                        points={`${2.8 + 45.4 * index} 0 ${28 + 45.4 * index} 0 ${45.8 + 45.4 * index} 23.4 ${28 + 45.4 * index} 47.7 ${0.9 + 45.4 * index} 47.7 ${18.7 + 45.4 * index} 23.4 ${45.4 * index} 0 ${2.8 + 45.4 * index} 0`}
                        style={{ animationDelay: `${0.6 * index}s` }}
                    />)
                }
            </svg>
        </div>
        <div className={style.relativeBox}>
            {
                knowledges[index]?.relative.map((data, index) => <div key={data.title} className={style.box}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 131.4 131.4" style={{ animationDirection: index % 2 ? "reverse" : undefined }}>
                        <path d="M130.9,60.3c0-5.6-3.7-9.8-9.2-10.5-2.7-.4-5.3-.7-8-1-.5-1.7-1.2-3.4-2.1-5,1.7-2.2,3.4-4.4,4.9-6.3.7-1,1.2-1.9,1.5-2.5,0-.2.2-.3.3-.5l2.1-3.9-2.4-3.7c0-.1-.1-.3-.2-.4-.4-.7-1-1.8-2.1-2.9-2.2-2.3-4.5-4.6-6.7-6.8l-1-1c-4.2-4.1-9.4-4.5-14.1-.9-2.1,1.6-4.2,3.2-6.3,4.9-1.5-.8-3.2-1.5-5-2-.3-2.8-.7-5.5-1-7.9-.8-5.8-4.9-9.3-10.7-9.4-3.5,0-7,0-10.5,0-5.9,0-10,3.6-10.8,9.5-.3,2.4-.7,5.1-1,7.9-1.6.5-3.2,1.2-4.9,2-2.1-1.6-4.2-3.3-6.2-4.8h-.2c-4.5-3.6-9.9-3.3-14,.7-2.5,2.5-5,5-7.5,7.5-4.3,4.3-4.6,9.6-.9,14.4l1.4,1.8c1.1,1.5,2.3,3,3.5,4.5-.7,1.6-1.3,3.1-2,4.7-2.7.3-5.3.7-7.9,1h-.2c-5.8.8-9.4,4.9-9.5,10.8,0,3.5,0,6.9,0,10.4,0,6,3.6,10.1,9.5,10.8l1.3.2c2.2.3,4.3.6,6.5.8.6,1.8,1.3,3.4,2,4.8-1.7,2.1-3.3,4.3-5,6.5-3.2,4.2-2.8,10.1.9,13.9,2.5,2.5,5,5,7.5,7.5,4.3,4.3,9.6,4.7,14.5.9,2.1-1.6,4.2-3.3,6.3-4.9,1.7.7,3.2,1.4,4.7,2,.3,2.8.7,5.5,1,8.2.8,5.8,4.9,9.3,10.7,9.4,1.7,0,3.5,0,5.2,0s3.5,0,5.2,0c6,0,10-3.6,10.8-9.6l.3-2.8c.2-1.6.4-3.3.6-5,1.8-.6,3.4-1.3,4.9-2.1,1.7,1.4,3.4,2.7,5.1,4l1.3,1c4.5,3.5,9.9,3.2,14-.9,2.5-2.5,5.1-5.1,7.6-7.6,4.2-4.2,4.5-9.5.9-14.2-1.6-2.1-3.3-4.3-5-6.4.7-1.5,1.3-3.1,2-4.7,2.7-.3,5.4-.7,8.2-1,5.7-.8,9.3-4.8,9.3-10.6,0-3.6,0-7.2,0-10.8ZM84.4,65.3c.4,10.1-7.8,18.7-18.3,19.1h0c-4.7.2-9.3-1.5-12.9-4.8-3.8-3.5-6-8.3-6.3-13.5-.2-4.8,1.5-9.4,4.8-13,3.5-3.8,8.3-6,13.5-6.2.3,0,.5,0,.8,0,4.5,0,8.8,1.7,12.2,4.8,3.8,3.5,6,8.3,6.2,13.5Z" />
                    </svg>
                    <div className={style.text}>
                        <h2>{data.title}</h2>
                        <h3>{data.subtitle}</h3>
                    </div>
                </div>)
            }
        </div>
        <button onClick={callback}>
            <CacheImage src={buttonBg} />
            OKK!下一頁吧
        </button>
        <div className={style.footer}>單車十八 一起走吧</div>
    </div>
}