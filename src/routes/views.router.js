import { Router } from "express";
import cookieParser from 'cookie-parser'
import session from "express-session";
import userModel from "../routes/users.routes.js"
import usersDao from "../services/db/users.service.js";
import ProductService from "../services/db/products.service.js";
import { authToken, passportCall, authorization } from "../utils.js";
//import {PRIVATE_KEY} from "../config/.env.js";
import config from "..//config/config.js";
import passport from "passport";




const router = Router();
const PRIVATE_KEY = config.privatekey;

// router.use(cookieParser('PRIVATE_KEY'))

// Ex index, ajustado para el entregable
/* router.get('/', (req, res) => {
    const data = {
        title: 'Index',
        bodyClass: 'landing-page' // Puedes cambiar esto dinámicamente según tus necesidades
    };
   res.render('index', data)
   
}); */

//router.get('/ingresar', (req, res) => {
// Cabiado para el entregable    
router.get('/', (req, res) => {
    const data = {
        title: 'Signup-page',
        bodyClass: 'signup-page' // Puedes cambiar esto dinámicamente según tus necesidades
    }; 
    //console.log("voy a renderizar login");
    res.render('users/login', data);
});

/* router.get('/home', (req, res) => {
    // Verificar si el usuario está autenticado
    console.log(req.session);
    if (req.session && req.session.user && req.session.admin) {
        // Acceder a la información de la sesión
        const username = req.session.user;
        const isAdmin = req.session.admin;

        // Realizar acciones basadas en la información de la sesión
        //res.send(`Bienvenido, ${username}! (Admin: ${isAdmin ? 'Sí' : 'No'})`);
        const data = {
            title: 'Home-page',
            bodyClass: 'landing-page', // Puedes cambiar esto dinámicamente según tus necesidades
            username : username
        };
        console.log(req.session.user)
        res.render('home', data)
    } else {
        // El usuario no está autenticado, redirigir o manejar según sea necesario
        res.redirect('/ingresar'); // Por ejemplo, redirigir a la página de inicio de sesión
    }
}); */

//passport.authenticate('jwt', {session: false})
router.get('/profile', passportCall('current') , authorization('user'), (req, res) => {
   // console.log("datos de la session");
   // console.log(req.session.user);
   // if (!req.session.user){
   //    return  res.render('errors', { message: 'Usuario no autenticado' });
   // }
    /* const user= {
        name: req.session.user.name,
        email: req.session.user.email,
        age: req.session.user.age,
        role: req.session.user.role 
    } */
   /*  if (req.session.user){ */
        const data = {
            title: 'Signup-page',
            bodyClass: 'signup-page', // Puedes cambiar esto dinámicamente según tus necesidades
            user:req.user
        }; 
        res.render('users/profile', data)
});


router.get('/logout', (req, res) => {
    console.log("Llamda al logout")
    req.session.destroy( err =>{
        if(!err){
            // res.send('Logoutok!');
             res.redirect('/');
        }
        else {
            res.send({ststus:'Logout error', body:err});       
        }
    })
})

router.get('/register', (req, res) => {
    
    const data = {
        title: 'Register-page',
        bodyClass: 'signup-page', // Puedes cambiar esto dinámicamente según tus necesidades
        
    };
    res.render(
        'users/register',
        data    
    )
}); 

//Ejmplo de llamado a la ruta get para productos con jwt
router.get('/products',  passport.authenticate('current', {session: false}), async (req, res) => {
    try {
        const parametros  = {};
        const productService = new ProductService();
        const products = await productService.getAll();// productsDao.getAllProducts(parametros);
         console.log("Products");
         console.log(products);
        // console.log("Req user");
        // console.log(req.user);
        const data ={ 
            title: 'Signup-page',
            bodyClass: 'signup-page'
        };
        res.render('products/index', {
            title:"Product List",
            products,
            bodyClass: 'signup-page',
            user: req.user,
            
        })
    } catch (error) {
        console.error('Error:', error);
        //res.status(500).json({ error: 'Hubo un error al Recuperar Products.' });    
        return  res.render('errors', { message: 'Hubo un error al Recuperar Products.' });
    }

});

/* //Ejmplo de llamado a la ruta get para productos con github
router.get('/ghproducts', async (req, res) => {
    try {
        const parametros = req.query; 
        // console.log(req.session.user.name);
        const products = await productsDao.getAllProducts(parametros);
    
       res.render('products/index', {
        title:"Product List",
        products,
        bodyClass: 'signup-page',
        user:req.session.user
    })
    }
    catch(error){
        console.error('Error:', error);
        //res.status(500).json({ error: 'Hubo un error al Recuperar Products.' });    
        return  res.render('errors', { message: 'Hubo un error al Recuperar Products.' });
    }
}) */


router.get('/passwordreset', (req, res) => {
    const data = {
        title: 'Password-reset',
        bodyClass: 'signup-page', // Puedes cambiar esto dinámicamente según tus necesidades
    };
    res.render('users/passwordreset', data)
    
})

function auth(req, res, next){
    if (req.session.user==="adminCoder@coder.com" && req.session.admin){
        return next;
    }else{
        return res.status(403).send("No estas autorizado a ver este recurso");
    }
}



router.post('/setcookie', (req, res) => {
    console.log(req.body);
    res.cookie('username', req.body.email, { maxAge: 100000, signed: true,  }).send('')
})

router.get('/getcookie', (req, res) => {
    // Sin firma
    // res.send(req.cookies)

    // Con firma
    console.log(req.signedCookies);
    res.send(req.signedCookies)

});

router.get('/session',  (req, res) => {
    if(req.session.counter){
        req.session.counter++;
        res.send(`Se ha visitado ${req.session.counter} veces el sitio`);
    }
    else{
        req.session.counter = 1;
        res.send("Bienvenido");
    }
})

export default router;