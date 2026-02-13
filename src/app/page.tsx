import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <main className="w-full max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold tracking-tight">
              DesignCritic
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              AI-powered design feedback
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            <p>
              Get actionable, structured feedback on any UI screenshot instantly.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
