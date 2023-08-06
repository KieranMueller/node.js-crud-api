const db = require('../db')

module.exports.getAllEmployees = async () => {
    const [records] = await db.query('SELECT * FROM employee')
    return records
}

module.exports.getEmployeeById = async id => {
    const [[record]] = await db.query('SELECT * FROM employee WHERE id = ?', [
        id,
    ])
    return record
}

module.exports.deleteEmployeeById = async id => {
    const [record] = await db.query('DELETE FROM employee WHERE id = ?', [id])
    return record.affectedRows
}

module.exports.addOrEditEmployee = async (obj, id = 0) => {
    const [[[{ affectedRows }]]] = await db.query(
        'CALL usp_employee_add_or_edit(?, ?, ?, ?)',
        [id, obj.name, obj.employee_code, obj.salary]
    )
    return affectedRows
}
