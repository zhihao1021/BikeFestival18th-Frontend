import { ReactNode, useMemo } from "react";

import style from "./index.module.scss"
import EventData from "@/schemas/eventData";

type propsType = Readonly<{
    data: EventData,
    className?: string
}>;

export default function SignupIcon(props: propsType): ReactNode {
    const { data, className } = props;

    const status = useMemo(() => {
        if (data.link === "") return 0;
        const signupEnd = data.signupEnd || `${YEAR}/${data.date} ${data.startTime}`;
        return Date.parse(signupEnd) > Date.now() ? 1 : 2
    }, [data]);

    return <div className={style.signupIcon + (className ? ` ${className}` : "")} data-status={status}>
        <span>{["不須報名", "報名中", "報名結束"][status]}</span>
        <span className="ms">touch_app</span>
    </div>;
}