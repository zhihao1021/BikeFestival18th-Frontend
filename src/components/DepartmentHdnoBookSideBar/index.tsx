import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import scrollToTop from "@/utils/scrollToTop";

import departments from "@/data/departments.json";

import style from "./index.module.scss"

export default function DepartmentHdnoBookSideBar(): ReactNode {
    const [openCollege, setOpenCollege] = useState<number>(-1);

    const location = useLocation();

    useEffect(() => {
        departments.forEach((data, index) => {
            if (data.departments.some(data => location.pathname.endsWith(data.id))) {
                setOpenCollege(index)
            }
        })
    }, [location]);

    return <div className={style.dhpSideBar}>
        <Link to="/forum/departments"><h3>科系手冊</h3></Link>
        {
            departments.map((collegeData, index) => <div
                key={collegeData.college_name}
                className={style.college}
            >
                <label className={style.titleBox}>
                    <input
                        type="checkbox"
                        checked={openCollege === index}
                        onChange={() => setOpenCollege(v => v === index ? -1 : index)}
                    />
                    <span className={style.title}>{collegeData.short_name}</span>
                    <span className={`ms ${style.icon}`}>keyboard_arrow_right</span>
                </label>
                <div className={style.mask} style={{
                    "--department-count": collegeData.departments.length
                } as CSSProperties}>
                    <div className={style.content}>
                        {
                            collegeData.departments.map(departmentData => <Link
                                key={departmentData.id}
                                to={`/forum/departments/${departmentData.id}`}
                                onClick={scrollToTop}
                                data-selected={location.pathname.includes(departmentData.id)}
                            >{departmentData.name}</Link>)
                        }
                    </div>
                </div>
            </div>)
        }
    </div>
}