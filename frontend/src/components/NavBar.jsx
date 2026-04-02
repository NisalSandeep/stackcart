import { ShoppingBagIcon, PlusIcon, UserIcon } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/react";
import { Link } from "react-router";
import ThemeSelector from "./ThemeSelector";

function NavBar() {
  const { isSignedIn } = useAuth();

  return (
    <div className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link to={"/"} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
            <ShoppingBagIcon className="size-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            StackCart
          </span>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex gap-3 items-center">
          <ThemeSelector />
          {isSignedIn ? (
            <>
              <Link
                to={"/create"}
                className="px-4 py-2 rounded-lg bg-primary/20 border border-primary/40 text-primary font-semibold hover:bg-primary/30 transition-all"
              >
                <span className="hidden sm:inline flex items-center gap-2">
                  <PlusIcon className="size-4" />
                  New
                </span>
                <span className="sm:hidden">
                  <PlusIcon className="size-5" />
                </span>
              </Link>

              <Link
                to={"/profile"}
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
              >
                <span className="hidden sm:inline flex items-center gap-2">
                  <UserIcon className="size-4" />
                  Profile
                </span>
                <span className="sm:hidden">
                  <UserIcon className="size-5" />
                </span>
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all hidden sm:block">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all">
                  Get Started
                </button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
