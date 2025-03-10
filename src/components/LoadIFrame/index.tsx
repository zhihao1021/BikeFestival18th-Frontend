import { DetailedHTMLProps, IframeHTMLAttributes, useEffect, useMemo, useState } from "react";

import style from "./index.module.scss";

export default function LoadIFrame(props: DetailedHTMLProps<IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>) {
    const { src } = props;

    const [loaded, setLoaded] = useState<boolean>(false);

    const newProps = useMemo(() => {
        const result = Object.assign({}, props);
        if (props.className) result["className"] = `${style.loadIFrame} ${result.className}`;
        else result["className"] = style.loadIFrame;

        const onLoadFunc = props.onLoad;
        if (onLoadFunc) result["onLoad"] = event => {
            onLoadFunc(event);
            setLoaded(true);
        }
        else result["onLoad"] = () => setLoaded(true);

        return result;
    }, [props]);

    useEffect(() => {
        setLoaded(false);
    }, [src]);

    return <iframe {...newProps} data-loaded={loaded} />
}