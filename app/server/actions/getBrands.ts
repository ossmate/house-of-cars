import { getBrandsRequest } from "../../api/brand/useBrandsQuery";

export async function getBrands() {
  try {
    const { data } = await getBrandsRequest();

    return data;
  } catch (error) {
    return { error };
  }
}
