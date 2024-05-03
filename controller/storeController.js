const projects = require('../Models/storeModel')

// add stores
exports.addstore = async (req, res) => {
    console.log("inside add store api");
    const userId = req.payload
    const { resttname, place, food, insta, location, website, overview, phoneno } = req.body
    const storeImage1 = req.file.filename
    // console.log(userId);
    console.log(resttname, place, food, insta, location, website, overview, phoneno, storeImage1, userId);
    try {
        const existingStore = await projects.findOne({ location })
        if (existingStore) {
            res.status(406).json("This Store is all ready added")

        } else {
            const newStore = new projects({
                resttname, place, food, insta, location, website, overview, phoneno, storeImage1, userId
            })
            await newStore.save()
            res.status(200).json(newStore)
        }
    } catch (err) {
        res.status(401).json(err)
    }

}

// get home store
exports.getHomeStore = async (req, res) => {
    try {
        const homeStore = await projects.find().limit(4)
        res.status(200).json(homeStore)
    } catch (err) {
        res.status(401).json(err)
    }
}

// get all store
exports.getAllStore = async (req, res) => {
    const searchKey = req.query.search
    const query = {
        place:{
            $regex:searchKey,$options:"i"
        }
    }
    try {
        const allStore = await projects.find(query)
        res.status(200).json(allStore)
    } catch (err) {
        res.status(401).json(err)
    }
}

// get user project
exports.getUserStore = async (req, res) => {
    const userId = req.payload
    try {
        const userStore = await projects.find({ userId })
        res.status(200).json(userStore)
    } catch (err) {
        res.status(401).json(err)
    }
}


// edit store

exports.editStore = async (req, res) => {
    console.log("inside edit project");
    const { pid } = req.params
    const userId = req.payload
    const {resttname, place, food, insta, location, website, overview, phoneno } = req.body
    const uploadimg = req.file?req.file.filename:storeImage1

    try{
        const updateStore = await projects.findByIdAndUpdate({_id:pid},{
            resttname, place, food, insta, location, website, overview, phoneno, storeImage1:uploadimg, userId
        },{new:true})
        await updateStore.save()
        res.status(200).json(updateStore)
    }catch(err){
        res.status(401).json(err)
    }
}


// delete store
exports.removeStore = async (req,res)=>{
    console.log("Inside delete store");
    const {pid} = req.params
    try{
        const storeDetails = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(storeDetails)
    }catch(err){
        res.status(401).json(err)
    }
}