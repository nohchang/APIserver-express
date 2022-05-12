import models from '../mysql.model.index'
import { logger } from '../../utils/winstonLogger'
import userQuery from './query';

import Sequelize from 'sequelize'

export default class UserService {
  constructor() {}
  /**
   * @title registUser
   * @description 사용자 가입
   * @return Success => {user_id}
   * @return Failure =>
   */
  async registUser(body) {
    try {
      const { user_name, user_phonenum, user_id, user_password, user_address } = body;
      await models.user.create(
        {
          user_name: user_name,
          user_phonenum: user_phonenum,
          user_id: user_id,
          user_password: user_password,
          user_address: user_address
        }
      )
      return {user_id: user_id};
    } catch (e) {
      logger.error(`[UserService][registUser] Error: ${e.message}`);
      throw e;
    }
  }
  
  /**
   * @title loginUser
   * @decription 사용자 로그인
   * @return Success => {user_name}
   * @return Failure =>
   */
  async loginUser(params) {
    try {
      const query = userQuery.loginUser()
      const [result] = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        raw: true,
        replacements: params,
      })
      if (!result) {
        logger.error(`[UserService][loginUser] Error: not detected or no user is found`);
        throw "not detected or no user is found";
      }
      return result;
    } catch (e) {
      logger.error(`[UserService][loginUser] Error: ${e.message}`);
      throw e;
    }
  }
}
