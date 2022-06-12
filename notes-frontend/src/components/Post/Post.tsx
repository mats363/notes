import { Editor } from "@tinymce/tinymce-react"
import axios from "axios";
import { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { INewPost } from "../../models/INewPost";
import './Post.scss';


export function Post() {
    
    const editorRef = useRef<any>();
    const [title, setTitle] = useState("Untitled document");
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>();
    const [disable, setDisable] = useState(false)

    let navigate = useNavigate();

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

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value)
    }

    async function submit () {
        
        if (editorRef.current) {
            const content = {postContent: editorRef.current.getContent(), postTitle: title};
            
            let response = await axios.post<INewPost>("http://localhost:4000/posts/new", content);
            setDisable(true)
            alert("New post submitted")
            navigate("/posts")
          }
    }

    return (<>
        {isLoggedIn && (
        <div>
        <input type="text" value={title} onChange={handleChange}></input>
        <Editor
        apiKey= "dhia4wx9mumaw5c14twbgudtkj8xf9gyd7q16um7alkslnxs"
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>Write something</p>"
        init={{
            
            height: 500,
            menubar: true,
            plugins: [
              
            ],
            toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}

          
        />
        <button disabled={disable} onClick={submit}>Save document</button>
        </div>)}
        
        {!isLoggedIn && (
                <div>
                    <h3>Click <Link to="/">here</Link> to login</h3>
                </div>
            )}
    
    </>)
}