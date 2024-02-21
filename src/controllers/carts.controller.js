//import ProductService from "../services/db/products.service.js";
//import { productService } from "../services/factory.js";
import { cartService } from "../services/service.js";
import CartDTO from "../services/dto/cart.dto.js";


export const getAll = async(req, res) =>{
    try {
        const {limit, page, query, sort} = req.body;
        let carts = await cartService.getAll(limit, page, query, sort);
        res.send(carts);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los carritos." });
    }

}

export const save = async(req, res) =>{
    try {
        let newCart = new CartDTO(req.body);
        let result = await cartService.save(newCart);
        res.status(201).send(result);    
    }catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo guardar el Cart." });
    }
}

export const addProductToCart = async(req, res) =>{
    try {
        const {cid, pid} = req.params;
        let cart = await cartService.findById(cid);
        if (!cart){
            res.status(500).send({  message: "No existe el carrito a actualizar." });
        }
        let result = await cartService.addProductToCart(cart, pid);
        res.status(201).send(result);    
     }catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo actualizar la cantidad del item en el Cart." });
    }
};

export const deleteCart = async(req, res) =>{
    try{
        let {cid} = req.params;
        //const cartEliminado = await cartsDao.deleteCart(cid);
        const result = await cartService.delete(cid);
        res.status(204).send(result);    
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo eliminar el carrito." });
    }

};

export const findByTitle = async(req, res)=>{
    try {
        let {title} = req.params;
        const result = await productService.findById(title);
        if (!result){
            return res.json({
                error:"El Producto No Existe"
            });
        }
        res.json({
            result
        });    
    } catch (error) {
        return error;
    }

}

export const findById = async(req, res) => {
    try {
        let {pid} = req.params;
        const result = await productService.findById(pid);
        if (!result){
            return res.json({
                error:"El Producto No Existe"
            });
        }
        res.json({
            result
        });    
    } catch (error) {
        return error;
    }

};



export const update = async(req, res) =>{
    try {
        const pid = req.params.pid;
        let newProduct = new ProductDTO(req.body);
        let result = await productService.update(pid,newProduct);
        res.status(201).send(result); 
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo Actualizar el producto." });
    }
    
}







