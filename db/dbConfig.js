import mongoose from "mongoose";
import dotenv from 'dotenv'
import ProductModel from "./models/productsModel.js";
import RackModel from "./models/rackModel.js";

dotenv.config()


export const Product = mongoose.model("product",ProductModel)

export const Rack = mongoose.model("rack",RackModel)

mongoose.connect(process.env.database)
