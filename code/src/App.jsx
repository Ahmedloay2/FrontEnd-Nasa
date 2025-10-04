import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import LoadingSpinner from "./components/ui/LoadingSpinner/LoadingSpinner";
import Starfield from "./components/ui/Starfield/Starfield";
import Layout from "./components/layout/Layout";
import "./App.css";

// Lazy load components for better performance
const Home = lazy(() => import("./pages/Home/Home.jsx"));
const CupolaEarth = lazy(() => import("./pages/CupolaEarth/CupolaEarth.jsx"));
const CupolaGame = lazy(() => import("./pages/CupolaEarth/Game/CupolaGame.jsx"));
const Story = lazy(() => import("./pages/Story/Story.jsx"));
const StoryForm = lazy(() => import("./pages/Story/components/StoryForm.jsx"));
const StoryDisplay = lazy(() => import("./pages/Story/components/StoryDisplay.jsx"));
const EBook = lazy(() => import("./pages/EBook/EBook.jsx"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound.jsx"));
const NBLGame = lazy(() => import("./pages/NBLGame/NBLGame.jsx"));


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

    // Full-screen game route (outside Layout)
    const routers = createBrowserRouter([
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
