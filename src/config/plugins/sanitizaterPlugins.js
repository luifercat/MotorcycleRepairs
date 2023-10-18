import sanitizater from "perfect-express-sanitizer"

export const sanitizaterClear = () => {
    return sanitizater.clean({
        xss: true,
        noSql: true,
        sql: false //tener el false para evitar problemas formatDate
    })
}