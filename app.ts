//import express from "express";

const express = require('express')
const rotas = require('./userRotas')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(rotas)

// fooi instalado o -->  npm i @types/express --> npm i -D @types/express
//tsc --init -> para  criar um arquivo tsconfig.json

app.listen(3008, () => { console.log('Projeto rodando') })