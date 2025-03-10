import { ReactNode, useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { addMark, getMarks, removeMark } from "@/api/markEvent";

import NavBar from "@/components/NavBar";
import BottomBar from "@/components/BottomBar";

import HomePage from "@/views/HomePage";
import AboutPage from "@/views/AboutPage";
import InformationPage from "@/views/InformationPage";
import ForumPage from "@/views/ForumPage";
import ActivityPage from "./views/ActivityPage";
import PartnersPage from "./views/PartnersPage";
import SouvenirPage from "./views/SouvenirPage";
import PsychologicalTest from "./views/PsychologicalTest";

import markedEventIdsContext from "@/context/markedEvents";

import cacheAll from "./utils/cacheAll";

import style from "./App.module.scss";

export function App(): ReactNode {
    const [loadingProgress, setLoadingProgress] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [scrollDown, setScrollDown] = useState<boolean>(false);
    const [pauseVideo, setPauseVideo] = useState<boolean>(false);

    const location = useLocation();

    useEffect(() => {
        const loadingElement = document.getElementById("ld");
        if (loadingElement === null) return;
        loadingElement.setAttribute("data-show", loading ? "true" : "false");
    }, [loading]);

    useEffect(() => {
        const loadingElement = document.getElementById("pg");
        if (loadingElement) loadingElement.style.setProperty("--pg", `${100 * loadingProgress}%`);

        const textElement = document.getElementById("pgb");
        if (textElement) textElement.textContent = `${Math.round(1000 * loadingProgress) / 10}%`;
    }, [loadingProgress]);

    useEffect(() => {
        // cacheAll().then(() => setLoading(false));
        cacheAll(setLoadingProgress).then(() => setLoading(false));
    }, []);

    if (location.pathname.includes("psychological-test"))
        return <PsychologicalTest loading={loading} />

    return loading ? undefined : <div
        className={style.app}
        onScroll={event => {
            const element = event.target as HTMLDivElement;
            if (!element) return;
            setScrollDown(element.scrollTop > 0);
            setPauseVideo(element.scrollTop > window.innerHeight);
        }}
        data-at-home={location.pathname === "/"}
        data-at-schedule={location.pathname.startsWith("/info/schedule") || location.pathname.startsWith("/info/my-schedule")}
    >
        <NavBar scrollDown={scrollDown} />
        <Routes>
            <Route path="/" element={<HomePage pauseVideo={pauseVideo} setPauseVideo={setPauseVideo} />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="info/*" element={<InformationPage />} />
            <Route path="activity/*" element={<ActivityPage />} />
            <Route path="forum/*" element={<ForumPage />} />
            <Route path="partners" element={<PartnersPage />} />
            <Route path="souvenir" element={<SouvenirPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <BottomBar />
    </div>
}

export default function WrapApp(): ReactNode {
    const [markedEventIds, setMarkedEventIds] = useState<Array<string>>([]);

    const updateMarkedList = useCallback(() => getMarks().then(setMarkedEventIds), []);

    const addEvent = useCallback((eventId: string) => {
        addMark(eventId).then(updateMarkedList);
    }, [updateMarkedList]);

    const removeEvent = useCallback((eventId: string) => {
        removeMark(eventId).then(updateMarkedList);
    }, [updateMarkedList]);

    const switchEvent = useCallback((eventId: string) => (
        markedEventIds.includes(eventId) ? removeMark : addMark
    )(eventId).then(updateMarkedList), [markedEventIds, updateMarkedList]);

    useEffect(() => { updateMarkedList(); }, [updateMarkedList]);

    return <markedEventIdsContext.Provider value={{
        addEvent: addEvent,
        removeEvent: removeEvent,
        switchEvent: switchEvent,
        markedEventIds: markedEventIds
    }}>
        <App />
    </markedEventIdsContext.Provider>
}