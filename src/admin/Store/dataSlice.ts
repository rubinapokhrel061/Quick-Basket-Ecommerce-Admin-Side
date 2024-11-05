import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Category,
  InititalState,
  OrderData,
  OrderStatus,
  Product,
  SingleOrder,
  User,
} from "../Types/dataTypes";
import { Status } from "../Types/status";
import { APIAuthenticated } from "../http";
import { AppDispatch } from "./store";
import toast from "react-hot-toast";
// Define the initial state based on the InititalState type
const initialState: InititalState = {
  orders: [],
  products: [],
  users: [],
  categories: [],
  status: Status.LOADING,
  singleProduct: null,
  singleOrder: [],
};
interface DeleteProduct {
  productId: string;
}
interface DeleteUser {
  userId: string;
}
interface DeleteOrder {
  orderId: string;
}
interface DeleteCategory {
  categoryId: string;
}
export interface AddProduct {
  productName: string;
  productDescription: string;
  productPrice: number;
  productTotalStockQty: number;
  image: null;
  categoryId: string;
}
export interface UpdateProduct {
  id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productTotalStockQty: number;
  image: null;
  categoryId: string;
}
// Create the slice
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    // Define a reducer to set the status
    setStatus(state: InititalState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    resetStatus(state: InititalState) {
      state.status = Status.LOADING;
    },
    setProduct(state: InititalState, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setOrders(state: InititalState, action: PayloadAction<OrderData[]>) {
      state.orders = action.payload;
    },
    setUsers(state: InititalState, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },

    setSingleProduct(state: InititalState, action: PayloadAction<Product>) {
      state.singleProduct = action.payload;
    },
    updateProduct(state: InititalState, action: PayloadAction<Product>) {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    setDeleteProduct(
      state: InititalState,
      action: PayloadAction<DeleteProduct>
    ) {
      const index = state.products.findIndex(
        (item) => (item.id = action.payload.productId)
      );
      state.products.splice(index, 1);
    },
    setDeleteUser(state: InititalState, action: PayloadAction<DeleteUser>) {
      const index = state.users.findIndex(
        (item) => (item.id = action.payload.userId)
      );
      state.users.splice(index, 1);
    },
    setDeleteOrder(state: InititalState, action: PayloadAction<DeleteOrder>) {
      const index = state.orders.findIndex(
        (item) => (item.id = action.payload.orderId)
      );
      state.orders.splice(index, 1);
    },
    setCategories(state: InititalState, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
    updateCategoryInState(
      state: InititalState,
      action: PayloadAction<Category>
    ) {
      const index = state.categories.findIndex(
        (category) => category.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index] = action.payload; // Update the category in the state
      }
    },
    setDeleteCategory(
      state: InititalState,
      action: PayloadAction<DeleteCategory>
    ) {
      const index = state.categories.findIndex(
        (item) => (item.id = action.payload.categoryId)
      );
      state.categories.splice(index, 1);
    },
    setSingleOrder(state: InititalState, action: PayloadAction<SingleOrder[]>) {
      state.singleOrder = action.payload;
    },
    updateOrderStatusById(
      state: InititalState,
      action: PayloadAction<{ orderId: string; status: OrderStatus }>
    ) {
      const index = state.singleOrder.findIndex(
        (order) => (order.id = action.payload.orderId)
      );
      if (index !== -1) {
        state.singleOrder[index].Order.orderStatus = action.payload.status;
        console.log(action.payload.status, "STATUS");
      }
    },
  },
});

// Export the action and reducer
export const {
  setStatus,
  resetStatus,
  setProduct,
  setOrders,
  setUsers,
  setDeleteProduct,
  setDeleteUser,
  setDeleteOrder,
  setSingleProduct,
  setCategories,
  setDeleteCategory,
  setSingleOrder,
  updateOrderStatusById,
  updateProduct,
  updateCategoryInState,
} = dataSlice.actions;
export default dataSlice.reducer;

export function fetchProducts() {
  return async function fetchProductsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get("admin/product");
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setProduct(data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchOrders() {
  return async function fetchOrdersThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get("/order");
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setOrders(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchUsers() {
  return async function fetchUsersThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get("/users");
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setUsers(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
export function addProduct(data: AddProduct) {
  return async function addProductThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.post("/admin/product", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        toast.success(response.data.message);
        dispatch(fetchProducts());
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      toast.error(error.response.data.message);
    }
  };
}
export function updateProductDetails(id: string, data: AddProduct) {
  return async function updateCategoryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.patch(
        `/admin/product/${id}`,
        data
      );
      if (response.status === 200) {
        console.log(response.data.message);
        dispatch(updateProduct(response.data));
        dispatch(setStatus(Status.SUCCESS));
        toast.success(response?.data?.message);
        dispatch(fetchProducts());
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      toast.error(error.response.data.message);
    }
  };
}

export function deleteProduct(id: string) {
  return async function deleteProductThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.delete("/admin/product/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setDeleteProduct({ productId: id }));
        dispatch(fetchProducts());
        toast.success(response.data.message);
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      toast.error(error.response.data.message);
    }
  };
}

export function deleteUser(id: string) {
  return async function deleteUserThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.delete("/user/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setDeleteUser({ userId: id }));
        toast.success(response.data.message);
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      toast.error(error.response.data.message);
    }
  };
}

export function deleteOrder(id: string) {
  return async function deleteProductThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.delete("/order/admin/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setDeleteOrder({ orderId: id }));
        toast.success(response.data.message);
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      toast.error(error.response.data.message);
    }
  };
}
export function addCategory(data: { categoryName: string }) {
  return async function addCategoryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.post("/admin/category", data);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        setCategories(response.data.data);
        toast.success(response.data.message);
        dispatch(fetchCaetgories());
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      toast.error(error.response.data.message);
    }
  };
}
export function fetchCaetgories() {
  return async function fetchCaetgoriesThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get("admin/category");
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setCategories(data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
export function deleteCategory(id: string) {
  return async function deleteProductThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.delete("/admin/category/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setDeleteCategory({ categoryId: id }));
        toast.success(response.data.message);
        dispatch(fetchCaetgories());
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      toast.error(error.response.data.message);
    }
  };
}
// Thunk for updating a category
export function updateCategory(id: string, data: { categoryName: string }) {
  return async function updateCategoryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.patch(
        `/admin/category/${id}`,
        data
      );
      if (response.status === 200) {
        console.log(response.data.message);
        dispatch(updateCategoryInState(response.data)); // Update the category in state
        dispatch(setStatus(Status.SUCCESS));
        toast.success(response?.data?.message);
        dispatch(fetchCaetgories());
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      toast.error(error.response.data.message);
    }
  };
}

export function singleProduct(id: string) {
  return async function singleProductThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get("/admin/product/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setSingleProduct(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function singleOrder(id: string) {
  return async function singleOrderThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.get("/order/customer/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setSingleOrder(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
export function handleOrderStatusById(status: OrderStatus, id: string) {
  return async function handleOrderStatusThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIAuthenticated.patch("/order/admin/" + id, {
        orderStatus: status,
      });
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(updateOrderStatusById({ orderId: id, status }));
        toast.success(response.data.message);
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      toast.error(error.response.data.message);
    }
  };
}
