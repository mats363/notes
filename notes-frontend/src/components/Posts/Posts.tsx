import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { IPost } from "../../models/IPost";
import { Post } from "../../models/Post";
import { EditPost } from "../EditPost/EditPost";
import './Posts.scss';




export function Posts() {

    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [edit, setEdit] = useState(false);
    

    useEffect(() => {

        if (allPosts.length > 0) return 
        
        axios
        .get<IPost[]>("http://localhost:4000/posts"
        )
        .then((response) => {
            
            let postsFromAPI = response.data.map((post: IPost) => {
                console.log(post.postContent)
                return new Post(post._id, post.postContent, post.postDate, post.postTitle);
            })           
            setAllPosts(postsFromAPI)
            console.log(allPosts)
        });

        console.log(allPosts + " all posts")        
    });

    function toggle() {
        setEdit(!edit)
    }
    
   let postHtml = allPosts.map((post) => {
       return (
           <div key={post.id} className="postContainer">
               <h4 dangerouslySetInnerHTML={{ __html:post.postTitle}}></h4>
               <div dangerouslySetInnerHTML={{ __html:post.postContent}}></div>
               <button onClick={toggle}>Edit document</button>
               {edit && 
               <EditPost post={post}></EditPost>
            }
               
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