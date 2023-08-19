import  { getProducts}  from "./services/api.js"
import { createOrder, getKlarnaAuth, retrieveOrder } from "./services/klarna.js"
import express from "express"
const app = express()
import { config }  from 'dotenv'
config()

app.get('/', async (req, res)=> {
    const products = await getProducts() 
    const markup =`<a style="display:block; color: black; border: solid 2px black; margin: 20px; padding: 10px" href="/test">`
    res.send(markup)
})


app.get('/test', async (req, res)=>{
    const cartItems = [{name: 'handske', price:200, count: 2},{name: 'aaaaa', price:350, count: 6},{name: 'aaaaa', price:500, count: 1},{name: 'aaa',price:100, count: 6},]
    try{
        const klarnaResponse = await createOrder(cartItems)
        const markup = klarnaResponse.html_snippet
        res.send(markup)
        console.log(getKlarnaAuth())
    }catch(error){
        res.send(error.message)
    }
})

app.get('/confirmation',  async (req, res)=>{
    const {order_id} = req.query
    const klarnaResponse = await retrieveOrder(order_id)
    const markup = klarnaResponse.html_snippet
    res.send(markup)
})
app.listen(process.env.PORT)