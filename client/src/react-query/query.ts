import { axiosInstance, debounce } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { CreateProductDTO } from "./mutations";

type Products = {
  id: string;
  name: string;
  description: string;
  status: string;
  price: string;
  createdAt: Date;
  updatedAt: Date;
  tags: {
    name: string;
    id: string;
  }[];
};

async function getProducts() {
  return axiosInstance.get<Products[]>("products");
}

export function useGetProductsQuery() {
  return useQuery({ queryKey: ["allProducts"], queryFn: () => getProducts() });
}

async function searchProducts({ queryKey }: { queryKey: string[] }) {
  return axiosInstance.get<Products[]>("/search-product", {
    params: {
      query: queryKey[1],
    },
  });
}

export function useSearchProductsQuery(query: string) {
  return useQuery({
    queryKey: ["searchProducts", query],
    queryFn: searchProducts,
    enabled: !!query,
  });
}
