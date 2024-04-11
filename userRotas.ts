import { User } from "./userInterface"
import { Request, Response } from "express";
const express = require('express')
import emailValidator from "./emailValidator";

const rotas = express();
rotas.use(express.json())
rotas.use(express.urlencoded({ extended: true }))

//let user:Array<User> =
let user: User[] = [{
    id: 1,
    nome: 'manel',
    email: 'manel@gmail.com',
    descricao: 'Desenvolvedor Full Stack'
},
{
    id: 2,
    nome: 'joao',
    email: 'joao@gmail.com'
}
]

rotas.get('/users', (req: Request, res: Response) => {
    try {
        res.json(user)

    } catch (error) {
        res.status(500).send({ msg: "Erro ao exibir usuários" })
    }
})

rotas.post('/user/addUser', (req: Request, res: Response) => {
    try {

        let novoUsuario = req.body;

        //Validado o nome do usuário está sendo passado
        if (!novoUsuario.nome) {
            throw new Error('Nome obrigatório!')
        }

        //Validando se o nome do usuário tem  mais de 3 caracteres
        if ((novoUsuario.nome as string).length < 4) {
            throw new Error('O tamanho do Nome deve ser maior ou igual a 4 caracteres!')
        }

        // Validando se o e-mail é valido
        if (!emailValidator(novoUsuario.email)) {
            throw new Error('E-mail inválido!')
 
        }
        //validando se o e-mail já existe no banco de dados
        if (!novoUsuario.email) {
            throw new Error('Email é obrigatório!')
        }

        // verifica se o usuário ja existe no array
        const userExist = user.find((x: User) => x.email == novoUsuario.email);//veja que essa consulta futuramente será tratada no BD


        if (!userExist) {
            user.push(novoUsuario);
            console.log(`Usuário ${novoUsuario.nome} adicionado com sucesso!`)
            return res.status(201).send({ msg: `Usuário ${novoUsuario.nome} adicionado com sucesso!` })
        } else {
            return res.status(409).send({ msg: "Este e-mail já existe!" })
        }
    } catch (error: unknown) {// aqui esta capturando um erro genérico

        if (error instanceof Error) { // esse if esta  verificando se o erro é uma instancia da classe error
            res.status(500).send({ message: error.message });
        } else {
            res.status(500).send({ error: 'Ocorreu um erro desconhecido' });
        }
    }

    // try {
    //     let novoUsuario = req.body as User; // "as User" este comando  é para dizer que o corpo da requisição vem em formato de um objeto
    //     console.log(novoUsuario);
    //     // se não tiver esses campos preenchidos retorna erro
    //     if (novoUsuario.nome.trim() || novoUsuario.email.trim()) console.log('piroca')

    //     const id = Math.floor(Math.random() * 9999 + 1) // aqui gera um novo ID para o novo Usuário
    //     novoUsuario = { ...novoUsuario, id }; // esse comandado serve para adicionar o ID gerado na criação do novo usuario
    //     user.push(novoUsuario)
    //     console.log(`usuario ${novoUsuario.id} adicionado`)
    //     return res.status(201).send(novoUsuario)


    //     //if (!novoUsuario.email || !novoUsuario.nome) throw new Error("Campos obrigatórios não preenchidos")

    // } catch (e) {
    //     return res.status(400).send({ e });
    // }
})
module.exports = rotas;

// InterfacePersonalizada<Array<User>>
// InterfacePersonalizada<User[]>