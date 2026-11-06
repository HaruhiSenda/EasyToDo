export const sortTasks = (tasks, rule, starTF) => {
    const sortedList = tasks.slice();
    if (rule === "id") {
        sortedList.sort((a, b) => {
            if (starTF && a.star !== b.star) {
                if (a.star === true) {
                    return -1;
                } else {
                    return 1;
                }
            };

            return b.id - a.id;
        });
    } else if (rule === "limit") {
        sortedList.sort((a, b) => {
            if (starTF && a.star !== b.star) {
                if (a.star === true) {
                    return -1;
                } else {
                    return 1;
                }
            };

            if (a.limit === null && b.limit !== null) {
                return 1;
            };

            if (b.limit === null && a.limit !== null) {
                return -1;
            };

            if (a.limit === null && b.limit === null) {
                return 0;
            };

            if (a.limit < b.limit) {
                return -1;
            };

            if (a.limit > b.limit) {
                return 1;
            };

            return 0;
        });
    };
    return sortedList;
};