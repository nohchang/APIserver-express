'use strict';

import Sequelize, { CHAR, BOOLEAN, STRING, INTEGER, TEXT, ENUM } from 'sequelize'
import user from '../user/user.mysql.model'

module.exports = (sequelize) => {
    const calendar = sequelize.define(
        //객체 이름
        'calendar',
        //스키마 정의
        {
            user_id: {
                type: CHAR(36),
                primaryKey: true,
                allowNull: false,
                references: {
                    model: user,
                    key: 'user_id',
                },
                comment: 'user id'
            },
            year: {
                type: CHAR(4),
                primaryKey: true,
                allowNull: false,
                comment: 'created year'
            },
            month: {
                type: CHAR(2),
                primaryKey: true,
                allowNull: false,
                comment: 'created month'
            },
            day: {
                type: CHAR(2),
                primaryKey: true,
                allowNull: false,
                comment: 'created day'
            },
            time: {
                type: CHAR(5),
                primaryKey: true,
                allowNull: false,
                comment: 'created time'
            },
            capacity: {
                type: CHAR(10),
                allowNull: false,
                comment: 'record capacity'
            }
        },
        //테이블 설정
        {
            tableName: 'calendar',
            freezeTableName: false,
            unserscored: false,
            timestamps: false
        }
    )
    //연관 관계 매핑 
    calendar.associate = (models) => {
        calendar.belongsTo(models.user, {
            onUpdate: 'cascade',
            onDelete: 'cascade',
            foreignKey: {
                name: 'user_id',
                primaryKey: true,
                allowNull: false,
            }
        })
    }

    return calendar
}