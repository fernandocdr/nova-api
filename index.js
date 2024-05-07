const express = require('express');

const server = express();

server.use(express.json());

// Query params = ?nome=NodeJS
// Route Params = /curso/2
// Request Body = { nome: 'Nodejs', tipo: 'Backend' }

 const cursos = ['Node JS', 'Swift', 'C#'];

 server.use ((req,res,next)=> {
  console.log(`URL CHAMADA: ${req.url}`);

  return next();
 })

 server.get('/cursos', checkUrl, (req,res) => {
  return res.json(cursos);

 });

 function checkCurso(req,res,next){
  if(!req.body.name){
    return res.status(400).json({error: "Nome do curso é obrigatório"})
  }

  return next();
 }

 function checkUrl (req,res,next){
  const curso = cursos[req.params.index];
  if(!curso){
    return res.status(400).json({error: "Curso inválido"})
  }

  return next();
 
 }
//server.get('/curso', (req,  res) => {
//const nome = req.query.nome;
//return res.json({ curso: `Aprendendo ${nome}`});

// localhost:3000/curso/2
server.get('/curso/:index', checkUrl, (req, res) => {
  const { index } = req.params;

  return res.json(cursos[index]);

})
//adicionando cursos

server.post('/cursos', checkCurso, checkUrl, (req,res) => {
  const { name } = req.body;
  cursos.push(name);

  return res.json(cursos);
});

//atualizando cursos
server.put('/cursos/:index', checkCurso, checkUrl, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  cursos[index] =  name;

  return res.json(cursos);

});

//deletando curso

server.delete('/cursos/:index', checkUrl, (req,res) => {
  const { index } = req.params;

  cursos.splice(index, 1);

  return res.json(cursos); 
})

server.listen(3000);