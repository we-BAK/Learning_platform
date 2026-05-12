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

// Temporary sample data (later from Supabase)
const sampleStudents = ["John Doe", "Sarah Lee", "Mike Brown"];
const sampleTherapists = ["Therapist A", "Therapist B"];
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function ScheduleOrganizer() {
  const [schedules, setSchedules] = useState([]);

  const [newSchedule, setNewSchedule] = useState({
    student: "",
    therapist: "",
    day: "",
    time: "",
    type: "",
    startDate: "",
    endDate: "",
    recurrence: "Weekly",
  });

  const addSchedule = () => {
    const {
      student,
      therapist,
      day,
      time,
      type,
      startDate,
      endDate,
      recurrence,
    } = newSchedule;

    if (
      !student ||
      !therapist ||
      !day ||
      !time ||
      !type ||
      !startDate ||
      !endDate
    ) {
      alert("Please fill all fields");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert("Start date cannot be after end date");
      return;
    }

    setSchedules([...schedules, newSchedule]);

    setNewSchedule({
      student: "",
      therapist: "",
      day: "",
      time: "",
      type: "",
      startDate: "",
      endDate: "",
      recurrence: "Weekly",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">
        Organizational Schedule (Yearly)
      </h2>

      {/* Schedule Form */}
      <div className="bg-muted p-4 rounded-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Student */}
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

          {/* Therapist */}
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

          {/* Day of Week */}
          <Select
            value={newSchedule.day}
            onValueChange={(val) =>
              setNewSchedule((prev) => ({ ...prev, day: val }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Day of the week" />
            </SelectTrigger>
            <SelectContent>
              {daysOfWeek.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Time */}
          <Input
            type="time"
            value={newSchedule.time}
            onChange={(e) =>
              setNewSchedule((prev) => ({ ...prev, time: e.target.value }))
            }
          />

          {/* Start Date */}
          <Input
            type="date"
            value={newSchedule.startDate}
            onChange={(e) =>
              setNewSchedule((prev) => ({ ...prev, startDate: e.target.value }))
            }
          />

          {/* End Date */}
          <Input
            type="date"
            value={newSchedule.endDate}
            onChange={(e) =>
              setNewSchedule((prev) => ({ ...prev, endDate: e.target.value }))
            }
          />

          {/* Session Type */}
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

          {/* Recurrence */}
          <Select
            value={newSchedule.recurrence}
            onValueChange={(val) =>
              setNewSchedule((prev) => ({ ...prev, recurrence: val }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Recurrence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Weekly">Weekly</SelectItem>
              <SelectItem value="Monthly">Monthly</SelectItem>
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
                {sched.day} at {sched.time} ({sched.recurrence})
              </p>
              <p className="text-xs text-muted-foreground">
                {sched.startDate} → {sched.endDate}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
