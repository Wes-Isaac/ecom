import { AddProductDTO } from "@/components/forms/add-product";
import { axiosInstance } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";

export type CreateProductDTO = Omit<AddProductDTO, "tags"> & { tags: string[] };

async function createProduct(data: CreateProductDTO) {
  return axiosInstance.post("add-product", data);
}

export function useCreateProductMutation() {
  return useMutation({
    mutationFn: (data: CreateProductDTO) => createProduct(data),
  });
}

async function updateProduct(id: string, data: CreateProductDTO) {
  return axiosInstance.put(`update-product/${id}`, data);
}

export function useUpdateProductMutation() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateProductDTO }) =>
      updateProduct(id, data),
  });
}

async function deleteProduct(id: string) {
  return axiosInstance.delete(`delete-product/${id}`);
}

export function useDeleteProductMutation() {
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
  });
}
