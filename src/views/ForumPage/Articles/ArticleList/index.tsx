import { ReactNode, useEffect } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

import articleCategoryMap from "../articleCategoryMap";

import ArticleBlock from "@/components/ArticleBlock";

import style from "./index.module.scss";

export default function ArticleList(): ReactNode {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === "/forum/articles") navigate(
            "category",
            {
                replace: true,
                viewTransition: false
            }
        );
    }, [location, navigate]);

    return <div className={style.articleList}>
        <h1>專欄文章</h1>
        <div className={style.categoryList}>
            {
                Object.keys(articleCategoryMap).map((value, index) => <Link
                    key={value}
                    to={`/forum/articles/category/${index}`}
                ><h3
                    className={style.category}
                    data-selected={location.pathname.endsWith(`${index}`)}
                >{value}</h3></Link>)
            }
        </div>
        <div className={style.articles}>
            <Routes>
                <Route
                    path=""
                    element={Object.values(articleCategoryMap)[0].map(
                        data => <ArticleBlock key={data.id} data={data} />
                    )}
                />
                {
                    Object.values(articleCategoryMap).map((articles, index) => <Route
                        key={index}
                        path={`${index}`}
                        element={articles.map(data => <ArticleBlock key={data.id} data={data} />)}
                    />)
                }
                <Route path="*" element={<Navigate to="/forum/articles/category" />} />
            </Routes>
        </div>
    </div>;
}