const Order = require('../models/order')
const Product = require('../models/product')
// Create a new order  
const newOrder = async (req, res) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo

    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })
}
// Get logged in user orders  
const myOrders = async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })
}

const allOrders =async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
}

// Get single order  
const getSingleOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name', 'email')

    if (!order) {
        return res.status(404).json({message:'No Order found with this ID'})
    }

    res.status(200).json({
        success: true,
        order
    })
}
// Update / Process order - ADMIN  =>   /api/v1/admin/order/:id
const updateOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (order.orderStatus === 'Delivered') {
        return res.status(400).json({message:'You have already delivered this order'})
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status,
        order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
    })
}

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false })
}

// Delete order   =>   /api/v1/admin/order/:id
const deleteOrder = async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return res.status(404).json({message:'No Order found with this ID'})
    }

    await order.remove()

    res.status(200).json({
        success: true
    })
}
module.exports = {newOrder, myOrders, allOrders, getSingleOrder,deleteOrder,updateOrder}