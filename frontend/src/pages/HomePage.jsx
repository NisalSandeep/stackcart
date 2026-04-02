import React from "react";
import { useProducts } from "../hooks/useProduct";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router";
import { PackageIcon, SparklesIcon } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { SignInButton } from "@clerk/react";

function HomePage() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <span>Something went wrong. Please refresh the page.</span>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* HERO SECTION */}
      <div className="relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-70 animate-pulse" />
          <div className="absolute bottom-0 right-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl opacity-70 animate-pulse" />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center py-20">
          <div className="space-y-8">
            <div>
              <div className="inline-block px-4 py-2 rounded-full bg-primary/20 border border-primary/40 mb-6">
                <p className="text-sm font-semibold text-primary flex items-center gap-2">
                  <SparklesIcon className="size-4" />
                  Welcome to StackCart
                </p>
              </div>
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                Share Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">Creative</span> Work
              </h1>
            </div>
            <p className="text-xl text-base-content/70 leading-relaxed max-w-xl">
              Connect with a vibrant community of creators. Showcase your products, get feedback, and build lasting relationships.
            </p>
            <div className="flex gap-4 pt-4">
              <SignInButton mode="modal">
                <button className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center gap-2">
                  <SparklesIcon className="size-5" />
                  Start Creating
                </button>
              </SignInButton>
              <button className="px-8 py-4 border-2 border-base-content/20 font-semibold rounded-xl hover:bg-base-content/5 transition-all duration-300">
                Explore
              </button>
            </div>
          </div>
          
          <div className="relative h-96 hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl backdrop-blur-xl border border-white/20 p-8">
              <img
                src="/image.png"
                alt="Creator"
                className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <div className="space-y-8">
        <div>
          <h2 className="text-4xl font-bold mb-2">Latest Products</h2>
          <p className="text-lg text-base-content/60">Discover amazing creations from our community</p>
        </div>
        {products.length === 0 ? (
          <div className="card bg-base-300">
            <div className="card-body items-center text-center py-16">
              <PackageIcon className="size-16 text-base-content/20" />
              <h3 className="card-title text-base-content/50">
                No products yet
              </h3>
              <p className="text-base-content/40 text-sm">
                Be the first to share something!
              </p>
              <Link to="/create" className="btn btn-primary btn-sm mt-2">
                Create Product
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
