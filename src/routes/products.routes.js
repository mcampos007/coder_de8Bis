import { Router } from "express";
import { validateProduct } from "../utils/validateProduct.js";
import {getAll, save, findById, findByTitle, deleteById, update} from "../controllers/products.controller.js"
import __dirname from "../utils.js";


const router = Router();



//Recuperar todos los productos
router.get('/', getAll);

// Recuperar un producto por ID
router.get('/:pid', findById);

//REgistrar Producto
router.post('/', validateProduct ,save);

//Updte Product
router.put('/:pid', validateProduct, update);

//Delete Product
router.delete('/:pid', deleteById);

/* router.param("word", async (req, res, next, name) => {
    console.log("Buscando título de producto, valor: " + name);
    try {
        let result = await ProductService.findByName(name);
        if (!result) {
            req.product = null;
            throw new Error('No products found');
        } else {
            req.product = result
        }
        next();
    } catch (error) {
        console.error('Ocurrió un error:', error.message);
        res.status(500).send({ error: "Error:", message: error.message });
    }
}); */

router.get("*", (req, res) => {
    res.status(400).send("Cannot get that URL!!")
});
export default router;