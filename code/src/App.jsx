import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import LoadingSpinner from "./components/ui/LoadingSpinner/LoadingSpinner";
import Starfield from "./components/ui/Starfield/Starfield";
import Layout from "./components/layout/Layout";
import "./App.css";

// Lazy load components for better performance
const Home = lazy(() => import("./pages/Home/Home"));
const NBLGame = lazy(() => import("./pages/NBLGame/NBLGame"));
const CupolaEarth = lazy(() => import("./pages/CupolaEarth/CupolaEarth"));
const CupolaGame = lazy(() => import("./pages/CupolaEarth/Game/CupolaGame"));
const Story = lazy(() => import("./pages/Story/Story"));
const StoryForm = lazy(() => import("./pages/Story/components/StoryForm"));
const StoryDisplay = lazy(() => import("./pages/Story/components/StoryDisplay"));
const EBook = lazy(() => import("./pages/EBook/EBook"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

// Loading wrapper component
const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={
    <div style={{ 
      minHeight: '60vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <LoadingSpinner 
        message="Loading NASA experience..." 
        size="large" 
        theme="space" 
      />
    </div>
  }>
    {children}
  </Suspense>
);

function App  (){
  const routers = createBrowserRouter([
    // Full-screen game route (outside Layout)
    { 
      path: "/cupola-game", 
      element: (
        <SuspenseWrapper>
          <CupolaGame />
        </SuspenseWrapper>
      )
    },
    { 
      path: "/", 
      element: <Layout />, 
      children: [
        { 
          index: true, 
          element: (
            <SuspenseWrapper>
              <Home />
            </SuspenseWrapper>
          )
        },
        { 
          path: "/nbl-game", 
          element: (
            <SuspenseWrapper>
              <NBLGame />
            </SuspenseWrapper>
          )
        },
        { 
          path: "/cupola-earth", 
          element: (
            <SuspenseWrapper>
              <CupolaEarth />
            </SuspenseWrapper>
          )
        },
        { 
          path: "/story", 
          element: (
            <SuspenseWrapper>
              <Story />
            </SuspenseWrapper>
          ),
          children: [
            { 
              index: true, 
              element: (
                <SuspenseWrapper>
                  <StoryForm />
                </SuspenseWrapper>
              )
            },
            { 
              path: "form", 
              element: (
                <SuspenseWrapper>
                  <StoryForm />
                </SuspenseWrapper>
              )
            },
            { 
              path: "display", 
              element: (
                <SuspenseWrapper>
                  <StoryDisplay />
                </SuspenseWrapper>
              )
            }
          ]
        },
        { 
          path: "/ebook", 
          element: (
            <SuspenseWrapper>
              <EBook />
            </SuspenseWrapper>
          )
        },
        { 
          path: "*", 
          element: (
            <SuspenseWrapper>
              <NotFound />
            </SuspenseWrapper>
          )
        }
    ]}]);

  return (
    <ErrorBoundary>
        <Starfield/>
        <RouterProvider future={{ v7_startTransition: true }} router={routers}>  
        </RouterProvider>
    </ErrorBoundary>
  )

}


export default App;
