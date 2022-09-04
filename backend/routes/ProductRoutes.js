const express = require("express");
const router = express.Router();

const ProductController = require("../controller/ProductController");

router.get('/who', (req,res)=>{
    res.json({ message: "HELLO FROM Who" });
})

const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth')

// // to get all product
//  router.get('/getallproduct',isAuthenticatedUser, authorizeRoles('admin'),ProductController.getallProduct)

// to get all product
 router.get('/getallproduct',ProductController.getallProduct)
// to get one product
router.get('/getoneproduct/:id',ProductController.getoneProduct)

// to create product
router.post('/admin/createproduct',ProductController.createProduct)

// to update value of product
router.put('/admin/updateproduct/:id', ProductController.updateProduct)

// to delete product
router.delete('/admin/deleteproduct/:id', ProductController.deleteProduct)

module.exports = router;