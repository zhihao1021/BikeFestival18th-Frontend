async function getMarks(): Promise<Array<string>> {
    return JSON.parse(localStorage.getItem("markEvents") ?? "[]");
}

async function addMark(eventId: string) {
    let originData = JSON.parse(localStorage.getItem("markEvents") ?? "[]") as Array<string>;
    try {
        originData.push(eventId);
    }
    catch {
        originData = [eventId];
    }

    localStorage.setItem("markEvents", JSON.stringify(originData));
}

async function removeMark(eventId: string) {
    let originData = JSON.parse(localStorage.getItem("markEvents") ?? "[]") as Array<string>;
    try {
        originData = originData.filter(v => v !== eventId);
    }
    catch {
        originData = [];
    }

    localStorage.setItem("markEvents", JSON.stringify(originData));
}

export {
    getMarks,
    addMark,
    removeMark
};
