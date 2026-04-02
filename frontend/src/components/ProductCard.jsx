import { Link } from "react-router";
import { MessageCircleIcon } from "lucide-react";

const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

const ProductCard = ({ product }) => {
  const isNew = new Date(product.createdAt) > oneWeekAgo;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block h-full"
    >
      <div className="h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {isNew && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-primary/90 text-white text-xs font-bold rounded-full">
                ✨ NEW
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div>
            <h3 className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            <p className="text-sm text-base-content/70 line-clamp-2 mt-2">
              {product.description}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-white/20">
            {product.user && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full ring-2 ring-primary/50 overflow-hidden">
                  <img
                    src={product.user.imageUrl}
                    alt={product.user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-medium text-base-content/80">
                  {product.user.name}
                </span>
              </div>
            )}
            {product.comments && (
              <div className="flex items-center gap-1 text-primary">
                <MessageCircleIcon className="size-4" />
                <span className="text-xs font-semibold">{product.comments.length}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;