import { ShoppingBagIcon, PlusIcon, UserIcon } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/react";
import { Link } from "react-router";
import ThemeSelector from "./ThemeSelector";

function NavBar() {
  const { isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md border-b border-base-content/10 bg-base-100/75">
      <div className="navbar w-full max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost gap-2 normal-case hover:bg-base-200/70">
            <ShoppingBagIcon className="size-5 text-primary" />
            <span className="text-lg font-display font-bold tracking-tight">
              Stackcart
            </span>
          </Link>
        </div>

        <div className="flex gap-2 items-center">
          <ThemeSelector />
          {isSignedIn ? (
            <>
              <Link to={"/create"} className="btn btn-primary btn-sm gap-1">
                <PlusIcon className="size-4" />
                <span className="hidden sm:inline">Create</span>
              </Link>

              <Link to={"/profile"} className="btn btn-ghost btn-sm gap-1">
                <UserIcon className="size-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="btn btn-ghost btn-sm">Log in</button>
              </SignInButton>
              <SignUpButton>
                <button className="btn btn-primary btn-sm">Get started</button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
