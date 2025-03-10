import { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import DepartmentHdnoBookSideBar from "@/components/DepartmentHdnoBookSideBar";

import departments from "@/data/departments.json";

import CollegeList from "./CollegeList";

import style from "./index.module.scss";
import DepartmentDetail from "./DepartmentDetail";

export default function DepartmentHandBooks(): ReactNode {
    return <div className={style.departmentHandBooks}>
        <div className={style.box}>
            <DepartmentHdnoBookSideBar />
            <Routes>
                <Route path="" element={<CollegeList />} />
                {
                    departments.map(data => data.departments.map(dep => <Route
                        key={dep.id}
                        path={dep.id}
                        element={<DepartmentDetail
                            data={dep}
                            collegeName={data.college_name}
                        />}
                    />))
                }
                <Route path="*" element={<Navigate to="/forum/departments" replace />} />
            </Routes>
        </div>
    </div >
}