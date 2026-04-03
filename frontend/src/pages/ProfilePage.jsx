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
      <div className="card glass-panel max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Sign in required</h2>
          <p className="text-base-content/60">Log in to manage your published products.</p>
          <SignInButton mode="modal">
            <button className="btn btn-primary mt-4">Log in</button>
          </SignInButton>
        </div>
      </div>
    );
  }

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="card glass-panel max-w-md mx-auto">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">Couldn't load products</h2>
          <p className="text-base-content/60">{error.message || "Please try again in a moment."}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary mt-4">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Creator dashboard</h1>
          <p className="text-base-content/60 text-sm">Track and manage everything you published.</p>
        </div>
        <Link to="/create" className="btn btn-primary btn-sm gap-1">
          <PlusIcon className="size-4" /> Publish
        </Link>
      </div>

      {/* Stats */}
      <div className="stats glass-panel w-full">
        <div className="stat">
          <div className="stat-title">Total products</div>
          <div className="stat-value text-primary">{products?.length || 0}</div>
        </div>
      </div>

      {/* Products */}
      {products?.length === 0 ? (
        <div className="card glass-panel">
          <div className="card-body items-center text-center py-16">
            <PackageIcon className="size-16 text-base-content/20" />
            <h3 className="card-title text-base-content/50">No products yet</h3>
            <p className="text-base-content/40 text-sm">Publish your first product to start growing your page.</p>
            <Link to="/create" className="btn btn-primary btn-sm mt-4">
              Publish product
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <div key={product.id} className="card card-side glass-panel">
              <figure className="w-32 shrink-0">
                <img src={product.imageUrl} alt={product.title} className="h-full object-cover" />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-base">{product.title}</h2>
                <p className="text-sm text-base-content/60 line-clamp-1">{product.description}</p>
                <div className="card-actions justify-end mt-2">
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="btn btn-ghost btn-xs gap-1"
                  >
                    <EyeIcon className="size-3" /> View
                  </button>
                  <button
                    onClick={() => navigate(`/edit/${product.id}`)}
                    className="btn btn-ghost btn-xs gap-1"
                  >
                    <EditIcon className="size-3" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-ghost btn-xs text-error gap-1"
                    disabled={deleteProduct.isPending}
                  >
                    <Trash2Icon className="size-3" /> Delete
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