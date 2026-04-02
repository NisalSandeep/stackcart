import {
  ArrowLeftIcon,
  EditIcon,
  Trash2Icon,
  CalendarIcon,
  UserIcon,
} from "lucide-react";
import { CommentsSection } from "../components/CommentsSection";
import { useProduct, useDeleteProduct } from "../hooks/useProduct";
import { Link, useNavigate, useParams } from "react-router";
import { useAuth } from "@clerk/react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-hot-toast";

function ProductPage() {
  const { id } = useParams();
  const { userId } = useAuth();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useProduct(id);
  const deleteProduct = useDeleteProduct();

  const handleDeleteProduct = () => {
    if (
      !confirm(
        "Are you sure you want to delete this product? This action cannot be undone.",
      )
    ) {
      toast.error("Product deletion cancelled");
      return;
    }

    deleteProduct.mutate(id, {
      onSuccess: () => {
        toast.success("Successfully Deleted the product");
        navigate("/");
      },
      onError: toast.error("Failed to Delete the product"),
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !product) {
    return (
      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold text-error">Product not found</h2>
        <p className="text-base-content/60">This product doesn't exist or has been deleted.</p>
        <Link to="/" className="inline-block px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all">
          Go Home
        </Link>
      </div>
    );
  }

  const isOwner = userId === product.userId;

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <Link to={"/"} className="inline-flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors">
            <ArrowLeftIcon className="size-5" />
            <span>Back</span>
          </Link>

          {isOwner && (
            <div className="flex gap-2">
              <Link
                to={`/edit/${product.id}`}
                className="p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-primary/20 hover:border-primary/40 transition-all"
                title="Edit"
              >
                <EditIcon className="size-5" />
              </Link>
              <button
                className="p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-error/20 hover:border-error/40 transition-all disabled:opacity-50"
                onClick={handleDeleteProduct}
                disabled={deleteProduct.isPending}
                title="Delete"
              >
                {deleteProduct.isPending ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <Trash2Icon className="size-4" />
                )}
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Image */}
          <div className="card bg-base-300">
            <figure className="p-4">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="rounded-xl w-full h-80 object-cover"
              />
            </figure>
          </div>

          <div className="card bg-base-300">
            <div className="card-body">
              <h1 className="card-title text-2xl">{product.title}</h1>

              <div className="flex flex-wrap gap-4 text-sm text-base-content/60 my-2">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="size-4" />
                  {new Date(product.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <UserIcon className="size-4" />
                  {product.user?.name}
                </div>
              </div>

              <div className="divider my-2"></div>

              <p className="text-base-content/80 leading-relaxed">
                {product.description}
              </p>
              {product.user && (
                <>
                  <div className="divider my-2"></div>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={product.user.imageUrl}
                          alt={product.user.name}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">{product.user.name}</p>
                      <p className="text-xs text-base-content/50">Creator</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="card bg-base-300">
          <div className="card-body">
            <CommentsSection
              productId={id}
              comments={product.comments}
              currentUserId={userId}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
