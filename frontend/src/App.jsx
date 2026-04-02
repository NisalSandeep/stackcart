import { SignIn, SignInButton, SignOutButton } from "@clerk/react";
import NavBar from "./components/NavBar";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePage from "./pages/CreatePage";
import EditProductPage from "./pages/EditProductPage";
import useAuthReq from "./hooks/useAuthReq";
import useUserSync from "./hooks/useUserSync";
import { Toaster } from "react-hot-toast";

function App() {
  const { isClerkLoaded, isSignedIn } = useAuthReq();
  useUserSync();

  if (!isClerkLoaded) return null;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <NavBar />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <Toaster />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route
              path="/profile"
              element={isSignedIn ? <ProfilePage /> : <Navigate to={"/"} />}
            />
            <Route
              path="/create"
              element={isSignedIn ? <CreatePage /> : <Navigate to={"/"} />}
            />
            <Route
              path="/edit/:id"
              element={isSignedIn ? <EditProductPage /> : <Navigate to={"/"} />}
            />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
