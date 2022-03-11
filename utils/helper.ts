export const prefixZero = (num: number) => num < 10 ? `0${num}` : num

export const dateFormat = (date: Date | string) => {
    // 12-2-2565 15:20น.
    const _date = new Date(date)

    const d = _date.getDate()
    const m = _date.getMonth() + 1
    const y = _date.getFullYear()
    const h = _date.getHours()
    const _m = _date.getMinutes()

    console.log(d, m, y);
    

    return `${prefixZero(d)}-${prefixZero(m)}-${prefixZero(y)} ${prefixZero(h)}:${prefixZero(_m)}`

} 