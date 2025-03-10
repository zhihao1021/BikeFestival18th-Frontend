import { ReactElement, ReactNode } from "react";

import LetterData from "@/schemas/letterData";

import style from "./index.module.scss";
import NoiseBackground from "@/components/NoiseBackground";

type propsType = Readonly<{
    data: LetterData
}>;

export default function LetterContent(props: propsType): ReactNode {
    const {
        data
    } = props;

    return <div className={style.letterContent}>
        <div className={style.context}>
            {
                data.content.split("</h>").reduce((pv, v, index) => {
                    let result: Array<ReactElement>;
                    if (v.includes("<h>")) {
                        const [priv, title] = v.split("<h>");
                        result = [
                            ...priv.split("\n").map((c, subIndex) => c ? <div
                                key={`${index}-${subIndex}`}
                            >{c}</div> : <br key={`${index}-${subIndex}`} />),
                            <h2 key={`${index}-h`}>{title}</h2>
                        ];
                    } else result = v.split("\n").map((c, subIndex) => c ? <div
                        key={`${index}-${subIndex}`}
                    >{c}</div> : <br key={`${index}-${subIndex}`} />)

                    return [...pv, ...result];
                }, [] as Array<ReactElement>)
            }

            <div className={style.footer}>Sincerely,<br/>{data.author}</div>
        </div>
        <NoiseBackground />
    </div>;
}