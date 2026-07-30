import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";

const Cart = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="mx-auto max-w-7xl px-5">

        <h1 className="mb-8 text-4xl font-bold">
          Shopping Cart
        </h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">

          {/* Cart Items */}

          <div className="space-y-5">

            <div className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow md:flex-row">

              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
                alt="Product"
                className="h-40 w-40 rounded-xl object-cover"
              />

              <div className="flex flex-1 flex-col justify-between">

                <div>
                  <h2 className="text-2xl font-bold">
                    Nike Air Max Shoes
                  </h2>

                  <p className="mt-2 text-gray-500">
                    Color : Black
                  </p>

                  <p className="text-gray-500">
                    Size : 42
                  </p>

                  <h3 className="mt-4 text-2xl font-bold text-orange-600">
                    ₹2,499
                  </h3>
                </div>

                <div className="mt-5 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <button className="rounded-lg border p-2">
                      <Minus size={18} />
                    </button>

                    <span className="text-lg font-semibold">
                      1
                    </span>

                    <button className="rounded-lg border p-2">
                      <Plus size={18} />
                    </button>

                  </div>

                  <button className="text-red-500">
                    <Trash2 size={22} />
                  </button>

                </div>

              </div>

            </div>

            <div className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow md:flex-row">

              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
                alt="Product"
                className="h-40 w-40 rounded-xl object-cover"
              />

              <div className="flex flex-1 flex-col justify-between">

                <div>
                  <h2 className="text-2xl font-bold">
                    Apple Watch Series 9
                  </h2>

                  <p className="mt-2 text-gray-500">
                    Color : Silver
                  </p>

                  <p className="text-gray-500">
                    Size : Standard
                  </p>

                  <h3 className="mt-4 text-2xl font-bold text-orange-600">
                    ₹18,999
                  </h3>
                </div>

                <div className="mt-5 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <button className="rounded-lg border p-2">
                      <Minus size={18} />
                    </button>

                    <span className="text-lg font-semibold">
                      1
                    </span>

                    <button className="rounded-lg border p-2">
                      <Plus size={18} />
                    </button>

                  </div>

                  <button className="text-red-500">
                    <Trash2 size={22} />
                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* Order Summary */}

          <div className="h-fit rounded-2xl bg-white p-6 shadow">

            <h2 className="mb-6 text-2xl font-bold">
              Order Summary
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹21,498</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹3,869.64</span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>₹25,367.64</span>
              </div>

            </div>

            <input
              type="text"
              placeholder="Coupon Code"
              className="mt-6 w-full rounded-xl border p-3 outline-none"
            />

            <button className="mt-4 w-full rounded-xl border py-3 font-semibold hover:bg-gray-100">
              Apply Coupon
            </button>

            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-4 text-white hover:bg-gray-800">
              Proceed To Checkout
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Cart;