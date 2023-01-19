const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (app) => {
    app.post('/api/login', (req, res) => {

        console.log(req.body)
        User.findOne({where: { username : req.body.username }}).then(user => {
            if (!user){
                const message = "l'utilisateur demandé n'existe pas"
                return res.status(404).json({message})
            }
            bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                if(!isPasswordValid){
                    const message="le mot de passe est incorrect"
                    return res.status(401).json({message})
                }


                const token = jwt.sign(
                    {userId : user.id},
                    privateKey,
                    { expiresIn: '24'}
                )
                const message="l'utilisateur a été connecté avec succès"
                return res.json({message, data:user, token})
            })
        }).catch(error =>{
            console.log(error)
            const message = "l'utilisateur n'a pas pu etre connecté. Réessayez dans qelques instants."
            return res.json({message, data: error})
        })
    })
}
