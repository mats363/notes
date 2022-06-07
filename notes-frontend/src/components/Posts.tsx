import axios from "axios";
import { useEffect, useState } from "react"
import { IPost } from "../models/IPost";
import { Post } from "../models/Post";
import { PostService } from "../services/PostService";

export function Posts() {
    //const service = new PostService;
    const [allPosts, setAllPosts] = useState<Post[]>([]);

    useEffect(() => {

        if (allPosts.length > 0) return 
        
        axios
        .get<IPost[]>("http://localhost:4000/posts"
        )
        .then((response) => {
            
            let postsFromAPI = response.data.map((post: IPost) => {
                console.log(post.postContent)
                return new Post(post._id, post.postContent, post.postDate);
            })           
            setAllPosts(postsFromAPI)
            console.log(allPosts)
        });

        console.log(allPosts + " all posts")        
    });
    
   let postHtml = allPosts.map((post) => {
       return (
           <div key={post.id} className="postContainer">
               <h4>{post.postDate}</h4>
               <div dangerouslySetInnerHTML={{ __html:post.postContent}}></div>
               <button>Redigera dokument</button>
           </div>
       )
   })

    return (<>
       <h1>All posts</h1>
       <div>
           <div>{postHtml}</div>
       </div>
    </>)
}