import { createContext } from "react";

const markedEventContext = createContext<{
    addEvent: (eventId: string) => void,
    removeEvent: (eventId: string) => void,
    switchEvent: (eventId: string) => void,
    markedEventIds: Array<string>,
}>({
    addEvent: () => undefined,
    removeEvent: () => undefined,
    switchEvent: () => undefined,
    markedEventIds: []
});

export default markedEventContext;
