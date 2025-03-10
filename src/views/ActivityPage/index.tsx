import { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import activityDetail from "@/data/activityDetails.json";

import Category from "./Category";
import ActivityContent from "./ActivityContent";

export default function ActivityPage(): ReactNode {
    return <div className="page">
        <Routes>
            <Route path="" element={<Category />} />
            {
                Object.entries(activityDetail).map(([key, values]) => <Route
                    key={key}
                    path={`${key}/*`}
                    element={<ActivityContent path={key} data={values} />}
                />)
            }
            <Route path="*" element={<Navigate to="/activity" replace />} />
        </Routes>
    </div>
}