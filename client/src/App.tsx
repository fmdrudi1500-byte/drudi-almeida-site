import { Route, Switch } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { lazy, Suspense, useEffect, useState } from "react";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";

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
const Convenios = lazy(() => import("./pages/Convenios"));
const Agendamento = lazy(() => import("./pages/Agendamento"));
const TrabalheConosco = lazy(() => import("./pages/TrabalheConosco"));
const BlogListing = lazy(() => import("./pages/BlogListing"));
const BlogAdmin = lazy(() => import("./pages/admin/BlogAdmin"));
const BlogPostEditor = lazy(() => import("./pages/admin/BlogPostEditor"));
const AdminSEO = lazy(() => import("./pages/AdminSEO"));
const Agendar = lazy(() => import("./pages/Agendar"));
const CancelarAgendamento = lazy(() => import("./pages/CancelarAgendamento"));
const AdminAgendamentos = lazy(() => import("./pages/admin/AdminAgendamentos"));
const AdminCandidaturas = lazy(() => import("./pages/admin/AdminCandidaturas"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Lazy load non-critical providers and components
const LazyToaster = lazy(() => import("@/components/ui/sonner").then(m => ({ default: m.Toaster })));

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

/** Deferred Toaster — loads after initial paint */
function DeferredToaster() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const id = requestIdleCallback(() => setShow(true), { timeout: 3000 });
    return () => cancelIdleCallback(id);
  }, []);
  if (!show) return null;
  return (
    <Suspense fallback={null}>
      <LazyToaster />
    </Suspense>
  );
}

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Layout>
      <ScrollToTop />
      <ScrollToTopButton />
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
          <Route path="/blog" component={BlogListing} />
          <Route path="/blog-legado" component={Blog} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/convenios" component={Convenios} />
          <Route path="/agendamento" component={Agendamento} />
          <Route path="/contato" component={Contato} />
          <Route path="/trabalhe-conosco" component={TrabalheConosco} />
          <Route path="/admin/blog" component={BlogAdmin} />
          <Route path="/admin/blog/novo">{() => <BlogPostEditor />}</Route>
          <Route path="/admin/blog/editar/:id">{(params) => <BlogPostEditor postId={params.id ? parseInt(params.id, 10) : undefined} />}</Route>
          <Route path="/agendar" component={Agendar} />
          <Route path="/cancelar-agendamento" component={CancelarAgendamento} />
          <Route path="/admin/agendamentos" component={AdminAgendamentos} />
          <Route path="/admin/candidaturas" component={AdminCandidaturas} />
          <Route path="/admin/seo" component={AdminSEO} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Layout>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <ThemeProvider defaultTheme="light" switchable>
          <DeferredToaster />
          <Router />
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
