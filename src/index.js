const express = require('express')
const methodOverride = require('method-override')
const app = express()
const uuid4 = require('uuid4')

const url = 8080
const httpServer = app.listen(url, () => { console.log('Listening on PORT 8080') })
app.use(methodOverride('_method'))
//handlebars
const handlebars = require('express-handlebars')
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
//socket
const { Server } = require('socket.io')
const socketServer = new Server(httpServer);
//routes
const viewsRouter = require('./routes/views.router.js')
app.use('/realTimeProducts', viewsRouter);
const routesProducts = require('./routes/products/products')
app.use('/products', routesProducts)
const routesCart = require('./routes/cart/cart')
app.use('/cart', routesCart)
//public folder
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))

socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado")
    socket.on('message', data => {
        console.log(data);
    })
})

app.get('/', (req,res)=> {
    const data={
        title:'Index',
        message:'Index de Backend',
    }
    res.render('index', data)
})

/*app.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts')
})

socketServer.of('/realTimeProducts').on('connection', (socket)=>{
    console.log('Un cliente se ha conectado a la vista en tiempo real')
    fs.readFile('Products.json', 'utf8', (err, data)=>{
        if(err){
            console.error('Error al leer el archivo productos.json', err)
            return
        }
        const productos = JSON.parse(data);
        socket.emit('productos', productos)
    })
})*/