import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    cartItem().then((data) => setCartItems(data));
  }, []);

  const cartItem = async () => {
    try {
      const res = await axios.get("http://localhost:3030/showcartitem");
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // remove item from Cart
  const handleRemoveFromCart = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3030/removefromcart/${id}` );
      if (res.status === 204) {
        // cartItem();
        window.location = '/cart';
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div classNameName="cart">
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
            {" "}
            Cart
          </h2>
          <div className="hidden lg:grid grid-cols-2 py-6">
            <div className="font-normal text-xl leading-8 text-gray-500">
              Courses
            </div>
            <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
              <span className="w-full max-w-[200px] text-center">Price </span>
            </p>
          </div>

          {cartItems.length === 0 ? (
            <div>No Course Found</div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item._id}>
                  {item.courseId && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
                      <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                        <div className="img-box">
                          <img
                            src={item.courseId.img}
                            alt="perfume bottle image"
                            className="xl:w-[140px]"
                          />
                        </div>
                        <div className="pro-data w-full max-w-sm">
                          <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">
                            {item.courseId.course_name}
                          </h5>
                          <p className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                            {item.courseId.course_disc}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                        <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
                          {item.courseId.course_price || 0}{" "}
                          {/* Added null check */}
                        </h6>
                        <button
                          className="rounded-full py-4 w-full max-w-[280px]  flex items-center bg-red-500 justify-center transition-all duration-500 hover:bg-indigo-300"
                          onClick={() => handleRemoveFromCart(item._id)}
                        >
                          <span className="px-2 font-semibold text-lg leading-8 text-indigo-40">
                            Remove from cart
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                <div className="flex items-center justify-between w-full py-6">
                  <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">
                    Total
                  </p>
                  <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">
                    {cartItems.reduce(
                      (total, item) =>
                        total + (item.courseId?.course_price || 0),
                      0
                    )}{" "}
                    {/* Added null check */}
                  </h6>
                </div>
              </div>
            </>
          )}

          <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
            <button className="rounded-full py-4 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
              <span className="px-2 font-semibold text-lg leading-8 text-indigo-600">
                Add Coupon Code
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998"
                  stroke="#4F46E5"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <Link
              to="/buycourse"
              className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-indigo-600 font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700"
            >
              Continue to Payment
              <svg
                className="ml-2"
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
              >
                <path
                  d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998"
                  stroke="white"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Cart;
