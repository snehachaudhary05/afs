/*const express=require("express");
const router=express.Router();
const isLoggedIn=require("../middleware/verifylogin")
const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient();
router.post("/",isLoggedIn,async(req,res)=>{
    const {title,description}=req.body;
    console.log(req.user)
    const newBlog=await prisma.blog.create({
       data:{
        Title:title,
        description:description,
        authorId:req.user.id
       }
    })
    res.json({message:"blog added successfully",
        data:newBlog
    })
})
router.get("/:title",async(req,res)=>{
    const {Title,description,authorId}=req.body;
    const blog=await prisma.blog.findFirst({
        where: {
            Title: Title,
            description:description,
            authorId:authorId
          },
    })
    res.json({blog});
})
router.get("/",async (req,res)=>{
    try{
      let allblogs=await prisma.blog.findMany();
      console.log(allblogs);
      res.json(allblogs);
    }
    catch(error){
       res.json({error:error});
    }
})
module.exports=router */
const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const isLoggedIn = require("../middleware/verifylogin");
const prisma = new PrismaClient();

router.post("/", isLoggedIn, async (req, res)=>{
    const {Title, description, author_id} = req.body;
    console.log(req.user);
    const newBlog = await prisma.blog.create({
        data : {
            Title: Title,
            description: description,
            author_id: req.user.id
        }
    })
    res.json({message: "blog added successfully",
        data: newBlog
    })
})

router.get("/:id", async (req, res)=>{
    const {id} = req.params;
    const blog = await prisma.blog.findUnique({
        where: {
          id: parseInt(id),
        },
        select : {
            Title: true,
            description: true,
            author: {
                select: {
                    name : true
                }
            }
        }
    })
    res.json({blog});
})

router.get("/", async (req, res)=>{
    try{
        let allBlogs = await prisma.blog.findMany({
            select : {
                Title : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        });
        console.log(allBlogs);
        res.json({blogs: allBlogs})
    } catch(error){
        res.json({error: error});
    }
})

module.exports = router;