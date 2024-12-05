
const tabelaUsuarios= require("../models/tabelaUsuarios")
const  bcrypt = require('bcrypt');
const respostas = require('../../responses')


async function getUserId(req,res){
    const id = req.params.id
    try {
        const usuario = await tabelaUsuarios.findByPk(id)
        if(!usuario) return respostas.notFound(res,'Usuário não encontrado')
        
        const showUser ={
            id: usuario.id,
            firstname: usuario.firstname,
            surname: usuario.surname,
            email: usuario.email,
            password: usuario.password,
            
        }
        respostas.success(res,'Usuario encontrado',showUser)

    }catch(erro){
       respostas.InternalServerError(res,'Ocorreu um erro ao procura um usuario')
    }   
}

const postUser = async (req, res) => {
    const {id, firstname, surname, email, password } = req.body;
    
    if (!id || !firstname || !surname || !email || !password) {
        return respostas.badRequest(res, 'O campos são obrigatórios');
    }

    try {
        const usuarioExiste = await tabelaUsuarios.findOne({ where: { email } });
        if (usuarioExiste) {
            return respostas.badRequest(res, 'Email já existe');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedSenha = await bcrypt.hash(password, salt);

        const novoUsuario = await tabelaUsuarios.create({
            id,
            firstname,
            surname,
            email,
            password: hashedSenha
        });

        if (!novoUsuario) {
            return respostas.badRequest(res, 'Erro ao criar usuário');
        }

        const exibeUsuario = {
            firstname: novoUsuario.firstname,
            surname: novoUsuario.surname,
            email: novoUsuario.email,
        };

        respostas.created(res, 'Usuário criado com sucesso', exibeUsuario);
    } catch (error) {
        respostas.badRequest(res, 'Ocorreu um erro na criação do usuário');
    }
};


const deleteUser = async (req,res)=>{
        const id = req.params.id
        try {
            const usuario = await tabelaUsuarios.destroy({where:{id:id}})
            if(!usuario) return respostas.notFound(res,`Usuario com id= ${id} não foi encotrado`)

            respostas.noContent(res)

        }catch(error){
            respostas.InternalServerError(res,'Ocorreu um erro na remoção do usuario usuario') 
        }
}


module.exports = {
    getUserId,
    postUser,
    putUser,
    deleteUser
}