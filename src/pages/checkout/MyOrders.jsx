

import {useEffect,useState} from "react";
import axios from "axios";
import {Package, Eye} from "lucide-react";
import { API_URI, AUTH_TOKEN } from "../../config";

export default function MyOrders(){
  const [orders,setOrders]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    async function load(){
      try{
        const res=await axios.get(`${API_URI}/order`,{
          headers:{
            Authorization:`Bearer ${AUTH_TOKEN} `
          }
        });
        setOrders(res.data.data||[]);
      }catch(err){
        console.log(err);
      }finally{
        setLoading(false);
      }
    }
    load();
  },[]);

  if(loading) return <div className="p-10">Loading...</div>;

  return(
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">My Orders</h1>

      {orders.length===0 ? (
        <div className="rounded-2xl border p-10 text-center">
          <Package size={60} className="mx-auto text-slate-400"/>
          <h2 className="text-2xl font-bold mt-4">No Orders Found</h2>
          <p className="text-slate-500 mt-2">Place your first order.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map(order=>(
            <div key={order._id} className="rounded-2xl border bg-white p-6 shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-lg">{order.orderNumber}</h2>
                  <p className="text-sm text-slate-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm">
                  {order.orderStatus}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {order.items?.map(item=>(
                  <div key={item._id} className="flex justify-between border-b pb-2">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-5 font-bold">
                <span>Total</span>
                <span>₹{order.totalAmount}</span>
              </div>

              <div className="mt-5 flex gap-3">
                <button className="rounded-xl bg-indigo-600 text-white px-5 py-2 flex items-center gap-2">
                  <Eye size={18}/>
                  View Details
                </button>

                <button className="rounded-xl border px-5 py-2">
                  Download Invoice
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


