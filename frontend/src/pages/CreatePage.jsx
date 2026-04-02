import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCreateProduct } from "../hooks/useProduct";
import { ArrowLeftIcon, FileTextIcon, SparklesIcon, TypeIcon, ImageIcon } from "lucide-react";

function CreatePage() {
  const navigate = useNavigate();
  const createProduct = useCreateProduct();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct.mutate(formData, {
      onSuccess: () => navigate("/"),
      onError: () => alert("Failed to create product. Please try again."),
    });
  };


  return (
    <div className="max-w-2xl mx-auto">
      <Link to={"/"} className="inline-flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors mb-8">
        <ArrowLeftIcon className="size-5" />
        <span>Back Home</span>
      </Link>

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Create New Product</h1>
          <p className="text-base-content/60">Share your amazing creation with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            </div>
          )}

          {/* ERROR MESSAGE */}
          {createProduct.isError && (
            <div className="p-4 bg-error/10 border border-error/30 rounded-xl">
              <p className="text-sm text-error font-medium">Failed to create product. Please try again.</p>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={createProduct.isPending}
            className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {createProduct.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <span className="loading loading-spinner loading-sm" />
                Creating...
              </span>
            ) : (
              "Create Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePage;
