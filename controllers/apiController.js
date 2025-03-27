import { response } from "express"
import { Product, Rack } from "../db/dbConfig.js"


class ApiController
{
    async release(req,res)
    {
        try
        {
            const rack = await Rack.findOne({positionCode:req.body.rack})
            if(rack)
            {  
                const product = await Product.findOne({barcode:req.body.product})
                if(product)
                {
                    if(rack.product == req.body.product)
                    {
                    
                        rack.product = 0
                        await rack.save()
                        const response = {
                            product:product.name,
                            position:rack.positionCode
                        }
                        res.json(response)
                    }
                    else
                    {
                        const response = {
                            error:"data contradiction",
                            position:rack.positionCode,
                            product:product.barcode,
                        }
                        res.json(response)
                    }
                }
                else
                {
                    const response = {
                        error:"product not exist",
                        barcode:req.body.product
                    }
                    res.json(response)
                }
            }
            else
            {
                const response = {
                    error:"rack not exist",
                    position:req.body.rack
                }
                res.json(response)
            }
        }
        catch(ex)
        {
            console.log(ex)
            res.sendStatus(503)
        }
    }

    async admission(req,res)
    {
        try
        {   
            const product = await Product.findOne({barcode:req.body.product})
            const rack = await Rack.findOne({positionCode:req.body.rack})
            if(product && rack)
            {
                if(!rack.product)
                {
                    rack.product = product.barcode
                    await rack.save()
                    const response = {
                        product:product.name,
                        position:rack.positionCode
                    }
                    res.json(response)
                }
                else
                {
                    const response = {
                        error:"place taken",
                        position:rack.positionCode
                    }
                    res.json(response)
                }
                
            }
            else
            {
                if(!product)
                {
                    const response = {
                        error:"product not exist",
                        barcode:req.body.product
                    }
                    res.json(response)
                }
                else if(!rack)
                {
                    const response = {
                        error:"rack not exist",
                        position:req.body.rack
                    }

                    res.json(response)
                }
            }
        }
        catch(ex)
        {
            res.sendStatus(503)
        }
    }

}

export default new ApiController