// Conexión a la DB 
import { conn } from '../db.js'

const obtenerComunicados = async (req, res) => {
    try {
        const [rows] = await conn.query("SELECT * FROM comunicados_tabla")
        res.send([rows]);
    } catch (error) {
        return res.status(500).json({
            msg: "Ha ocurrido un error"
        })
    }
    
}

const obtenerComunicado = async (req, res) => {
    try {
        // console.log(req.params.id)
        const [rows] = await conn.query("SELECT * FROM comunicados_tabla WHERE id = ?", [req.params.id])
        // console.log(rows)
        if(rows.length <= 0) return res.status(404).json({msg: "Comunicado no encontrado"})
        res.json(rows[0])
        // res.send("Obteniendo comunicado")
    } catch (error) {
        return res.status(500).json({
            msg: "Ha ocurrido un error"
        })
    }
    
}

const crearComunicado = async (req, res) => {
    try {
        const { titulo, descripcion, puesto, marca } = req.body
        const [rows] = await conn.query("INSERT INTO comunicados_tabla(titulo, descripcion, puesto, marca) VALUES(?,?,?,?)", [titulo, descripcion, puesto, marca])
        res.send({rows})
    } catch (error) {
        return res.status(500).json({
            msg: "Ha ocurrido un error"
        })
    }
}

const actualizarComunicado = async (req, res) => {
    try {
        // Obtinene el id | const id = req.params.id 
        const { id } = req.params;
        // Obtiene los valores actualizar 
        const { titulo, descripcion, puesto, marca } = req.body;
        // console.log(titulo, descripcion, puesto, marca)
        // Permite actualizar total o parcialmente un registro 
        const [result] = await conn.query ("UPDATE comunicados_tabla SET titulo = IFNULL(?, titulo), descripcion = IFNULL(?, descripcion), puesto = IFNULL(?, puesto), marca = IFNULL(?, marca) WHERE id = ?", [titulo, descripcion, puesto, marca, id])
        // console.log(result)
        if(result.affectedRows === 0) return res.status(404).json({msg: "Comunicado no encontrado"})
        res.json("Datos Recibidos")
    } catch (error) {
        return res.status(500).json({
            msg: "Ha ocurrido un error"
        })
    }
}

const eliminarComunicado = async (req, res) => {
    try {
        const [result] = await conn.query("DELETE FROM comunicados_tabla WHERE id = ?", [req.params.id])
        if(result.affectedRows <=0) return res.status(404).json({msg: "Comunicado no encontrado"})
        // Realiza la acción pero no envía una respuesta (mensaje) al usuario
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            msg: "Ha ocurrido un error"
        })
    }
}


export {
    obtenerComunicados,
    obtenerComunicado,
    crearComunicado,
    actualizarComunicado,
    eliminarComunicado
};