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
    <>
      <section className="relative overflow-hidden rounded-3xl border border-base-content/10 glass-panel px-6 md:px-10 py-10 md:py-14 mb-10">
        <div className="absolute -top-24 -left-16 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-16 -right-10 w-72 h-72 rounded-full bg-secondary/20 blur-3xl" />

        <div className="relative grid lg:grid-cols-2 items-center gap-8 md:gap-10">
          <div className="space-y-5 text-center lg:text-left">
            <div className="hero-chip inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold">
              <SparklesIcon className="size-3.5" />
              Creator marketplace, simplified
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight font-display font-extrabold tracking-tight">
              Launch products people actually notice.
            </h1>

            <p className="text-base md:text-lg text-base-content/70 max-w-xl">
              Publish your next product, tell a clearer story, and turn visitors
              into loyal users with a cleaner storefront.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <SignInButton mode="modal">
                <button className="btn btn-primary px-6">
                  <SparklesIcon className="size-4" />
                  Start publishing
                </button>
              </SignInButton>
              <a href="#products" className="btn btn-outline">
                Explore products
              </a>
            </div>
          </div>

          <div className="relative mx-auto lg:ml-auto">
            <div className="absolute inset-0 rounded-3xl bg-primary/25 blur-2xl scale-95" />
            <img
              src="/image.png"
              alt="Featured creator showcase"
              className="relative h-64 md:h-72 w-full max-w-md object-cover rounded-3xl shadow-2xl border border-base-content/10"
            />
          </div>
        </div>
      </section>

      <section id="products" className="space-y-10">
      <div>
        <h2 className="text-xl md:text-2xl font-display font-bold flex items-center gap-2 mb-4">
          <PackageIcon className="size-5 text-primary" />
          Trending products
        </h2>
        {products.length === 0 ? (
          <div className="card glass-panel">
            <div className="card-body items-center text-center py-16">
              <PackageIcon className="size-16 text-base-content/20" />
              <h3 className="card-title text-base-content/70">No products yet</h3>
              <p className="text-base-content/40 text-sm">
                Be the first creator to launch something here.
              </p>
              <Link to="/create" className="btn btn-primary btn-sm mt-2">
                Publish product
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      </section>
    </>
  );
}

export default HomePage;
