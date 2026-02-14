import { AddApplicationDialog } from "@/components/add-application-dialog";
import { DeleteApplicationButton } from "@/components/delete-application-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/db";
import { FileText, ExternalLink } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const applications = await db.application.findMany({
    orderBy: { appliedAt: "desc" },
  });

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Application Tracker</h1>
          <p className="text-muted-foreground mt-2">
            Track your job applications and resume versions.
          </p>
        </div>
        <AddApplicationDialog />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No applications found. Add one to get started.
                </TableCell>
              </TableRow>
            ) : (
              applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.company}</TableCell>
                  <TableCell>{app.role}</TableCell>
                  <TableCell>
                    <Badge variant={
                      app.status === "OFFER" ? "default" :
                        app.status === "REJECTED" ? "destructive" :
                          app.status === "INTERVIEWING" ? "secondary" :
                            "outline"
                    }>
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(app.appliedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center hover:underline text-blue-600"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      View Resume <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </TableCell>
                  <TableCell className="text-right">
                    <DeleteApplicationButton id={app.id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
