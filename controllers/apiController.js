import { connection } from "../db/dbConfig.js"
import { selectData, updateData } from "../db/dbMethods.js"
class ApiController
{
    async release(req,res)
    {
        try
        {
            const rack = await selectData(`SELECT * FROM racks WHERE positionCode = ${req.body.rack}`)
            if(rack)
            {  
                const product = await selectData(`SELECT * FROM products WHERE barcode = ${req.body.product}`)
                
                if(product)
                {
                    if(rack.product == req.body.product)
                    {
                        await updateData(`UPDATE racks SET product = 0 WHERE positionCode = ${req.body.rack}`)
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
            res.sendStatus(503)
        }
    }

    async admission(req,res)
    {
        try
        {
            const product = await selectData(`SELECT * FROM products WHERE barcode = ${req.body.product}`)
            const rack = await selectData(`SELECT * FROM racks WHERE positionCode = ${req.body.rack}`)

            if(product && rack)
            {
                if(!rack.product)
                {
                    await updateData(`UPDATE racks SET product = ${product.barcode} WHERE positionCode = ${rack.positionCode}`)
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