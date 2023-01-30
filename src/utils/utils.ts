export function s2ab(s: any) {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}