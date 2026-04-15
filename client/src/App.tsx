import { Toaster } from "@/components/ui/sonner";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { lazy, Suspense } from "react";
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
const TrabalheConosco = lazy(() => import("./pages/TrabalheConosco"));
const BlogListing = lazy(() => import("./pages/BlogListing"));
const BlogAdmin = lazy(() => import("./pages/admin/BlogAdmin"));
const BlogPostEditor = lazy(() => import("./pages/admin/BlogPostEditor"));
const AdminSEO = lazy(() => import("./pages/AdminSEO"));
const Agendar = lazy(() => import("./pages/Agendar"));
const CancelarAgendamento = lazy(() => import("./pages/CancelarAgendamento"));
const AdminAgendamentos = lazy(() => import("./pages/admin/AdminAgendamentos"));
const AdminCandidaturas = lazy(() => import("./pages/admin/AdminCandidaturas"));
const AdminGEO = lazy(() => import("./pages/admin/AdminGEO"));
const PoliticaPrivacidade = lazy(() => import("./pages/PoliticaPrivacidade"));
const Unidade = lazy(() => import("./pages/Unidade"));
const Medico = lazy(() => import("./pages/Medico"));

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
  // make sure to consider if you need authentication for certain routes
  return (
    <Layout>
      <ScrollToTop />
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
          <Route path="/agendamento">{() => <Redirect to="/agendar" />}</Route>
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
          <Route path="/admin/geo" component={AdminGEO} />
          <Route path="/unidade/:slug" component={Unidade} />
          <Route path="/medico/:slug" component={Medico} />
          <Route path="/politica-de-privacidade" component={PoliticaPrivacidade} />
          {/* Redirects de rotas legadas do Wix — garantem 301 mesmo quando o Express não intercepta */}
          <Route path="/en">{() => <Redirect to="/" />}</Route>
          <Route path="/en/">{() => <Redirect to="/" />}</Route>
          <Route path="/pt">{() => <Redirect to="/" />}</Route>
          <Route path="/pt/">{() => <Redirect to="/" />}</Route>
          <Route path="/pt-br">{() => <Redirect to="/" />}</Route>
          <Route path="/pt-br/">{() => <Redirect to="/" />}</Route>
          <Route path="/home">{() => <Redirect to="/" />}</Route>
          <Route path="/home/">{() => <Redirect to="/" />}</Route>
          <Route path="/index">{() => <Redirect to="/" />}</Route>
          <Route path="/index.html">{() => <Redirect to="/" />}</Route>
          <Route path="/catarata">{() => <Redirect to="/instituto/catarata" />}</Route>
          <Route path="/glaucoma">{() => <Redirect to="/instituto/glaucoma" />}</Route>
          <Route path="/retina">{() => <Redirect to="/instituto/retina" />}</Route>
          <Route path="/ceratocone">{() => <Redirect to="/instituto/ceratocone" />}</Route>
          <Route path="/estrabismo">{() => <Redirect to="/instituto/estrabismo" />}</Route>
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
          <TooltipProvider>
            <Toaster />
            <Router />
            {/* ScrollToTopButton fora do Layout para evitar duplicação */}
            <ScrollToTopButton />
          </TooltipProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
