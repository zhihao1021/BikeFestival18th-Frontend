import { CSSProperties, ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import CacheImage from "@/utils/CacheImage";

import questions from "@/data/psychological-questions.json"

import contextBg from "@/assets/psychological-test/context-bg.webp";
import startButton from "@/assets/psychological-test/startButton.svg";
import buttonBg from "@/assets/psychological-test/button.webp";
import cursor from "@/assets/psychological-test/cursor.webp";

import style from "./index.module.scss";
import KnowledgePage from "./knowledgePage";

type propsType = Readonly<{
    next: (result: number) => void
}>;

const timeMap = [
    49,
    ...questions.map(d => d.title.length + 10 + d.options.map(o => o.context.length).reduce((v, v2) => v + v2))
]

export default function QuestionPage(props: propsType): ReactNode {
    const { next } = props;

    const [showText, setShowText] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [end, setEnd] = useState<boolean>(false);
    const [knowledge, setKnowledge] = useState<boolean>(false);
    const [knowledgeIndex, setKnowledgeIndex] = useState<number>(0);
    const [nextPage, setNextPage] = useState<number>(0);

    const question = useMemo(() => {
        if (page < 1 || page > questions.length) return undefined;
        return questions[page - 1];
    }, [page]);

    const optionOffset1 = useMemo(() => {
        if (question)
            return showText - (question.title.length + 5);
        return -1;
    }, [question, showText]);

    const optionOffset2 = useMemo(() => {
        if (question)
            return optionOffset1 - (question.options[0].context.length + 5);
        return -1;
    }, [question, optionOffset1]);

    const showKnowledge = useCallback((next: number) => {
        setNextPage(next);
        setKnowledge(true);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setPage(pg => {
                setShowText(v => {
                    return v < timeMap[pg] ? v + 1 : v;
                })
                return pg;
            })
        }, 100);
    }, [showText]);

    useEffect(() => {
        setShowText(0);
    }, [page]);

    return <>
        <KnowledgePage show={knowledge} index={knowledgeIndex} callback={() => {
            setPage(nextPage);
            setKnowledge(false);
            setKnowledgeIndex(v => v + 1);
        }} />
        {page > 0 ? undefined : <div className={style.outlineText} data-show={page === 0}>
            <div>單車十八，一起走吧！</div>
            <div>2025 、03/08、03/09</div>
        </div>}
        <div className={style.contextBox} data-show={!end} style={{
            "--lines": question?.title.split("\n").length
        } as CSSProperties}>
            <CacheImage src={contextBg} className={style.contextBg} />
            <svg className={style.arrows} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 227.5 47.7">
                {
                    Array.from(Array(5)).map((_, index) => <polygon
                        key={index}
                        points={`${2.8 + 45.4 * index} 0 ${28 + 45.4 * index} 0 ${45.8 + 45.4 * index} 23.4 ${28 + 45.4 * index} 47.7 ${0.9 + 45.4 * index} 47.7 ${18.7 + 45.4 * index} 23.4 ${45.4 * index} 0 ${2.8 + 45.4 * index} 0`}
                        style={{ animationDelay: `${0.6 * index}s` }}
                    />)
                }
            </svg>
            <svg className={style.arrows} data-reverse xmlns="http://www.w3.org/2000/svg" viewBox="0 0 227.5 47.7">
                {
                    Array.from(Array(5)).map((_, index) => <polygon
                        key={index}
                        points={`${2.8 + 45.4 * index} 0 ${28 + 45.4 * index} 0 ${45.8 + 45.4 * index} 23.4 ${28 + 45.4 * index} 47.7 ${0.9 + 45.4 * index} 47.7 ${18.7 + 45.4 * index} 23.4 ${45.4 * index} 0 ${2.8 + 45.4 * index} 0`}
                        style={{ animationDelay: `${0.6 * index}s` }}
                    />)
                }
            </svg>
            <CacheImage src={cursor} className={style.cursor} data-show={page === 0} />
            {
                page === 0 ? <>
                    <h1>{"！孤島生存快逃!".slice(0, showText)}</h1>
                    <h2>{showText > 14 ? "修單幾勒...\n一覺醒來居然困在一座孤島上？！\n你/妳可以成功逃脫嗎？".slice(0, showText - 14) : ""}</h2>
                </> : <>
                    <div
                        className={style.description}
                        style={question ? {
                            "--count": Math.max(...question.title.split("\n").map(s => s.replace(".", "").length))
                        } as CSSProperties : undefined}
                    >{question?.title.slice(0, showText) ?? ""}</div>
                    <button
                        className={style.options}
                        data-show={optionOffset1 + 5 >= 0 && !end}
                        data-tf={optionOffset1 < 3}
                        onClick={question ? () => {
                            if (question.options[0].final) {
                                setPage(-1);
                                setEnd(true);
                                setTimeout(() => next(question.options[0].next), 700);
                                return;
                            }
                            showKnowledge(question.options[0].next);
                        } : undefined}
                        style={question ? {
                            "--count": Math.max(...question.options[0].context.split("\n").map(s => s.length))
                        } as CSSProperties : undefined}
                    >
                        <CacheImage src={buttonBg} />
                        <div>{(optionOffset1 >= 0 && question) ? question.options[0].context.slice(0, optionOffset1) : ""}</div>
                    </button>
                    <button
                        className={style.options}
                        data-show={optionOffset2 + 5 >= 0 && !end}
                        data-tf={optionOffset2 < 3}
                        onClick={question ? () => {
                            if (question.options[1].final) {
                                setPage(-1);
                                setEnd(true);
                                setTimeout(() => next(question.options[1].next), 700);
                                return;
                            }
                            showKnowledge(question.options[1].next);
                        } : undefined}
                        style={question ? {
                            "--count": Math.max(...question.options[1].context.split("\n").map(s => s.length))
                        } as CSSProperties : undefined}
                    >
                        <CacheImage src={buttonBg} />
                        <div>{(optionOffset2 >= 0 && question) ? question.options[1].context.slice(0, optionOffset2) : ""}</div>
                    </button>
                </>
            }
        </div>
        <button
            className={style.start}
            data-show={showText >= timeMap[0]}
            data-hide={page !== 0}
            onClick={() => setPage(1)}
        >
            <CacheImage src={startButton} />
            <div data-text="立即測驗">立即測驗</div>
        </button>
    </>
}