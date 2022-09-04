const express = require("express");
// imported db for product
const  Product  = require("../models/product");
// const  Products  = require("../models/bang");
// 
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')
// to get all the products
const getallProduct = async(req,res,next)=>{
    const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search() 
    .filter()
    const  products = await apiFeatures.query;
    // const product = await Product.find();
    res.status(200).json({success: true, message: "All data from Product", totalproducts : products.length, products });
}

// to get single products
const getoneProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
       return res.status(404).json({
        success: false, 
        message: "Product not found"
        
     });
        }
        else
        {
            res.status(200).json({
                success: true,
                message: "Single data from Product",
                totalproducts : product.length,
                product 
        });
        }
})


// to create a product
const createProduct = catchAsyncErrors(async(req,res,next)=>{
    try{
        // console.log(req.body)
       const product = await Product.create(req.body)
       console.log(product)
        res.json({ message: "Product Created" });
        next();
    }catch(err){
        console.log('Error Message :',err._message)
    }
})

const updateProduct = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false, 
            message: "Product not found"
         });
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })

})

const deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false, 
            message: "Product not found"
         });
    }
    await product.remove();

    res.status(200).json({
        success: true,
        message: 'Product is deleted.'
    })
})

module.exports = {createProduct,
    getallProduct 
    ,getoneProduct,
    updateProduct,
    deleteProduct
}