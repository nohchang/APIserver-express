import Sequelize from 'sequelize'

export default {
    loginUser() {
        return `SELECT
            user_name
        FROM user
        WHERE user.user_id = :user_id
        AND user.user_password = :user_password
        `;
    },
    userCheckSingle() {
        return `SELECT
            user_name,
            user_phonenum
        FROM user
        WHERE user.user_id = :user_id
        AND user.on_use = 'yes'
        `;
    },
    getUserSingleDetail() {
        return `SELECT
            user.user_name,
            user.user_phonenum,
            user_detailinfo.user_address,
            user_detailinfo.user_desease_date,
            user_detailinfo.user_desease_info
        FROM user LEFT OUTER JOIN user_detailinfo
        ON user.user_id = user_detailinfo.user_id 
        WHERE user.user_id = :user_id
        AND user.on_use = 'yes'
        `;
    }
    // makeRelationSingle({patient_id, protector_id, relation_state}) {
    //     return `INSERT
    //     INTO user_relationship
    //         (patient_id, protector_id, relation_state) 
    //     VALUES (${patient_id}, ${protector_id}, ${relation_state})
    //     `
    // }
    // postUser({user_id, user_name, user_phonenum}) {
    //     return `
    //     INSERT
    //     INTO user (user_id, user_name, user_phonenum)
    //     VALUES (${user_id}, ${user_name}, ${user_phonenum})
    //     `
    // },
    // getAllUser() {
    //     return `
    //     SELECT
    //         *
    //     FROM
    //         user tt
    //     `
    // }
}

// INSERT INTO `acorn_backend`.`user_relationship` (`patient_id`, `protector_id`, `relation_state`, `created_at`) VALUES ('rdc-suxc0i3yu4', 'rds-sux7003yr2', 'patientSend', '1638176589');
//