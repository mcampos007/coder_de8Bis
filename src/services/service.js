import ProductServiceDao from  "./dao/mongo/products.service.js";
import CartServiceDao from "./db/carts.service.js";

import ProductsRepository from  "./repository/product.repository.js";
import CartsRepository from "./repository/cart.repository.js";


// Generamos las instancias de las clases
const productDao = new ProductServiceDao();
const cartDao = new CartServiceDao();

export const productService = new ProductsRepository(productDao);
export const cartService = new CartsRepository(cartDao);