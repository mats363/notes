import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { IPost } from "../../models/IPost";
import { Post } from "../../models/Post";
import { EditPost } from "../EditPost/EditPost";
import './Posts.scss';




export function Posts() {

    const [allPosts, setAllPosts] = useState<Post[]>([]);
    const [postToEdit, setPostToEdit] = useState<Post>(new Post(0,"","",""))
    
    

    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>();

    useEffect(() => {
        
        let checkLogin = localStorage.getItem("loggedIn");
        if (checkLogin) {
            JSON.parse(checkLogin)
            
            if (checkLogin === "true") {
                setIsLoggedIn(true);
            } else if (checkLogin === "false") {
                setIsLoggedIn(false);
            }
        }
    }, [])

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
    }, [allPosts]);

 

   
    
   let postHtml = allPosts.map((post) => {
       return (
        
           <div key={post.id} className="postContainer">
               <h4 dangerouslySetInnerHTML={{ __html:post.postTitle}}></h4>
               <div dangerouslySetInnerHTML={{ __html:post.postContent}}></div>
               <button onClick={() => {setPostToEdit(post)}}>Edit document</button>   
           </div> 
       )
   })

    return (<>
        
            {isLoggedIn && (
                <div id="wrapper">
                    <section className="posthtml">
                        <div>{postHtml}</div>
                    </section>
                    <section className="postedit">
                        <EditPost post={postToEdit}></EditPost>
                    </section>
                </div>
            )}
            
            {!isLoggedIn && (
                <div>
                    <h3>Click <Link to="/">here</Link> to login</h3>
                </div>
            )}
        
    </>)
}