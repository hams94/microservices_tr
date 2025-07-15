const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const axios = require('axios');


const app = express();

// Log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(bodyParser.json()); // <-- This is important for JSON parsing
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments',async  (req, res) => {
  try {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    console.log('Received content:', content); // debug log

    if (!content) {
      return res.status(400).send({ error: 'Content is required' });
    }

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content , status: 'Pending'});

    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events',{
      type:"CommentCreated",
      data:{
        id: commentId, 
        content ,
        postId: req.params.id
      }
    });
    res.status(201).send(comments);
  } catch (err) {
    console.error('Error in POST /comments:', err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.post('/events',(req,res)=>{
  console.log("Event received ", req.body.type);
  res.send({});
})

// Global error handler
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
