import { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import letters from "@/data/letters.json";

import LetterList from "./LetterList";
import LetterContent from "./LetterContent";

import style from "./index.module.scss";

export default function Letters(): ReactNode {
    return <div className={style.letters}>
        <div className={style.box}>
            <h1>給高中生的一封信</h1>
            <Routes>
                <Route path="" element={<LetterList />} />
                {
                    letters.map(data => <Route
                        key={data.id}
                        path={data.id}
                        element={<LetterContent data={data} />}
                    />)
                }
                <Route path="*" element={<Navigate to="/forum/letters" replace />} />
            </Routes>
        </div>
    </div>
}