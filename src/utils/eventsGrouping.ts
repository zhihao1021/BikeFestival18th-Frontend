import EventData from "@/schemas/eventData";

function timeToIndex(timeString: string): number {
    const [h, m] = timeString.split(":");
    return (parseInt(h) - 8) * 60 + parseInt(m);
}

export default function groupingEvents(events: Array<EventData>): Array<Array<EventData>> {
    let result: Array<Array<EventData>> = [];
    const groupMap: { [key: string]: Array<number> } = Object.fromEntries(
        Array.from(new Set(events.map(data => data.project))).map(
            key => [key, Array.from(Array(540)).map(() => -1)]
        )
    );

    events.sort((data1, data2) => {
        const delta1 = timeToIndex(data1.endTime) - timeToIndex(data1.startTime);
        const delta2 = timeToIndex(data2.endTime) - timeToIndex(data2.startTime);
        return delta1 - delta2;
    }).forEach(event => {
        let startIndex = timeToIndex(event.startTime);
        let endIndex = timeToIndex(event.endTime);

        let existGroups = Array.from(
            new Set(groupMap[event.project].slice(startIndex, endIndex))
        ).filter(d => d !== -1);

        let replaceValue = existGroups[0] ?? result.length;
        if (startIndex > 0 && endIndex - startIndex < 30) {
            if (groupMap[event.project][startIndex - 1] !== -1)
                startIndex -= 1;
            if (groupMap[event.project][endIndex + 1] !== -1)
                endIndex += 1;
            existGroups = Array.from(
                new Set(groupMap[event.project].slice(startIndex, endIndex))
            ).filter(d => d !== -1);

            replaceValue = existGroups[0] ?? result.length;
        }

        if (existGroups.length > 1) {
            const replaceGroups = existGroups.slice(1);
            groupMap[event.project] = groupMap[event.project].map(
                d => replaceGroups.includes(d) ? replaceValue : d
            );
            result[replaceValue].push(...result.filter(
                (_, index) => replaceGroups.includes(index)
            ).reduce((v, v2) => [...v, ...v2]));
            result = result.filter((_, index) => !replaceGroups.includes(index));
            replaceGroups.forEach(v => Object.keys(groupMap).map(key => {
                groupMap[key] = groupMap[key].map(d => d > v ? d - 1 : d);
            }))
            replaceValue -= replaceGroups.filter(v => v < replaceValue).length;
        }

        groupMap[event.project] = groupMap[event.project].fill(replaceValue, startIndex, endIndex);
        if (existGroups.length === 0)
            result.push([event]);
        else result[replaceValue].push(event);
    });

    return result.map(data => data.sort((d1, d2) => {
        if (d1.startTime === d2.startTime)
            return parseInt(d1.endTime.replace(":", "")) - parseInt(d2.endTime.replace(":", ""));
        return parseInt(d1.startTime.replace(":", "")) - parseInt(d2.startTime.replace(":", ""));
    }));
}