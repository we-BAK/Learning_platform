import React, { useState } from "react";
import { Card, CardContent } from "../Ui/Card";
import { Button } from "../Ui/Button";
import { Input } from "../Ui/Input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../Ui/Select";

const sampleStudents = ["John Doe", "Sarah Lee", "Mike Brown"];
const sampleTherapists = ["Therapist A", "Therapist B"];
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function ScheduleOrganizer() {
  const [schedules, setSchedules] = useState([
    {
      student: "John Doe",
      therapist: "Therapist A",
      day: "Monday",
      time: "10:00 AM",
      type: "Therapy",
    },
    {
      student: "Sarah Lee",
      therapist: "Therapist B",
      day: "Wednesday",
      time: "1:00 PM",
      type: "Class",
    },
  ]);

  const [newSchedule, setNewSchedule] = useState({
    student: "",
    therapist: "",
    day: "",
    time: "",
    type: "",
  });

  const addSchedule = () => {
    if (
      newSchedule.student &&
      newSchedule.therapist &&
      newSchedule.day &&
      newSchedule.time &&
      newSchedule.type
    ) {
      setSchedules([...schedules, newSchedule]);
      setNewSchedule({
        student: "",
        therapist: "",
        day: "",
        time: "",
        type: "",
      });
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold">Schedule Organizer</h2>

      {/* Schedule Form */}
      <div className="bg-muted p-4 rounded-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            value={newSchedule.student}
            onValueChange={(val) =>
              setNewSchedule((prev) => ({ ...prev, student: val }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Student" />
            </SelectTrigger>
            <SelectContent>
              {sampleStudents.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={newSchedule.therapist}
            onValueChange={(val) =>
              setNewSchedule((prev) => ({ ...prev, therapist: val }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Therapist" />
            </SelectTrigger>
            <SelectContent>
              {sampleTherapists.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={newSchedule.day}
            onValueChange={(val) =>
              setNewSchedule((prev) => ({ ...prev, day: val }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Day" />
            </SelectTrigger>
            <SelectContent>
              {daysOfWeek.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="time"
            value={newSchedule.time}
            onChange={(e) =>
              setNewSchedule((prev) => ({ ...prev, time: e.target.value }))
            }
          />

          <Select
            value={newSchedule.type}
            onValueChange={(val) =>
              setNewSchedule((prev) => ({ ...prev, type: val }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Session Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Therapy">Therapy</SelectItem>
              <SelectItem value="Class">Class</SelectItem>
              <SelectItem value="Assessment">Assessment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="mt-2" onClick={addSchedule}>
          Add Schedule
        </Button>
      </div>

      {/* Display Schedules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schedules.map((sched, index) => (
          <Card key={index}>
            <CardContent className="pt-4 space-y-1">
              <p className="font-medium">{sched.student}</p>
              <p className="text-sm text-muted-foreground">
                {sched.type} with {sched.therapist}
              </p>
              <p className="text-sm">
                {sched.day} at {sched.time}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
