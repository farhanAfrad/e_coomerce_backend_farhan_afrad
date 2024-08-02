import express, { Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './modules/products/product.routes';
import { orderRoutes } from './modules/orders/order.routes';
const app = express()

app.use(express.json());
app.use(cors());


// application api
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use((req: Request, res: Response
) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});



export default app;