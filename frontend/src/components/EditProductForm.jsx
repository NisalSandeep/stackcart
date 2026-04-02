import {
  ArrowLeftIcon,
  ImageIcon,
  TypeIcon,
  FileTextIcon,
  SaveIcon,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

function EditProductForm({ product, isPending, isError, onSubmit }) {
  const [formData, setFormData] = useState({
    title: product.title,
    description: product.description,
    imageUrl: product.imageUrl,
  });

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/profile" className="inline-flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors mb-8">
        <ArrowLeftIcon className="size-5" />
        <span>Back to Profile</span>
      </Link>

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Edit Product</h1>
          <p className="text-base-content/60">Update your product information</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
          className="space-y-6"
        >
          {/* TITLE INPUT */}
          <div className="space-y-2">
            <label className="text-sm font-semibold">Product Title</label>
            <input
              type="text"
              placeholder="Enter product title"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-primary/50 focus:bg-white/20 transition-all placeholder-base-content/40"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          {/* IMAGE URL INPUT */}
          <div className="space-y-2">
            <label className="text-sm font-semibold">Image URL</label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-primary/50 focus:bg-white/20 transition-all placeholder-base-content/40"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              required
            />
          </div>

          {/* IMAGE PREVIEW */}
          {formData.imageUrl && (
            <div className="space-y-2">
              <label className="text-sm font-semibold">Preview</label>
              <div className="rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/20">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
            </div>
          )}

          {/* DESCRIPTION INPUT */}
          <div className="space-y-2">
            <label className="text-sm font-semibold">Description</label>
            <textarea
              placeholder="Describe your product..."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-primary/50 focus:bg-white/20 transition-all resize-none h-32 placeholder-base-content/40"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          {/* ERROR MESSAGE */}
          {isError && (
            <div className="p-4 bg-error/10 border border-error/30 rounded-xl">
              <p className="text-sm text-error font-medium">Failed to update product. Please try again.</p>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <span className="loading loading-spinner loading-sm" />
                Saving...
              </span>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
export default EditProductForm;
