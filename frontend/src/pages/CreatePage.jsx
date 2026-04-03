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
    <div className="max-w-lg mx-auto">
      <Link to={"/"} className="btn btn-ghost btn-sm gap-1 mb-4">
        <ArrowLeftIcon className="size-4" /> Back
      </Link>

      <div className="card glass-panel">
        <div className="card-body">
          <h1 className="card-title text-2xl font-display">
            <SparklesIcon className="size-5 text-primary" />
            Publish a Product
          </h1>
          <p className="text-sm text-base-content/65">
            Write clear details so people understand the value in seconds.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <label className="input input-bordered flex items-center gap-2 bg-base-200">
              <TypeIcon className="size-4 text-base-content/50" />
              <input
                type="text"
                placeholder="Product title (e.g. TaskFlow CRM)"
                className="grow"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 bg-base-200">
              <ImageIcon className="size-4 text-base-content/50" />
              <input
                type="url"
                placeholder="Cover image URL"
                className="grow"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                required
              />
            </label>

            {formData.imageUrl && (
              <div className="rounded-box overflow-hidden border border-base-content/10">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full h-40 object-cover"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}

            <div className="form-control">
              <div className="flex items-start gap-2 p-3 rounded-box bg-base-200 border border-base-300">
                <FileTextIcon className="size-4 text-base-content/50 mt-1" />
                <textarea
                  placeholder="What does this product solve? Who is it for?"
                  className="grow bg-transparent resize-none focus:outline-none min-h-24"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {createProduct.isError && (
              <div role="alert" className="alert alert-error alert-sm">
                <span>Failed to create. Try again.</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={createProduct.isPending}
            >
              {createProduct.isPending ? (
                <span className="loading loading-spinner" />
              ) : (
                "Publish now"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
