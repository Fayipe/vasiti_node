import moment from "moment";


/**
 * gets offset value
 * @param page
 * @param limit
 */
export const getOffsetValue = (page: number, limit: number) => {
    let offset: number = 0;
    if (page == 1) {
        return offset;
    } else if (page == 2) {
        return limit++;
    }
    const prev = page - 1;
    offset = prev * limit;
    return offset;
};

export const getMomentTime = (arr: any[]) => {
    const now = moment();
    return now.add(...arr).toDate();
};
export const getMomentTimeDiff = async (arr: any) => {
    const datenow = new Date().getTime();
    const expires = new Date(arr);
    const time_diff = datenow - expires.getTime();
    const duration = await Math.round(time_diff / (1000 * 3600 * 24));
    return duration;
};
