const comments = require('../Models/commentModel')

exports.addComment = async(req,res)=>{
    console.log("inside comment store api");
    const userId = req.payload
    const {comment} = req.body
    console.log(comment);
    try{
        const existingComment = await comments.findOne({comment})
        if (existingComment){
            res.status(406).json("You allready added a comment")
        }else{
            const newComment = new comments({
                comment,userId
            })
            await newComment.save()
            res.status(200).json(newComment)
        }
    }catch (err){
        res.status(401).json(err)
    }
}