import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppShell from "./components/AppShell";

// Flow Pages
import DashboardPage from "./pages/DashboardPage";
import CirclePage from "./pages/CirclePage";
import CircleChatPage from "./pages/CircleChatPage";
import CircleAssignmentsPage from "./pages/CircleAssignmentsPage";
import CircleFilesPage from "./pages/CircleFilesPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import AssignmentDetailPage from "./pages/AssignmentDetailPage";
import CalendarPage from "./pages/CalendarPage";
import PlaybookPage from "./pages/PlaybookPage";
import PlaybookSemesterPage from "./pages/PlaybookSemesterPage";
import SearchPage from "./pages/SearchPage";
import SettingsPage from "./pages/SettingsPage";
import HopperPage from "./pages/HopperPage";
import CommunicationPage from "./pages/CommunicationPage";
import FlowMapPage from "./pages/FlowMapPage";
import NotificationsPage from "./pages/NotificationsPage";
import UserProfilePage from "./pages/UserProfilePage";
import ThreadViewPage from "./pages/ThreadViewPage";

function Router() {
  return (
    <AppShell>
      <Switch>
        <Route path="/" component={DashboardPage} />
        <Route path="/circles/:id" component={CirclePage} />
        <Route path="/circles/:id/chat" component={CircleChatPage} />
        <Route path="/circles/:id/chat/:threadId" component={ThreadViewPage} />
        <Route path="/circles/:id/assignments" component={CircleAssignmentsPage} />
        <Route path="/circles/:id/files" component={CircleFilesPage} />
        <Route path="/assignments" component={AssignmentsPage} />
        <Route path="/assignments/:id" component={AssignmentDetailPage} />
        <Route path="/calendar" component={CalendarPage} />
        <Route path="/playbook" component={PlaybookPage} />
        <Route path="/playbook/:semester" component={PlaybookSemesterPage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/hopper" component={HopperPage} />
        <Route path="/communication" component={CommunicationPage} />
        <Route path="/notifications" component={NotificationsPage} />
        <Route path="/settings" component={SettingsPage} />
        <Route path="/profile" component={UserProfilePage} />
        <Route path="/flowmap" component={FlowMapPage} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </AppShell>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster position="top-right" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
