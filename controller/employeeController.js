const express = require('express'),
    router = express.Router()

const service = require('../service/employeeService')

/* GET http://localhost:3000/api/employees */
router.get('/', async (req, res) => {
    const employees = await service.getAllEmployees()
    res.send(employees)
})

/* GET http://localhost:3000/api/employees/{id} */
router.get('/:id', async (req, res) => {
    const employee = await service.getEmployeeById(req.params.id)
    if (employee === undefined)
        res.status(404).json('unable to find employee with id ' + req.params.id)
    res.send(employee)
})

/* DELETE http://localhost:3000/api/employees/{id} */
router.delete('/:id', async (req, res) => {
    const affectedRows = await service.deleteEmployeeById(req.params.id)
    if (affectedRows === 0)
        res.status(404).json('unable to find employee with id ' + req.params.id)
    else res.send('deleted successfully')
})

/* POST http://localhost:3000/api/employees */
router.post('/', async (req, res) => {
    await service.addOrEditEmployee(req.body)
    res.status(201).send('created successfully')
})

/* PUT http://localhost:3000/api/employees/{id} */
router.put('/:id', async (req, res) => {
    const affectedRows = await service.addOrEditEmployee(
        req.body,
        req.params.id
    )
    if (affectedRows === 0)
        res.status(404).json('unable to find employee with id ' + req.params.id)
    else res.send('updated successfully')
})

module.exports = router
