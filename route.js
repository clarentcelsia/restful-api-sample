//this is only handling get()

/* Routes 
      get() -> get data from server
      post() -> send data from server
      delete() -> delete data from server
      patch() -> update data from server
*/


const express = require('express');
const router = express.Router();
const schema = require('../Schema/schema');


/**
 *  @param get("/") executes when we goto slash('/')
 *  To differentiating the data add specific path name after the slash 
 *     e.g get('/data'){} => Data inside this block will execute when we goto '/data'
 */
 router.get('/data', (req, response) => {
    response.send('This World')
});

router.get('/dataAll', async(req, response) => {
    try{
        // this will find all the available lists
        const gets = await schema.find();
        response.json(gets); // show the list in json object
    }catch(err){
        response.json({message: err});
    };
});


router.post('/post', (req, response)=>{
    // request.body = we're(client) posting the data to api(json)
    // response.body = data your API sends to client
    var body = req.body;

    /* 
    create object schema=>mongoose.Schema
    to get the data from body post it to api(json)
    */
    
    const postsSchema = new schema({
        title: body.title,
        desc: body.desc
    });
    postsSchema.save()
    .then(data=>{
        response.json(data);
    }) // to get the data
    .catch(err => {
        // create object to get the error message from json
        response.json({
            message: err
        });
    });

});


/* Async await version */
router.post('/post2', async (req, res)=>{
    const postSchema2 = new schema({
        title: req.body.title,
        desc: req.body.desc
    });

    try{
        const savedPost = await postSchema2.save();
        res.json(savedPost);
    }catch(err){
        res.json({
            message: err
        });
    };
});

/* Get the data based on URL search */
router.get('/:dataId', async(req, res)=>{
    console.log(req.params.dataId);

    try{
        const findDataByIdWrittenOnURL = await schema.findById(req.params.dataId);
        res.json(findDataByIdWrittenOnURL); // response to json
    }catch(err){
        res.json({message: err});
    };
});

/* Delete specific post */
router.delete('/:dataId', async(req, response)=>{
    // _id : name given by json
    try{
        const removedData = await schema.remove({"_id": req.params.dataId});
        response.json(removedData);
    }catch(err){
        response.json({message: err});
    };
   
});

/* Update specific post */
router.patch('/:dataId', async(req, response)=>{
    // _id : name given by json
    // {} = object
    try{
        const updatedData = await schema.updateMany(
            {"_id": req.params.dataId},
            { $set: {
                "title": req.body.title, 
                "desc": req.body.desc
                }
            }
        );
        response.json(updatedData);
    }catch(err){
        response.json({message: err});
    };
   
});
// This tells NodeJS that this exported code(router from gets.js) is allowed to be access by other files.
module.exports = router


 /* pre-requirement: define a parser (body-parser) to parse the data we post into json model. */
