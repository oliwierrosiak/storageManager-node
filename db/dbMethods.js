import { connection } from "./dbConfig.js";

export function selectData(query)
{
    return new Promise((resolve,reject)=>{
        connection.query(query,(err,result)=>{
            err?reject():resolve(result[0])
        })
    })
}

export function updateData(query)
{
    return new Promise((resolve,reject)=>{
        connection.query(query,(err,result)=>{
            err?reject():resolve()
        })
    })
}

