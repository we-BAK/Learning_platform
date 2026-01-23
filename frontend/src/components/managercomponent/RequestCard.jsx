import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../Ui/Card";
import { Button } from "../Ui/Button";
import { useState } from "react";
import RequestModal from "./RequestModal";
import ApproveButton from "./ApproveButton";
import RejectButton from "./RejectButton";

const RequestCard = ({ request, onStatusChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="w-full shadow-md border border-muted mb-4">
        <CardHeader>
          <CardTitle className="text-lg">
            {request.guardian_name} - {request.child_name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground space-y-1">
            <p><strong>Email:</strong> {request.email}</p>
            <p><strong>Phone:</strong> {request.phone}</p>
            <p><strong>Region:</strong> {request.region}, {request.city}</p>
            <p><strong>Language:</strong> {request.language}</p>
            <p><strong>School:</strong> {request.school || "N/A"}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="space-x-2">
            <ApproveButton registration={request} onApproved={onStatusChange} />
            <RejectButton registration={request} onRejected={onStatusChange} />
          </div>
          <Button variant="outline" onClick={() => setOpen(true)}>
            View Details
          </Button>
        </CardFooter>
      </Card>

      <RequestModal open={open} onOpenChange={setOpen} request={request} />
    </>
  );
};

export default RequestCard;
