import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

const DataRepresentation = () => {
  const staticData = [
    { id: 1, name: "John Doe", role: "Developer", department: "IT" },
    { id: 2, name: "Jane Smith", role: "Designer", department: "Creative" },
    { id: 3, name: "Bob Johnson", role: "Manager", department: "HR" },
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto my-8 bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="flex items-center justify-between bg-gray-50 p-6 border-b border-gray-200">
        <CardTitle className="text-2xl font-bold text-gray-800">Employee Data</CardTitle>
        <img src="/path/to/your/logo.png" alt="Company Logo" className="h-10 w-auto" />
      </CardHeader>
      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-semibold text-left text-gray-600 p-3">Name</TableHead>
              <TableHead className="font-semibold text-left text-gray-600 p-3">Role</TableHead>
              <TableHead className="font-semibold text-left text-gray-600 p-3">Department</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staticData.map((employee) => (
              <TableRow key={employee.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                <TableCell className="p-3 text-gray-800">{employee.name}</TableCell>
                <TableCell className="p-3 text-gray-600">{employee.role}</TableCell>
                <TableCell className="p-3 text-gray-600">{employee.department}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DataRepresentation;
