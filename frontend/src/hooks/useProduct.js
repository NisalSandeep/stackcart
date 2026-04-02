import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, deleteProduct, getAllProducts, getMyProducts, getproductById } from "../lib/api";

export const useProducts = () => {
  const result = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  return result;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProducts"] });
    }
  });
  return result;
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getproductById(id),
    enabled: !!id,
    // double bang operator to convert id to boolean, so that the query will only run if id is truthy
  });
  
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProducts"] });
    }
  });
};

export const useMyProducts = () => {
  return useQuery({
    queryKey: ["myProducts"],
    queryFn: () => getMyProducts(),
  });
};