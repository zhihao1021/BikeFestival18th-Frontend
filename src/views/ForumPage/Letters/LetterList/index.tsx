import { ReactNode } from "react";

import LetterBox from "@/components/LetterBox";

import letters from "@/data/letters.json";

import style from "./index.module.scss";

export default function LetterList(): ReactNode {
    return <div className={style.letterList}>
        <div className={style.list}>
            {
                letters.map(data => <LetterBox
                    key={data.id}
                    data={data}
                />)
            }
        </div>
    </div>
}