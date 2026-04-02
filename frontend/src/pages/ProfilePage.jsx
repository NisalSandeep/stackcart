import { Link, useNavigate } from "react-router";
import { useMyProducts, useDeleteProduct } from "../hooks/useProduct";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth, SignInButton } from "@clerk/react";
import { PlusIcon, PackageIcon, EyeIcon, EditIcon, Trash2Icon } from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { data: products, isLoading, error } = useMyProducts();
  const deleteProduct = useDeleteProduct();

  const handleDelete = (id) => {
    if (confirm("Delete this product?")) deleteProduct.mutate(id);
  };

  if (!isSignedIn) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Sign in Required</h2>
          <p className="text-base-content/60">Please sign in to view your products</p>
          <SignInButton mode="modal">
            <button className="btn btn-primary mt-4">Sign In</button>
          </SignInButton>
        </div>
      </div>
    );
  }

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="card bg-base-300 max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">Error Loading Products</h2>
          <p className="text-base-content/60">{error.message || "Failed to load your products"}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary mt-4">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold">My Products</h1>
          <p className="text-base-content/60 mt-1">Manage and showcase your creations</p>
        </div>
        <Link to="/create" className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all">
          <span className="flex items-center gap-2">
            <PlusIcon className="size-5" />
            <span>New Product</span>
          </span>
        </Link>
      </div>

      {/* STATS */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
        <div className="space-y-2">
          <p className="text-sm text-base-content/60 font-medium">TOTAL PRODUCTS</p>
          <p className="text-4xl font-bold text-primary">{products?.length || 0}</p>
        </div>
      </div>

      {/* PRODUCTS LIST */}
      {products?.length === 0 ? (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-12 text-center space-y-4">
          <PackageIcon className="size-16 text-base-content/20 mx-auto" />
          <h2 className="text-2xl font-bold">No products yet</h2>
          <p className="text-base-content/60">Start by creating your first product</p>
          <Link to="/create" className="inline-block px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all mt-4">
            Create Product
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 hover:border-white/30 transition-all duration-300"
            >
              <div className="flex gap-6">
                {/* IMAGE */}
                <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* CONTENT */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-base-content/70 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 self-center">
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-primary/20 hover:border-primary/40 transition-all"
                    title="View"
                  >
                    <EyeIcon className="size-5" />
                  </button>
                  <button
                    onClick={() => navigate(`/edit/${product.id}`)}
                    className="p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-primary/20 hover:border-primary/40 transition-all"
                    title="Edit"
                  >
                    <EditIcon className="size-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-error/20 hover:border-error/40 transition-all disabled:opacity-50"
                    disabled={deleteProduct.isPending}
                    title="Delete"
                  >
                    {deleteProduct.isPending ? (
                      <span className="loading loading-spinner loading-sm" />
                    ) : (
                      <Trash2Icon className="size-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;