const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  if (!employees) return res.status(204).json({ message: 'no employees' });
  res.json(employees);
};
const addEmployee = async (req, res) => {
  if (!req.body.firstname || !req.body.lastname) {
    return res.status(400).json({ message: 'first and last name' });
  }
  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};
const updateEmployee = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'id param is reqd' });
  }
  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res.status(204).json({ message: 'employee not found' });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  const result = await employee.save();
  res.json(result);
};
const deleteEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'id param is reqd' });
  }
  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res.status(204).json({ message: 'employee not found' });
  }
  const result = Employee.deleteOne({ _id: req.body.id });

  res.json(result);
};
const getEmployee = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: 'id p[aram is reqd' });
  }
  const employee = await Employee.findOne({ _id: req?.param?.id }).exec();
  if (!employee) {
    return res.status(201).json({ message: 'employee not found' });
  }
  res.json(employee);
};
module.exports = {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
