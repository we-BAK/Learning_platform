import React from "react";
import { CheckCircle2, Hourglass } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./Card"; // adjust the import path
import { cn } from "../../lib/utils";

export default function TaskCard({ task, onToggleCompleted }) {
  return (
    <Card
      className={cn(
        "border-l-4",
        task.submitted ? "border-green-500" : "border-amber-500",
        "transition-all hover:shadow-lg"
      )}
    >
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-slate-800">{task.title}</CardTitle>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
            task.submitted
              ? "bg-green-100 text-green-800"
              : "bg-amber-100 text-amber-800"
          )}
        >
          {task.submitted ? <CheckCircle2 size={14} /> : <Hourglass size={14} />}
          {task.submitted ? "Completed" : "To-Do"}
        </span>
      </CardHeader>

      {task.notes && (
        <CardContent className="text-sm text-slate-600 bg-slate-100 rounded-lg italic">
          "{task.notes}"
        </CardContent>
      )}

      <CardFooter className="text-right">
        <button
          onClick={() => onToggleCompleted(task.id, !task.submitted)}
          className={cn(
            "px-5 py-2 rounded-lg text-sm font-semibold text-white transition-transform active:scale-95",
            task.submitted
              ? "bg-amber-500 hover:bg-amber-600"
              : "bg-green-600 hover:bg-green-700"
          )}
        >
          {task.submitted ? "Mark as To-Do" : "Mark as Complete"}
        </button>
      </CardFooter>
    </Card>
  );
}
