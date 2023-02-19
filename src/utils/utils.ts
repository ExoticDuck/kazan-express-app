import moment from "moment";

export function s2ab(s: any) {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

export function formatDate(date: string) {
    return moment(date).format('DD.MM.YYYY');
}

export function isTokenAlive() {
    let currentDate = moment().unix()
    let expire_time = localStorage.getItem("token_expires_on")
    if(Number(expire_time) > currentDate) {
        return true;
    } else {
        localStorage.removeItem("access_token")
        return false;
    }
}
