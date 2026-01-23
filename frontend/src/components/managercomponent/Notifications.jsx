import React from "react";
import { Card, CardContent } from "../Ui/Card";
import { Badge } from "../Ui/Badge";
import { Button } from "../Ui/Button";

const systemNotifications = [
  {
    id: 1,
    title: "System Maintenance",
    message: "System will be updated on May 25 at 10:00 PM.",
    type: "info",
    date: "May 19, 2025",
  },
  {
    id: 2,
    title: "New Feature Released",
    message: "Therapists can now track session notes for each student.",
    type: "update",
    date: "May 18, 2025",
  },
];

const parentRequests = [
  {
    id: 101,
    parentName: "Lily Solomon",
    childName: "Mika Solomon",
    request: "Requesting to link with Therapist A.",
    date: "May 19, 2025",
  },
  {
    id: 102,
    parentName: "Daniel M.",
    childName: "Sara M.",
    request: "Requested therapist reassignment.",
    date: "May 18, 2025",
  },
];

export default function NotificationsPage() {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold">Notifications</h2>

      {/* System Notifications */}
      <section>
        <h3 className="text-xl font-medium mb-2">System Updates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {systemNotifications.map((note) => (
            <Card key={note.id}>
              <CardContent className="pt-4 space-y-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{note.title}</h4>
                  <Badge variant="outline">{note.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {note.message}
                </p>
                <p className="text-xs text-right text-muted-foreground">
                  {note.date}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Parent Requests */}
      <section>
        <h3 className="text-xl font-medium mb-2">Parent Requests</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {parentRequests.map((req) => (
            <Card key={req.id}>
              <CardContent className="pt-4 space-y-1">
                <p className="font-medium">{req.parentName}</p>
                <p className="text-sm">
                  {req.childName} - {req.request}
                </p>
                <p className="text-xs text-muted-foreground">{req.date}</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="default">Approve</Button>
                  <Button size="sm" variant="outline">Reject</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
