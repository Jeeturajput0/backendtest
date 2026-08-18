import { API_URI } from "../../../../config";
import AddProduct from "../../../admin/components/AddProduct";


const VendorProductAdd = () => {
  return (
    <AddProduct
      productApi={`${API_URI}/vendor/products`}
      basePath="/vendor/products"
    />
  );
};

export default VendorProductAdd;