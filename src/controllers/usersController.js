import User from '../models/User'
import TipoUser from '../models/TipoUser'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//codigo para listar usuarios
export async function listUsers(req, res) {
    try {
        const users = await User.findAll({ include: [TipoUser] });
        res.json({
            users
        });
    } catch (error) {
        console.log("ERROR AL QUERE LISTAR Usuarios:" + error);
    }
}

export async function findUser(req, res) {
    const { id } = req.params;
    try {
        const user = await User.findOne({
            where: {
                id,
            },
        });
        res.json({
            data: user,
        });
    } catch (error) {
        console.log("ERROR AL QUERE BUSCAR EL User:" + error);
    }
}

//codigo para realizar el login
export async function login(req, res) {

    //confirmamos si el usuario existe
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    let token = jwt.sign(user.dataValues, 'secret', {
                        expiresIn: 1440
                    })
                    res.send(token)
                }
            } else {
                res.status(400).json({ error: 'Usuario no existe' })
            }
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })
}

//codigo para registrar nuevos usuarios
export async function register(req, res) {

    const { name, lastname, username, tipo_user_id } = req.body;
    let { password } = req.body;

    let user = '';
    //vefiricamos que el username no este registrado
    try {
        user = await User.findOne({
            where: {
                username
            }
        });
    } catch (error) {
        console.log("ERROR AL QUERER Verificar Usuario LOGIN:" + error);
    }

    //en caso no exister el nuevo usuario
    if (!user) {

        const saltRounds = 10;
        //encriptamos la clave
        const hash = bcrypt.hashSync(password, saltRounds)
        password = hash;

        try {
            let newUser = await User.create(
                {
                    name,
                    lastname,
                    username,
                    password,
                    tipo_user_id,
                },
                {
                    fields: [
                        "name",
                        "lastname",
                        "username",
                        "password",
                        "tipo_user_id",
                    ],
                }
            );

            if (newUser) {
                return res.json({
                    message: "Nuevo Usuario Creado Exitosamente",
                    //data: newUser,
                });
            } else {
                return res.json({
                    message: "No se Pudo Crear nuevo usuario",
                    data: {},
                });
            }
        } catch (error) {
            //console.log(error);
            res.status(500).json({
                message: "Error al crear nuevos usuario",
                data: {},
            });
        }

    } else {
        return res.json({
            message: "Usuario Ya existe",
            data: {},
        });
    }


}

//codigo para eliminar usuarios
export async function deleteUser(req, res) {
    const { id } = req.params;
    try {
        const deleteRowCount = await User.destroy({
            where: {
                id,
            },
        });
        res.json({
            message: "User Eliminado Satifactoriamente",
            count: deleteRowCount,
        });
    } catch (error) {
        console.log("ERROR AL QUERE ELIMINAR User:" + error);
    }
}
