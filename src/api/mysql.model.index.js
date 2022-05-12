'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
const basename = path.basename(__filename);
const config = require('../../env/database.config');
// const os = require('os');
// console.log(os.networkInterfaces())
const db = {};
const isLogging =
  !process.env.DB_LOG || process.env.DB_LOG !== 'true' ? false : true;

// console.log(process.env.DB_LOG)

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    database: config.database,
    username: config.username,
    password: config.password,
    dialect: config.dialect,
    logging: isLogging,
    timezone: '+09:00',
  });
}

// file 글자 하나하나가 array에 쪼개져서 들어감
fs.readdirSync(__dirname)
  .filter((file) => {
    // console.log(1)
    // console.log(basename)
    return (
      file.slice(-3) !== '.js'
    )
  })
  //반복문을 돌면서 현재 폴더 내의 모든 파일 불러오기
  .forEach((folder) => {
    fs.readdirSync(path.join(__dirname, folder)).filter((file) => {
        if (file.indexOf('.') !== 0 &&
            file !== basename &&
            //mysql-15-14-13-12-11-10-9-8-7-6-5-4-3-2-1
            file.slice(-15, -9) === '.mysql' &&
            file.slice(-9, -3) === '.model' &&
            file.slice(-3) === '.js') {
                // const model = sequelize['import'](path.join(__dirname, folder,file))
                const model = require(path.join(__dirname, folder, file))(sequelize, Sequelize);
                db[model.name] = model;
            }
    })
  });

  //모델 사이의 관계 정의
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
