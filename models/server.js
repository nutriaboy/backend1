const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT; 

        this.paths = {
            auth:            '/api/auth',
            usuarios:        '/api/usuarios',
            suscriptores:    '/api/suscriptores',
            tiposUsuarios:   '/api/tiposUsuarios',
            ventas:          '/api/ventas',
            compras:         '/api/compras',
            detalleVentas :  '/api/detalleVentas',
            detalleCompras: '/api/detalleCompras',
            tipoCervezas:    '/api/tipoCervezas',
            cervezas:        '/api/cervezas',
            proveedores:     '/api/proveedores',
            envios:          '/api/envios',
            eventos:         '/api/eventos',

            
        }


        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

        // Fileupload - Carga de archivos
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes() {
        
        this.app.use( this.paths.auth,            require('../routes/auth'));
        this.app.use( this.paths.usuarios,        require('../routes/usuarios'));
        this.app.use( this.paths.suscriptores,    require('../routes/suscriptores'));
        this.app.use( this.paths.tiposUsuarios,   require('../routes/tiposUsuarios'));
        this.app.use( this.paths.ventas,          require('../routes/ventas'));
        this.app.use( this.paths.compras,          require('../routes/compras'));
        this.app.use( this.paths.detalleVentas,   require('../routes/detalleVentas'));
        this.app.use( this.paths.detalleCompras, require('../routes/detalleCompras'));
        this.app.use( this.paths.tipoCervezas,    require('../routes/tipoCervezas'));
        this.app.use( this.paths.cervezas,        require('../routes/cervezas'));
        this.app.use( this.paths.proveedores,     require('../routes/proveedores'));
        this.app.use( this.paths.envios,         require('../routes/envios'));
        this.app.use( this.paths.eventos,         require('../routes/eventos'));

       
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
