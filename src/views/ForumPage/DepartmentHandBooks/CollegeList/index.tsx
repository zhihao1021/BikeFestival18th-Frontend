import { ReactNode } from "react";

import CacheImage from "@/utils/CacheImage";
import scrollToTop from "@/utils/scrollToTop";

import departments from "@/data/departments.json";

import style from "./index.module.scss";
import { Link } from "react-router-dom";

export default function CollegeList(): ReactNode {
    return <div className={style.collegeList}>
        <h1>科系手冊</h1>
        <div className={style.colleges}>
            {
                departments.map(data => <div
                    key={data.college_name}
                    className={style.college}
                >
                    <div className={style.imgBlock}>
                        <CacheImage src={data.photoURL} />
                    </div>
                    <div className={style.detail}>
                        <h2 className={style.name}>
                            {data.college_name}
                        </h2>
                        <div className={style.description}>
                            {data.description}
                        </div>
                        <div className={style.links}>
                            {data.departments.map(dep => <Link
                                key={dep.id}
                                to={dep.id}
                                onClick={scrollToTop}
                            >{dep.name}</Link>)}
                        </div>
                    </div>
                </div>)
            }
        </div>
    </div>
}