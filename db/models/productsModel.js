import mongoose from "mongoose";

const ProductModel = new mongoose.Schema({
    name:{
        type:String,
    },
    barcode:{
        type:Number
    }
})

export default ProductModel