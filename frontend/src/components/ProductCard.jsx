import { Link } from "react-router";
import { MessageCircleIcon } from "lucide-react";

const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

const ProductCard = ({ product }) => {
  const isNew = new Date(product.createdAt) > oneWeekAgo;

  return (
    <Link
      to={`/product/${product.id}`}
      className="card glass-panel hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
    >
      <figure className="px-4 pt-4">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="rounded-xl h-44 w-full object-cover border border-base-content/10"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-base md:text-lg font-display leading-tight">
          {product.title}
          {isNew && <span className="badge badge-secondary badge-sm">NEW</span>}
        </h2>
        <p className="text-sm text-base-content/70 line-clamp-2">
          {product.description}
        </p>

        <div className="divider my-1"></div>

        <div className="flex items-center justify-between">
          {product.user && (
            <div className="flex items-center gap-2">
              <div className="avatar">
                <div className="w-6 rounded-full ring-1 ring-primary">
                  <img src={product.user.imageUrl} alt={product.user.name} />
                </div>
              </div>
              <span className="text-xs text-base-content/60">{product.user.name}</span>
            </div>
          )}
          {product.comments && (
            <div className="flex items-center gap-1 text-base-content/50" title="Comments">
              <MessageCircleIcon className="size-3" />
              <span className="text-xs">{product.comments.length} comments</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;