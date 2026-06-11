import api from "./api";

export const getProducts =
  async () => {

    const response =
      await api.get("/products");

    return response.data;
};

export const addProduct =
  async (formData) => {

    const response =
      await api.post(
        "/products/add",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
};

export const deleteProduct =
  async (id) => {

    const response =
      await api.delete(
        `/products/${id}`
      );

    return response.data;

    export const updateProduct =
  async (id, data) => {

    const response =
      await api.put(
        `/products/${id}`,
        data
      );

    return response.data;
};

};