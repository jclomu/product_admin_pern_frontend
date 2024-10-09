import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, { loader as productsLoader, action as updateAvailabilityAction } from "./views/Products";
import NewProduct, { action as newProductAction } from "./views/NewProduct";
import EditProduct, { loader as editProductsLoader, action as editProductsAction } from "./views/EditProduct";
import { action as deleteProductAction } from "./components/ProductDetail";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productsLoader,
                action: updateAvailabilityAction
            },
            {
                path: 'products/new',
                element: <NewProduct />,
                action: newProductAction
            },
            {
                path: 'products/:id/edit', // ROA Pattern - Resource-orieted Design
                element: <EditProduct />,
                loader: editProductsLoader,
                action: editProductsAction
            },
            {
                path: 'products/:id/delete', // ROA Pattern - Resource-orieted Design
                action: deleteProductAction
                // element: <EditProduct />,
                // loader: editProductsLoader,
            }
        ]
    }
])