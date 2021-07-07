const Post = require("./models/Post.Model")

const resolvers = {
    Query:{
        hello:()=>{
            return "hello hisham"
        },
        getAllPosts: async()=>{
            return await Post.find()

        },
        getPostById: async(parent,{id},context)=>{
            return await Post.findById(id)

        }
    },
    Mutation:{
        createPost:async(parent,args,context,info)=>{
            const {title,description} = args.post
            const post = new Post({title,description})
            await post.save()
            return post
        },
        postDeleteById: async(a,{id})=>{
            await Post.findByIdAndDelete(id)
            return 'Deleted'
        },
        postUpdate:async(a,args,c)=>{
            const {id} = args
            const post = args.post
            var update = {}
            if(post.title !==undefined){
                update.title = post.title
                console.log('title   ',post.title);
            }
            if(post.description !==undefined){
                update.description = post.description                
                console.log('description   ',post.description);
            }
            console.log('update ',update);
            return await Post.findByIdAndUpdate(id,update,{new:true})
        

        }
    }
}
module.exports = resolvers