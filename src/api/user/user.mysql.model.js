'use strict';

import Sequelize, { CHAR, BOOLEAN, STRING, INTEGER, TEXT, ENUM } from 'sequelize'

module.exports = (sequelize) => {
    const user = sequelize.define(
        //객체 이름
        'user',
        //스키마 정의
        {
            user_name: {
                type: CHAR(36),
                allowNull: false,
                comment: 'user name'
            },
            user_phonenum: {
                type: CHAR(13),
                allowNull: false,
                unique: true,
                comment: 'unique user phonenum'
            },
            user_id: {
                type: CHAR(36),
                primaryKey: true,
                allowNull: false,
                comment: 'prime user id'
            },
            user_password: {
                type: CHAR(45),
                allowNull: false,
                comment: 'user password'
            },
            user_address: {
                type: CHAR(13),
                allowNull: false,
                comment: 'user address'
            }
        },
        //테이블 설정
        {
            tableName: 'user',
            freezeTableName: false,
            unserscored: false,
            timestamps: false
        }
    )
    //연관 관계 매핑 user.belongsTo(model.post,{foreignKey:"postId"})
    user.associate = (models) => {}

    return user
}