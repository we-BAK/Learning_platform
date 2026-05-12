import React from "react";
import { Card, CardContent } from "../Ui/Card";
import { Badge } from "../Ui/Badge";
import { Button } from "../Ui/Button";
import {
  Calendar,
  Bell,
  Users,
  Sparkles,
} from "lucide-react";

/* ======================
   STATIC DATA
====================== */

const meetings = [
  {
    id: 1,
    title: "Therapist Meeting",
    description: "Weekly progress discussion with Therapist A.",
    date: "May 22, 2025 • 10:00 AM",
    with: "Therapist A",
  },
  {
    id: 2,
    title: "Parent Meeting",
    description: "Meeting with Lily Solomon regarding Mika’s progress.",
    date: "May 24, 2025 • 2:00 PM",
    with: "Parent",
  },
];

const systemUpdates = [
  {
    id: 1,
    title: "System Maintenance",
    message: "System will be updated on May 25 at 10:00 PM.",
    date: "May 19, 2025",
    type: "System",
  },
];

const newFeatures = [
  {
    id: 1,
    title: "New Feature Released",
    message: "Therapists can now track session notes for each student.",
    date: "May 18, 2025",
    type: "Feature",
  },
];

const parentRequests = [
  {
    id: 1,
    parent: "Lily Solomon",
    child: "Mika Solomon",
    request: "Requesting to link with Therapist A.",
    date: "May 19, 2025",
  },
];

/* ======================
   COMPONENT
====================== */

export default function NotificationsPage() {
  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-semibold flex items-center gap-2">
        <Bell size={22} /> Notifications
      </h2>

      {/* ================= Upcoming Meetings ================= */}
      <section>
        <h3 className="text-xl font-medium mb-3 flex items-center gap-2">
          <Calendar size={18} /> Upcoming Meetings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {meetings.map((meet) => (
            <Card key={meet.id}>
              <CardContent className="pt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{meet.title}</p>
                  <Badge variant="outline">Meeting</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {meet.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {meet.date}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= Parent Requests ================= */}
      <section>
        <h3 className="text-xl font-medium mb-3 flex items-center gap-2">
          <Users size={18} /> Parent Requests
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {parentRequests.map((req) => (
            <Card key={req.id}>
              <CardContent className="pt-4 space-y-2">
                <p className="font-medium">{req.parent}</p>
                <p className="text-sm">
                  {req.child} — {req.request}
                </p>
                <p className="text-xs text-muted-foreground">
                  {req.date}
                </p>
                <div className="flex gap-2 pt-2">
                  <Button size="sm">Approve</Button>
                  <Button size="sm" variant="outline">
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= System Updates ================= */}
      <section>
        <h3 className="text-xl font-medium mb-3 flex items-center gap-2">
          <Bell size={18} /> System Updates
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {systemUpdates.map((sys) => (
            <Card key={sys.id}>
              <CardContent className="pt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{sys.title}</p>
                  <Badge variant="secondary">{sys.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {sys.message}
                </p>
                <p className="text-xs text-right text-muted-foreground">
                  {sys.date}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= New Features ================= */}
      <section>
        <h3 className="text-xl font-medium mb-3 flex items-center gap-2">
          <Sparkles size={18} /> New Features
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {newFeatures.map((feat) => (
            <Card key={feat.id}>
              <CardContent className="pt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{feat.title}</p>
                  <Badge variant="default">{feat.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {feat.message}
                </p>
                <p className="text-xs text-right text-muted-foreground">
                  {feat.date}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
