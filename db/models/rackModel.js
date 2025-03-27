import mongoose from "mongoose";

const RackModel = new mongoose.Schema({
    positionCode:{
        type:Number,
    },
    product:{
        type:Number,
    }
})

export default RackModel