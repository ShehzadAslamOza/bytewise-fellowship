const Employee = require("../model/Employee");

const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = async (req, res) => {
  res.json(await Employee.find());
};

const createNewEmployee = async (req, res) => {
  if (!req.body.firstname || !req.body.lastname) {
    return res.status(400).json({ message: "First and Lastname are required" });
  }

  const newEmployee = await Employee.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  console.log(newEmployee);

  // if (!newEmployee.firstname || !newEmployee.lastname) {
  //   return res.status(400).json({ message: "First and Lastname are required" });
  // }

  // data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(await Employee.find());
};

const updateEmployee = async (req, res) => {
  // const employee = data.employees.find(
  //   (emp) => emp.id === parseInt(req.body.id)
  // );

  const employee = await Employee.findOne({ _id: req.body.id }).exec();

  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} Not Found` });
  }

  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;

  await employee.save();

  // const filteredArray = data.employees.filter(
  //   (emp) => emp.id !== parseInt(req.body.id)
  // );
  // const unsortedArray = [...filteredArray, employee];
  // data.setEmployees(
  //   unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  // );
  res.json(await Employee.find());
};

const deleteEmployee = async (req, res) => {
  // const employee = data.employees.find(
  //   (emp) => emp.id === parseInt(req.body.id)
  // );

  const employee = await Employee.findOne({ _id: req.body.id }).exec();

  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} Not Found` });
  }

  await Employee.deleteOne({ _id: req.body.id });

  // const filteredArray = data.employees.filter(
  //   (emp) => emp.id !== parseInt(req.body.id)
  // );

  // data.setEmployees([...filteredArray]);
  res.json(data.employees);
};

const getEmployee = async (req, res) => {
  // const employee = data.employees.find(
  //   (emp) => emp.id === parseInt(req.params.id)
  // );

  const employee = await Employee.findOne({ _id: req.params.id }).exec();

  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.params.id} Not Found` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
