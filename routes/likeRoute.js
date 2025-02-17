const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const isLoggedIn = require("../middleware/verifylogin");
const prisma = new PrismaClient();

router.post("/:blogId", isLoggedIn, async (req, res) => {
    const { blogId } = req.params;
    const userId = req.user.id; // assuming req.user contains the logged-in user's info
    
    // Check if the user already liked the blog
    let isliked = await prisma.like.findFirst({
        where: {
            blogId: parseInt(blogId),   // blogId from params
            authorId: userId            // authorId from user info (fixed to match the schema)
        }
    });

    if (isliked) {
        // If the user already liked the blog, remove the like
        let deleteLike = await prisma.like.delete({
            where: {
                id: isliked.id  // deleting the like by its id
            }
        });

        // Decrease the like count for the blog
        let decreaselikecount = await prisma.blog.update({
            where: {
                id: parseInt(blogId)  // updating the blog's like count
            },
            data: {
                likecount: { decrement: 1 }  // decrement like count
            }
        });

        res.send("Unliked");
    } else {
        // If the user hasn't liked the blog, create a new like
        const newLike = await prisma.like.create({
            data: {
                authorId: userId,   // authorId is the user who liked the blog
                blogId: parseInt(blogId)  // blogId from params
            }
        });

        // Increase the like count for the blog
        let updatelikecount = await prisma.blog.update({
            where: {
                id: parseInt(blogId)  // updating the blog's like count
            },
            data: {
                likecount: { increment: 1 }  // increment like count
            }
        });

        res.send("Likes updated successfully");
    }
});

module.exports = router;
