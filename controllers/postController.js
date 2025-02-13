const prisma=require('../prisma/index');


// create a post
exports.createPost = async (req, res) => {
    try {
        const { title, slug, content, author } = req.body;

        if (!title || !slug || !content || !author) {
            return res.status(400).json({ error: "All fields are required" });
        }

        console.log(req.user);

        // Ensure author ID exists
        const result = await prisma.post.create({
            data: {
                title,
                slug,
                content,
                author: { connect: { id: author } }, // Assuming author is an ID
            }
        });

        console.log(result);
        return res.status(201).json({ success: true, data: result });

    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({ error: "Something went wrong in createPost" });
    }
};


exports.updatePost=async(req,res)=>{
    try{
         const {id}=req.params;
         console.log(id);
            const {title,slug,content}=req.body;
            const post = await prisma.post.update({
                where:{
                    id:id,
                },
                    data:{
                        title:title,
                        slug:slug,
                        content:content
                    }
            

            });
            res.status(200).json({success:true,data:post});

    }
    catch(error){
   return res.status(500).json({error:"Something went wrong"});
    }
};

exports.deletePost =async (req,res)=>{
    try{
      const {id}=req.params;
        const post= await prisma.post.delete({
            where:{
            id:id
            }
            
        });
        if(!post){
            return res.status(400).json({error:"Post not found"});
        }
        return res.status(200).json({success:true, 
            message:"delete successfully",data:post});
    }
    catch(error){
     return res.status(500).json({error:"Something went wrong delete"});
    }
  }   ;

  exports.getallPost =async (req,res)=>{
    try{
        const post= await prisma.post.findMany();
        return res.status(200).json({success:true, data:post});
    }
    catch(error){
        return res.status(500).json({error:"Something went wrong getall"});
    }
  };

