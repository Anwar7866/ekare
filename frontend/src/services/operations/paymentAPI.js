import { apiConnector } from "../apiConnector";
import { studentEndpoints } from "../apis";

export const getUserPurchaseHistory = async (token) => {
  try {
    const response = await apiConnector(
      "GET",
      studentEndpoints.GET_PURCHASE_HISTORY_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data.data;
  } catch (error) {
    console.log("GET_PURCHASE_HISTORY_API ERROR", error);
    throw error;
  }
};
