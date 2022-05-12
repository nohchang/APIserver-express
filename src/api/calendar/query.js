export default {
    getCalendar() {
        return `SELECT
            year,
            month,
            day,
            time,
            capacity
        FROM calendar
        WHERE calendar.user_id = :user_id
        AND calendar.year = :year
        AND calendar.month = :month
        `
    }
}