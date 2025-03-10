import {
    CSSProperties,
    ReactNode,
    useCallback,
    useMemo,
    useState
} from "react";
import { Link } from "react-router-dom";

import style from "./index.module.scss";

type propsType = Readonly<{
    title: string,
    href: string,
    options: Array<{
        name: string,
        href: string,
        options?: Array<{
            name: string,
            href: string
        }>
    }>,
    closeTab: () => void
}>;

export default function NavBarDropDownMenu(props: propsType): ReactNode {
    const {
        title,
        href,
        options,
        closeTab
    } = props;

    const [open, setOpen] = useState<boolean>(false);

    const switchOpen = useCallback(() => {
        setOpen(value => !value);
    }, []);

    const textCount = useMemo(() => {
        let max = title.length;
        if (options.length > 0) {
            max += 1.75;
            max = Math.max(max, ...options.map(d => d.name.length));
        }
        return max;
    }, [title, options]);

    return <div
        className={style.dropDownMenu}
        style={{
            "--text-count": textCount
        } as CSSProperties}
    >
        <div className={style.titleBox}>
            <Link
                to={href}
                className={style.title}
                onClick={closeTab}
            >{title}</Link>
            {
                options.length === 0 ? undefined : <label className={style.icon}>
                    <input type="checkbox" checked={open} onChange={switchOpen} />
                    <span
                        className="ms"
                    >keyboard_arrow_down</span>
                </label>
            }
        </div>
        {
            options.length === 0 ? undefined : <div
                className={style.mask}
                style={{
                    "--option-count": options.length
                } as CSSProperties}
            >
                <div className={style.options}>
                    {
                        options.map(data => <Link
                            key={data.name}
                            to={data.href}
                            className={style.option}
                            onClick={closeTab}
                        >
                            {data.name}
                            {
                                data.options === undefined ? undefined : <div
                                    className={style.mask}
                                    style={{
                                        "--option-count": data.options.length
                                    } as CSSProperties}
                                >
                                    <div className={style.options}>
                                        {
                                            data.options.map(subOption => <Link
                                                key={subOption.name}
                                                to={data.href}
                                                className={style.option}
                                                onClick={closeTab}
                                            >{subOption.name}</Link>)
                                        }
                                    </div>
                                </div>
                            }
                        </Link>)
                    }
                </div>
            </div>
        }
    </div>
}