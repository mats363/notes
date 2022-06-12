import { Editor } from "@tinymce/tinymce-react"
import axios from "axios";
import { ChangeEvent, ChangeEventHandler, useRef, useState } from "react";
import { INewPost } from "../../models/INewPost";
import './Post.scss';


export function Post() {
    
    const editorRef = useRef<any>();
    const [title, setTitle] = useState("Untitled document");

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value)
    }

    async function submit () {
        
        if (editorRef.current) {
            const content = {postContent: editorRef.current.getContent(), postTitle: title};
            
            let response = await axios.post<INewPost>("http://localhost:4000/posts/new", content);
            console.log(response.data)
          }
    }

    return (<>
        <input type="text" value={title} onChange={handleChange}></input>
        <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>Write something</p>"
        init={{
            
            height: 500,
            menubar: false,
            plugins: [
              
            ],
            toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}

          
        />
        <button onClick={submit}>Save document</button>
    
    </>)
}