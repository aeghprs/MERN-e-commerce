const express = require("express");
const router = express.Router();

const OrderController = require("../controller/OrderController");

const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth')

router.get('/who', (req,res)=>{
    res.json({ message: "HELLO FROM Who" });
})

// new order
router.post('/neworder',isAuthenticatedUser, OrderController.newOrder)

router.get('/myOrders',isAuthenticatedUser, OrderController.myOrders);

router.get('/admin/allorders',isAuthenticatedUser, authorizeRoles('admin'), OrderController.allOrders);

router.get('/order/:id',isAuthenticatedUser, OrderController.getSingleOrder);

 router.put('/admin/order/:id',isAuthenticatedUser, authorizeRoles('admin'), OrderController.updateOrder)
 router.delete('/admin/order/:id',isAuthenticatedUser, authorizeRoles('admin'), OrderController.deleteOrder);

module.exports = router;