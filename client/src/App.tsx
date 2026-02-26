import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { lazy, Suspense } from "react";
import Layout from "./components/Layout";

// Lazy load pages for performance
const Home = lazy(() => import("./pages/Home"));
const SobreNos = lazy(() => import("./pages/SobreNos"));
const Tecnologia = lazy(() => import("./pages/Tecnologia"));
const InstitutoCatarata = lazy(() => import("./pages/InstitutoCatarata"));
const InstitutoCeratocone = lazy(() => import("./pages/InstitutoCeratocone"));
const InstitutoGlaucoma = lazy(() => import("./pages/InstitutoGlaucoma"));
const InstitutoRetina = lazy(() => import("./pages/InstitutoRetina"));
const InstitutoEstrabismo = lazy(() => import("./pages/InstitutoEstrabismo"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contato = lazy(() => import("./pages/Contato"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        <p className="font-ui text-sm text-muted-foreground tracking-wide">Carregando...</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/sobre" component={SobreNos} />
          <Route path="/tecnologia" component={Tecnologia} />
          <Route path="/instituto/catarata" component={InstitutoCatarata} />
          <Route path="/instituto/ceratocone" component={InstitutoCeratocone} />
          <Route path="/instituto/glaucoma" component={InstitutoGlaucoma} />
          <Route path="/instituto/retina" component={InstitutoRetina} />
          <Route path="/instituto/estrabismo" component={InstitutoEstrabismo} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/contato" component={Contato} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
