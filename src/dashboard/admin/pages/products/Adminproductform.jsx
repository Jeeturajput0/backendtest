import { API_URI } from "../../../../config";
import AddProduct from "../../components/AddProduct";

const AdminProductAdd = () => {
  return (
    <AddProduct
      productApi={`${API_URI}/admin/product`}
      basePath="/admin/products"
    />
  );
};

export default AdminProductAdd;