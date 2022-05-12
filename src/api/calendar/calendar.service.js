import models from '../mysql.model.index'
import { logger } from '../../utils/winstonLogger'
import calendarQuery from './query'

import Sequelize from 'sequelize'

export default class CalendarService {
    constructor() {}

    /**
     * @title recordCalendar
     * @description 달력 생성
     * @return Sucess => 
     * @return Failure => 
     */
    async recordCalendar(body) {
        try {
            const { user_id, year, month, day, time, capacity } = body;
            await models.calendar.create({
                user_id,
                year,
                month,
                day,
                time,
                capacity
            })
        return true;
        } catch (e) {
            logger.error(`[CalendarService][recordCalendar] Error: ${e.message}`)
            throw e
        }
    }

    /**
     * @title getCalendar
     * @description 달력 조회
     * @return Success =>
     * @returm Failure =>
     */
    async getCalendar(params) {
        try {
            const query = calendarQuery.getCalendar()
            const result = await models.sequelize.query(query, {
                type: models.sequelize.QueryTypes.SELECT,
                raw: true,
                replacements: params,
            })
            return result
        } catch (e) {
            logger.error(`[CalendarService][getCalendar] Error: ${e.message}`)
            throw e
        }
    }

    /**
     * @title updateCalendar
     * @description 달력 업데이트
     * @return success =>
     * @return failure =>
     */
    async updateCalendar(body) {
        const transaction = await models.sequelize.transaction()
        try {
            const { user_id, year, month, day, time, capacity, pre_time } = body
            const result = await models.calendar.findAll(
                {
                    where: {
                        user_id, year, month, day, time: pre_time
                    }
                },
                { transaction }
            )
            if (result.length !== 0) {
                await models.calendar.update(
                    {
                        time, capacity
                    },{
                        where: {
                            user_id, year, month, day, time: pre_time
                        }
                    },
                    { transaction }
                )
            } else {
                throw "update_error_need_rollback"
            }

            await transaction.commit()
            return true
        } catch (e) {
            await transaction.rollback()
            logger.error(`[CalendarService][updateCalendar] Error: ${e.message}`)
            throw e
        }
    }

    /**
     * @title deletaCalendar
     * @description 달력 삭제
     * @return success =>
     * @return failure =>
     */
    async deleteCalendar(body) {
        const transaction = await models.sequelize.transaction()
        try {
            const { user_id, year, month, day, time } = body
            let result
            const data = await models.calendar.findAll(
                {
                    where: {
                        user_id, year, month, day, time
                    }
                },
                { transaction }
            )
            if (data.length === 0) {
                throw "nothing_to_delete"
            } else {
                result = await models.calendar.destroy(
                    {
                        where: {
                            user_id, year, month, day, time
                        }
                    },
                    { transaction }
                )
            }
            await transaction.commit()
            return result
        } catch (e) {
            await transaction.rollback()
            logger.error(`[CalendarService][deleteCalendar] Error: ${e.message}`)
            throw e
        }
    }
}
