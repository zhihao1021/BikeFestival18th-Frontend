import { ReactNode, useEffect, useState } from "react";

import CacheImage from "@/utils/CacheImage";

import results from "@/data/psychological-result.json";

import outline from "@/assets/psychological-test/outline.svg";
import lineBg from "@/assets/psychological-test/line-bg.svg";

import QuestionPage from "./questionPage";
import ResultPage from "./resultPage";

import style from "./index.module.scss";
import { Link } from "react-router-dom";

type propsType = Readonly<{
    loading: boolean
}>;

export default function PsychologicalTest(props: propsType): ReactNode {
    const { loading } = props;

    const [section, setSection] = useState<number>(0);
    const [result, setResult] = useState<number>(0);
    const [showResult, setShowResult] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setShowResult(section === 2), 100);
    }, [section]);

    return <div className={style.psyTest}>
        <div className={style.content} data-section={section}>
            {
                section === 2 ? <>
                    <CacheImage
                        src={results[result].imageUrl.replace(".png", ".defer.png")}
                        blurImage={results[result].imageUrl.replace(".png", ".blur.webp")}
                        className={style.resultImg}
                        data-show={section === 2 && showResult}
                    />
                    <Link
                        to="/"
                        className={style.backToHome}
                        data-show={section === 2 && showResult}
                    >回到首頁</Link>
                </> : <>
                    <CacheImage className={style.outline} src={outline} />
                    <CacheImage className={style.lineBg} src={lineBg} />
                    {
                        loading ? undefined : [
                            <QuestionPage next={(result: number) => {
                                setResult(result);
                                setSection(1);
                            }} />,
                            <ResultPage
                                result={result}
                                next={() => setSection(2)}
                            />
                        ][section]
                    }
                </>
            }
        </div>
    </div>
}