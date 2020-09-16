const express = require('express');

const app = express();

app.use(express.json());

let projects = [];
let countRequests = 0;

function verifyIdExists(req, res, next) {
  const { id } = req.params;
  for (index in projects) {
    if (projects[index].id === String(id) ) {
      return next();
    }
  }
  return res.status(400).json({ error: 'Project does not exists' });
}

function printTotalRequests(req, res, next) {
  countRequests++;
  console.log(`Total of requests: ${countRequests}`);

  return next();
}

app.post('/projects', printTotalRequests, (req, res) => {
  const { id, title } = req.body;
  projects.push({ id: id , title: title, tasks: [] })
  return res.send();
})

app.get('/projects', printTotalRequests, (req, res) => {
  return res.json(projects);
})

app.put('/projects/:id', verifyIdExists, printTotalRequests, (req, res) => {
  const { id } = req.params;
  let projectToReturn;
  for (index in projects) {
    if (projects[index].id === String(id) ) {
      projectToReturn = projects[index];
    }
  }

  return res.json(projectToReturn);
})

app.delete('/projects/:id', verifyIdExists, printTotalRequests, (req, res) => {
  const { id } = req.params;
  for (index in projects) {
    if (projects[index].id === String(id) ) {
      projects.splice(index, 1);
    }
  }

  return res.send();
})

app.post('/projects/:id/tasks', verifyIdExists, printTotalRequests, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  for (index in projects) {
    if (projects[index].id === String(id) ) {
      projects[index].tasks.push(title);
    }
  }

  return res.send();
})

app.listen(3000);
