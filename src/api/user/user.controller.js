import UserService from './user.service'
import { Container } from 'typedi'

let UserServiceContainer = Container.get(UserService);
export default [
    /**
     * @title /users/register
     * @method POST 
     * @description registUser
     */
    {
        path: '/users/register',
        method: 'post',
        beforeService: [],
        afterService: [],
        controller: async (req, res, next) => {
            try {
                const resultData = await UserServiceContainer.registUser(
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
     * @title /users/login/:user_id/:user_password
     * @method GET 
     * @description loginUser
     */
    {
        path: '/users/login/:user_id/:user_password',
        method: 'get',
        beforeService: [],
        afterService: [],
        controller: async (req, res, next) => {
            try {
                const resultData = await UserServiceContainer.loginUser(
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
]