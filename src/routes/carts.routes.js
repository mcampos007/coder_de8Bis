import { Router } from "express";
import { validateCart } from "../utils/validateCart.js";
import __dirname from "../utils.js";
import {getAll, save, addProductToCart, deleteCart} from "../controllers/carts.controller.js";

const router = Router();


// Recuperar todos los carritos
router.get('/', getAll);

//Registra un carrito
router.post('/', validateCart , save);

//Registrar un producto a uncarrito
router.post('/:cid/product/:pid', validateCart, addProductToCart);   

// Delete Cart
router.delete('/:cid', deleteCart );   

//eliminar del carrito el producto seleccionado
//DELETE api/carts/:cid/products/:pid 
/* router.delete('/:cid/products/:pid', async(req, res) => {
    try{
        const {cid, pid } = req.params;
        console.log(`cid${cid}`);
        console.log(`pid${pid}`);
        const productoEliminado = await cartsDao.deleteProductToCart(cid, pid);
        res.json({
            productoEliminado
        });
    }
    catch(error){
        console.log(error);
        res.json({
            error:error
        });
    }
    
}); */

export default router;  

