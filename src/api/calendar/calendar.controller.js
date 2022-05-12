import CalendarService from './calendar.service'
import { Container } from 'typedi'

let CalendarServiceContainer = Container.get(CalendarService);
export default [
    /**
     * @title /calendar/recorder
     * @method POST 
     * @description 달력 생성
     */
    {
        path: '/calendar/recorder',
        method: 'post',
        beforeService: [],
        afterService: [],
        controller: async (req, res, next) => {
            try {
                const resultData = await CalendarServiceContainer.recordCalendar(
                    req.body
                )
                
                return res.status(200).json({
                    resultMessage: 'success',
                    resultCode: 200,
                    resultData: resultData
                })
            } catch (error) {
                console.log(error)
                return res.status(500).json({
                    resultMessage: 'failure',
                    resultCode: 500,
                    resultData: error
                })
            }
        }
    },

    /**
     * @title /calendar/:user_id/:year/:month
     * @method GET 
     * @description 달력 조회
     */
    {
        path: '/calendar/:user_id/:year/:month',
        method: 'get',
        beforeService: [],
        afterService: [],
        controller: async (req, res, next) => {
            try {
                const resultData = await CalendarServiceContainer.getCalendar(
                    req.params
                )
                return res.status(200).json({
                    resultMessage: 'success',
                    resultCode: 200,
                    resultData: resultData
                })
            } catch (error) {
                console.log(error)
                return res.status(500).json({
                    resultMessage: 'failure',
                    resultCode: 500,
                    resultData: error
                })
            }
        }
    },

    /**
     * @title /calendar/recorder
     * @method PUT 
     * @description 달력 업데이트
     */
    {
        path: '/calendar/recorder',
        method: 'put',
        beforeService: [],
        afterService: [],
        controller: async (req, res, next) => {
            try {
                const resultData = await CalendarServiceContainer.updateCalendar(
                    req.body
                )
                return res.status(200).json({
                    resultMessage: 'success',
                    resultCode: 200,
                    resultData: resultData
                })
            } catch (error) {
                console.log(error)
                return res.status(500).json({
                    resultMessage: 'failure',
                    resultCode: 500,
                    resultData: error
                })
            }
        }
    },

    /**
     * @title /calendar/recorder
     * @method DELETE 
     * @description 달력 삭제
     */
    {
        path: '/calendar/recorder',
        method: 'delete',
        beforeService: [],
        afterService: [],
        controller: async (req, res, next) => {
            try {
                const resultData = await CalendarServiceContainer.deleteCalendar(
                    req.body
                )
                return res.status(200).json({
                    resultMessage: 'success',
                    resultCode: 200,
                    resultData: resultData
                })
            } catch (error) {
                console.log(error)
                return res.status(500).json({
                    resultMessage: 'failure',
                    resultCode: 500,
                    resultData: error
                })
            }
        }
    }
]