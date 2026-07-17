import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { API_URI, AUTH_TOKEN } from "../../../config";
import { useParams } from "react-router-dom";

const AddBrand = () => {
  const { brand_id } = useParams;
  // const [brand,setBrand]=useState([])
  const [formData, setformData] = useState({
    name: "",
    // logo: "",
    description: "",
    isActive: true,
  });

  const getBrandDetail = async () => {
    try {
      const res = await fetch(`${API_URI}/admin/brand/${brand_id}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      const resdata = res.json();
      const data = resdata.data;

      setformData({
        name: data.name,
        description: data.description,
        isActive: data.isActive,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      brand_id ? getBrandDetail() : "";
    }, 200);
  }, []);

  // const getBrand =async()=>{
  //   try {
  //         const res = await fetch(`${API_URI}/admin/category`, {
  //         headers:{
  //           Authorization:`Bearar ${AUTH_TOKEN}`
  //         }
  //         })
  //         const resData =await res.json()
  //         setBrand(resData.data)

  //   } catch (error) {
  //   console.log(error);

  //   }
  // }

  const handleChange = (e) => {
    setBrand({ ...brand, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const api = brand_id
        ? `${API_URI}/admin/brand${brand_id}`
        : `${API_URI}/admin/brand`;
      const method = brand_id ? "PUT" : "POST";
      const res = await fetch(api, {
        method,
        headers: {
          Authorization: `Berbar ${AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      navigate("/admin/brand");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Brand</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Brand Name */}
        <div>
          <label className="block mb-2 font-medium">Brand Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => {
              setformData({ ...formData, ["name"]: e.target.value });
            }}
            placeholder="Enter Brand Name"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Logo URL */}
        {/*  <div>
           <label className="block mb-2 font-medium">
            Logo URL
          </label>

          <input
            type="text"
            name="logo"
            value={brand.logo}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">Description</label>

          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={(e) => {
              setformData({ ...formData, ["description"]: e.target.value });
            }}
            placeholder="Brand Description"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-2 font-medium">Status</label>

          <select
            name="isActive"
            value={formData.isActive}
            onChange={(e) => {
              setformData({ ...formData, ["isActive"]: e.target.value });
            }}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* Preview */}
        {/* {brand.logo && (
          <div>
            <label className="block mb-2 font-medium">Logo Preview</label>

            <img
              src={brand.logo}
              alt="Brand Logo"
              className="h-24 object-contain border rounded-lg p-3"
            />
          </div>
        )} */}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Add Brand
        </button>
      </form>
    </div>
  );
};

export default AddBrand;
