import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Img from "../../common/Img";

// Import API service (create this file)
import { getUserPurchaseHistory } from "../../../services/operations/paymentAPI";

export default function PurchaseHistory() {
  const { token } = useSelector((state) => state.auth);
  const [purchaseHistory, setPurchaseHistory] = useState(null);

  // fetch user's purchase history
  const getPurchaseHistory = async () => {
    try {
      const res = await getUserPurchaseHistory(token);
      setPurchaseHistory(res);
    } catch (error) {
      console.log("Could not fetch purchase history.");
    }
  };

  useEffect(() => {
    getPurchaseHistory();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  // Loading Skeleton
  const sklItem = () => {
    return (
      <div className="flex border border-richblack-700 px-5 py-3 w-full">
        <div className="flex flex-1 gap-x-4 ">
          <div className="h-14 w-14 rounded-lg skeleton "></div>

          <div className="flex flex-col w-[40%] ">
            <p className="h-2 w-[50%] rounded-xl skeleton"></p>
            <p className="h-2 w-[70%] rounded-xl mt-3 skeleton"></p>
          </div>
        </div>

        <div className="flex flex-[0.4] flex-col ">
          <p className="h-2 w-[20%] rounded-xl skeleton mt-2"></p>
          <p className="h-2 w-[40%] rounded-xl skeleton mt-3"></p>
        </div>
      </div>
    );
  };

  // return if data is null
  if (purchaseHistory?.length === 0) {
    return (
      <p className="grid h-[50vh] w-full place-content-center text-center text-richblack-5 text-3xl">
        You have not purchased any course yet.
      </p>
    );
  }

  return (
    <>
      <div className="text-4xl text-richblack-5 font-boogaloo text-center sm:text-left">
        Purchase History
      </div>
      {
        <div className="my-8 text-richblack-5">
          {/* Headings */}
          <div className="flex rounded-t-2xl bg-richblack-800 ">
            <p className="w-[45%] px-5 py-3">Course</p>
            <p className="w-1/4 px-2 py-3">Purchase Date</p>
            <p className="flex-1 px-2 py-3">Amount</p>
          </div>

          {/* loading Skeleton */}
          {!purchaseHistory && (
            <div>
              {sklItem()}
              {sklItem()}
              {sklItem()}
              {sklItem()}
              {sklItem()}
            </div>
          )}

          {/* Purchase Items */}
          {purchaseHistory?.map((purchase, i, arr) => (
            <div
              className={`flex flex-col sm:flex-row sm:items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-2xl" : "rounded-none"
              }`}
              key={i}
            >
              <div className="flex sm:w-[45%] items-center gap-4 px-5 py-3">
                <Img
                  src={purchase.course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />

                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{purchase.course.courseName}</p>
                  <p className="text-xs text-richblack-300">
                    {purchase.course.courseDescription.length > 50
                      ? `${purchase.course.courseDescription.slice(0, 50)}...`
                      : purchase.course.courseDescription}
                  </p>
                </div>
              </div>

              {/* only for smaller devices */}
              <div className="sm:hidden">
                <div className="px-2 py-3">
                  {formatDate(purchase.createdAt)}
                </div>

                <div className="px-2 py-3">
                  <p>₹{purchase.amount}</p>
                </div>
              </div>

              {/* only for larger devices */}
              <div className="hidden w-1/4 sm:flex px-2 py-3">
                {formatDate(purchase.createdAt)}
              </div>
              <div className="hidden sm:flex flex-1 px-2 py-3">
                <p>₹{purchase.amount}</p>
              </div>
            </div>
          ))}
        </div>
      }
    </>
  );
}
