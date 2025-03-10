import axios from "axios";
import localforage from "localforage";
import {
    DetailedHTMLProps,
    HTMLAttributes,
    ReactNode,
    useEffect,
    useMemo,
    useState
} from "react";

import LoadingBackground from "@/components/LoadingBackground";

import style from "./index.module.scss";

const createdFiles: { [key: string]: string } = {};

type propsType = {
    pdfUrl: string
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

interface CachePDFData {
    updateTime: number,
    data: Blob
};

async function findCache(url: string): Promise<string> {
    if (createdFiles[url] !== undefined) return createdFiles[url];

    let data = await localforage.getItem<CachePDFData>(url);
    if (data === null || data.updateTime < PDF_LAST_CHANGE) {
        const response = await axios.get(url, { responseType: "blob" });
        data = {
            updateTime: Date.now(),
            data: response.data
        };
        await localforage.setItem(url, data);
    }

    createdFiles[url] = URL.createObjectURL(data.data);
    return createdFiles[url];
}

export default function CachePDF(props: propsType): ReactNode {
    const { pdfUrl } = props;

    const [newUrl, setNewUrl] = useState<string>("");

    const newProps = useMemo(() => {
        const result = Object.assign(
            Object.fromEntries(Object.entries(props)),
            {
                className: [props.className, style.cachePDF].join(" ").trim(),
            }
        );

        delete result["pdfUrl"];
        return result;
    }, [props]);

    useEffect(() => {
        setNewUrl("");
        findCache(pdfUrl).then(result => setNewUrl(result));
    }, [pdfUrl]);

    return <div {...newProps}>
        <object data={newUrl} type="application/pdf" />
        <LoadingBackground text="PDF 載入中" />
    </div>;
}