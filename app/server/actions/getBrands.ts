import { getBrandsRequest } from "../../api/brand/getBrandsQuery";

export async function getBrands() {
  try {
    const { data } = await getBrandsRequest();

    return data;
  } catch (error) {
    return { error };
  }
}
