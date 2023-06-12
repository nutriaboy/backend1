const Role = require('../models/role');
const { Usuario, Suscriptor, Proveedor, Cerveza, Evento, TipoCerveza, DetalleCompra, Ventas, DetalleVenta } = require('../models');

const esRoleValido = async(rol = 'USER_ROLE') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const emailExiste = async( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el usuario existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}
/**
 * Suscriptor
 **/
const existeSuscriptorPorId = async( id ) => {

    // Verificar si el suscriptor existe
    const existeSuscriptor = await Suscriptor.findById(id);
    if ( !existeSuscriptor ) {
        throw new Error(`El id no existe ${ id }`);
    }
}


/**
 * Proveedor
 **/
const existeProveedorPorId = async( id ) => {

    // Verificar si el proveedor existe
    const existeProveedor = await Proveedor.findById(id);
    if ( !existeProveedor ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

/**
 * Cerveza
 **/
const existeCervezaPorId = async( id ) => {

    // Verificar si la cerveza existe
    const existeCerveza = await Cerveza.findById(id);
    if ( !existeCerveza ) {
        throw new Error(`El id no existe ${ id }`);
    }
}



/**
 * Eventos
 **/
const existeEventoPorId = async( id ) => {

    // Verificar si el evento existe
    const existeEvento = await Evento.findById(id);
    if ( !existeEvento ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

/**
 * Tipo de Cerveza
 **/
const existeTipoCervezaPorId = async( id ) => {

    // Verificar si el tipo de cerveza existe
    const existeTipoCerveza = await TipoCerveza.findById(id);
    if ( !existeTipoCerveza ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

/**
 * Detalle de Cerveza
 **/
const existeDetalleCompraPorId = async( id ) => {

    // Verificar si el tipo de cerveza existe
    const existeDetalleCompra = await DetalleCompra.findById(id);
    if ( !existeDetalleCompra ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

/**
 * Venta
 **/
const existeVentaPorId = async( id ) => {

    // Verificar si el tipo de cerveza existe
    const existeVenta = await Ventas.findById(id);
    if ( !existeVenta ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

/**
 * Detalle de Venta
 **/
const existeDetalleVentaPorId = async( id ) => {

    // Verificar si el tipo de cerveza existe
    const existeDetalleVenta = await DetalleVenta.findById(id);
    if ( !existeDetalleVenta ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes( coleccion );
    if ( !incluida ) {
        throw new Error(`La colección ${ coleccion } no es permitida, ${ colecciones }`);
    }
    return true;
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeSuscriptorPorId,
    existeProveedorPorId,
    coleccionesPermitidas,
    existeCervezaPorId,
    existeEventoPorId,
    existeTipoCervezaPorId,
    existeDetalleCompraPorId,
    existeVentaPorId,
    existeDetalleVentaPorId,
}

