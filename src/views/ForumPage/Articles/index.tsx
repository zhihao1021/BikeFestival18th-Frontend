import { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import articles from "@/data/articles.json";

import ArticleList from "./ArticleList";
import ArticleContent from "./ArticleContent";

import style from "./index.module.scss";

export default function Articles(): ReactNode {
    return <div className={style.articles}>
        <div className={style.box}>
            <Routes>
                <Route path="/*" element={<ArticleList />} />
                <Route path="category/*" element={<ArticleList />} />
                {
                    articles.map(data => <Route
                        key={data.id}
                        path={data.id}
                        element={<ArticleContent data={data} />}
                    />)
                }
                <Route path="*" element={<Navigate to="/forum/articles" replace />} />
            </Routes>
        </div>
    </div>;
}
