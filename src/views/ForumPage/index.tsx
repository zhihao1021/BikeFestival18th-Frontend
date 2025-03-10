import { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import DepartmentHandBooks from "./DepartmentHandBooks";
import Articles from "./Articles";
import Category from "./Category";
import Letters from "./Letters";

export default function ForumPage(): ReactNode {
    return <div className="page">
        <Routes>
            <Route path="" element={<Category />} />
            <Route path="departments/*" element={<DepartmentHandBooks />} />
            <Route path="articles/*" element={<Articles />} />
            <Route path="letters/*" element={<Letters />} />
            <Route path="*" element={<Navigate to="/forum" replace />} />
        </Routes>
    </div>
}