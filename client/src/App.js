import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "?D(G+KbPeSgVkYp3s6v9y$B&E)H@McQf";
const BASE_URI = "http://examination.24x7retail.com/api/v1.0";

const Employee = ({ empNo, firstName, lastName, email, dob, departmentId }) => {
  return (
    <div>
      <p>Employee No: {empNo}</p>
      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>
      <p>Email: {email}</p>
      <p>Date of Birth: {dob}</p>
      <p>Department ID: {departmentId}</p>
    </div>
  );
};

const Employees = ({ employees }) => {
  return (
    <div>
      {employees.map((employee) => (
        <Employee key={employee.empNo} {...employee} />
      ))}
    </div>
  );
};

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URI}/Employees${API_KEY}`)
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error(error));

    axios
      .get(`${BASE_URI}/Departments${API_KEY}`)
      .then((response) => setDepartments(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addEmployee = () => {
    axios
      .post(
        `${BASE_URI}/Employee${API_KEY}`,
        {
          firstName,
          lastName,
          email,
          dob,
          departmentId,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => setEmployees([...employees, response.data]))
      .catch((error) => console.error(error));
  };

  const updateEmployee = () => {
    axios
      .put(
        `${BASE_URI}/Employee${API_KEY}`,
        {
          empNo: selectedEmployee.empNo,
          firstName,
          lastName,
          email,
          dob,
          departmentId,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        const updatedEmployees = employees.map((employee) => {
          if (employee.empNo === selectedEmployee.empNo) {
            return response.data;
          }
          return employee;
        });
        setEmployees(updatedEmployees);
      })
      .catch((error) => console.error(error));
  };

  const deleteEmployee = (empNo) => {
    axios
      .delete(`${BASE_URI}/Employee/${empNo}${API_KEY}`)
      .then((response) => {
        const updatedEmployees = employees.filter(
          (employee) => employee.empNo !== empNo
        );
        setEmployees(updatedEmployees);
      })
      .catch((error) => console.error(error));
  };

  const searchEmployee = (empNo) => {
    axios
      .get(`${BASE_URI}/Employee/${empNo}${API_KEY}`)
      .then((response) => setSelectedEmployee(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Employee Management System</h1>
      <h2>Add Employee</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      <select
        value={departmentId}
        onChange={(e) => setDepartmentId(e.target.value)}
      >
        <option value="">Select Department</option>
        {departments.map((department) => (
          <option key={department.departmentId} value={department.departmentId}>
            {department.name}
          </option>
        ))}
      </select>
      <button onClick={addEmployee}>Add</button>
      <h2>Update Employee</h2>
      <input
        type="text"
        placeholder="Employee No"
        onChange={(e) => searchEmployee(e.target.value)}
      />
      {selectedEmployee && (
        <>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(
              e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department.departmentId} value={department.departmentId}>
                    {department.name}
                  </option>
                ))}
              </select>
              <button onClick={updateEmployee}>Update</button>
            </>
          )}
          <h2>Employees</h2>
          <table>
            <thead>
              <tr>
                <th>Employee No</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.empNo}>
                  <td>{employee.empNo}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.dob}</td>
                  <td>{employee.department.name}</td>
                  <td>
                    <button onClick={() => setSelectedEmployee(employee)}>
                      Edit
                    </button>
                    <button onClick={() => deleteEmployee(employee.empNo)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
    
    export default App;
    