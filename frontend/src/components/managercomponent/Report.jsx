import React, { useState } from "react";
import { Button } from "../Ui/Button";
import { Input } from "../Ui/Input";
import { Card, CardContent } from "../Ui/Card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../Ui/Select";

// Static sample data
const sampleStudents = [
  {
    id: "s1",
    name: "John Doe",
    performance: "Improving",
    attendance: "90%",
    therapist: "Therapist A",
  },
  {
    id: "s2",
    name: "Sarah Lee",
    performance: "Stable",
    attendance: "80%",
    therapist: "Therapist B",
  },
  {
    id: "s3",
    name: "Mike Brown",
    performance: "Needs Attention",
    attendance: "60%",
    therapist: "Therapist A",
  },
];

const therapists = ["Therapist A", "Therapist B"];

export default function ReportsPage() {
  const [filter, setFilter] = useState("");
  const [query, setQuery] = useState("");

  const filteredStudents = sampleStudents.filter((student) => {
    return (
      (filter === "" || student.therapist === filter) &&
      student.name.toLowerCase().includes(query.toLowerCase())
    );
  });

  const exportCSV = () => {
    alert("Simulated CSV export");
  };

  const exportPDF = () => {
    alert("Simulated PDF export");
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold">Student Reports</h2>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Search by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-[200px]"
        />

        <Select value={filter} onValueChange={(val) => setFilter(val)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Therapist" />
          </SelectTrigger>
          <SelectContent>
            {therapists.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={exportCSV}>
          Export CSV
        </Button>
        <Button variant="outline" onClick={exportPDF}>
          Export PDF
        </Button>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStudents.map((student) => (
          <Card key={student.id}>
            <CardContent className="pt-4 space-y-2">
              <h3 className="text-lg font-medium">{student.name}</h3>
              <p>Therapist: {student.therapist}</p>
              <p>Performance: {student.performance}</p>
              <p>Attendance: {student.attendance}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
