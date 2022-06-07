import { Editor } from "@tinymce/tinymce-react"
import axios from "axios";
import { useRef, useState } from "react";
import { INewPost } from "../models/INewPost";
import { Post } from "../models/Post";

export function EditPost(doc: Post) {
    
    const editorRef = useRef<any>();
    const testPost: Post = new Post(90, "testpost", "2022-03-22")
    async function submit () {
        
        if (editorRef.current) {
            const content = {postContent: editorRef.current.getContent()};
            
           // let response = await axios.put<INewPost>("http://localhost:4000/posts/new", content);
           // console.log(response.data)
          }
    }

    return (<>
        <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="Här är texten"
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
        <button onClick={submit}>Log editor content</button>
    
    </>)
}