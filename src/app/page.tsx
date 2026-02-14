import { AddApplicationDialog } from "@/components/add-application-dialog";
import { DeleteApplicationButton } from "@/components/delete-application-button";
import { ViewJDDialog } from "@/components/view-jd-dialog";
import { SignOutButton } from "@/components/sign-out-button";
import { VaultStats } from "@/components/vault-stats";
import { AppFooter } from "@/components/app-footer";
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
import { FileText, ExternalLink, Calendar, Briefcase } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

import { LandingPage } from "@/components/landing-page";

export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user) {
    return <LandingPage />;
  }

  const applications = await db.application.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: { appliedAt: "desc" },
  });

  // Calculate Stats
  const total = applications.length;
  const interviewing = applications.filter(app => app.status === "INTERVIEWING").length;
  const offers = applications.filter(app => app.status === "OFFER").length;
  const rejected = applications.filter(app => app.status === "REJECTED").length;

  const upcomingInterviews = applications.filter(app => app.status === "INTERVIEWING").slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto py-10 px-4 md:px-6 flex-grow">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 glass-card p-6 rounded-xl border-l-4 border-l-primary shadow-lg animate-in slide-in-from-top-4 duration-700">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white neon-text drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
              CAREER VAULT
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Welcome back, <span className="text-primary font-semibold">{session.user.name}</span>.
              Your command center is ready.
            </p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <AddApplicationDialog />
            <SignOutButton />
          </div>
        </div>

        {/* Vital Stats with Animations */}
        <VaultStats
          total={total}
          interviewing={interviewing}
          offers={offers}
          rejected={rejected}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Applications Table */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-primary" /> Application History
            </h2>

            <div className="border rounded-xl glass-card overflow-hidden shadow-2xl shadow-black/40">
              <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                <Table>
                  <TableHeader className="bg-black/40 sticky top-0 z-10 backdrop-blur-md">
                    <TableRow className="hover:bg-transparent border-b-primary/20">
                      <TableHead className="text-primary font-bold">Company</TableHead>
                      <TableHead className="text-primary font-bold">Role</TableHead>
                      <TableHead className="text-primary font-bold">Status</TableHead>
                      <TableHead className="text-primary font-bold hidden md:table-cell">Applied</TableHead>
                      <TableHead className="text-primary font-bold hidden md:table-cell">Resume</TableHead>
                      <TableHead className="text-right text-primary font-bold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <Briefcase className="h-8 w-8 opacity-20" />
                            <p>No applications tracked yet.</p>
                            <p className="text-xs">Add your first application to start the journey.</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      applications.map((app) => (
                        <TableRow key={app.id} className="hover:bg-primary/5 transition-colors border-b-white/5 group">
                          <TableCell className="font-medium text-white group-hover:text-primary transition-colors">
                            {app.company}
                          </TableCell>
                          <TableCell>{app.role}</TableCell>
                          <TableCell>
                            <Badge variant={
                              app.status === "OFFER" ? "default" :
                                app.status === "REJECTED" ? "destructive" :
                                  app.status === "INTERVIEWING" ? "secondary" :
                                    "outline"
                            } className="shadow-sm font-semibold tracking-wide">
                              {app.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground">
                            {new Date(app.appliedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {app.resumeUrl && (
                              <a
                                href={app.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-xs hover:text-primary transition-colors hover:underline text-muted-foreground"
                              >
                                <FileText className="mr-1 h-3 w-3" />
                                Review
                              </a>
                            )}
                          </TableCell>
                          <TableCell className="text-right flex justify-end gap-1">
                            <ViewJDDialog
                              company={app.company}
                              role={app.role}
                              jobDescription={app.jobDescription}
                            />
                            <DeleteApplicationButton id={app.id} />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {/* Sidebar / Extra Sections */}
          <div className="space-y-6">
            {/* Upcoming / Active Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2 text-secondary">
                <Calendar className="h-5 w-5" /> Active Interactions
              </h2>
              {upcomingInterviews.length > 0 ? (
                <div className="space-y-3">
                  {upcomingInterviews.map(app => (
                    <Card key={app.id} className="glass-card border-secondary/20 hover:border-secondary/50 transition-colors">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base flex justify-between">
                          {app.company}
                          <Badge variant="secondary" className="text-[10px] h-5">Active</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-sm text-muted-foreground">{app.role}</p>
                        <p className="text-xs text-muted-foreground/60 mt-2">Applied: {new Date(app.appliedAt).toLocaleDateString()}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="glass-card border-dashed border-muted">
                  <CardContent className="p-6 text-center text-muted-foreground text-sm">
                    No active interviews. <br /> Keep applying!
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Tips / Info Box */}
            <Card className="glass-card bg-gradient-to-br from-primary/5 to-transparent border-primary/10">
              <CardHeader className="p-4">
                <CardTitle className="text-sm text-primary uppercase tracking-widest">Pro Tip</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                Updates to your resume tailored for specific roles increase interview chances by 40%. Always upload specific resumes.
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
      <AppFooter />
    </div>
  );
}
