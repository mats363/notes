import { Editor } from "@tinymce/tinymce-react"
import axios from "axios";
import { useRef, useState } from "react";
import { INewPost } from "../models/INewPost";

export function Post() {
    
    const editorRef = useRef<any>();

    async function submit () {
        
        if (editorRef.current) {
            const content = {postContent: editorRef.current.getContent()};
            
            let response = await axios.post<INewPost>("http://localhost:4000/posts/new", content);
            console.log(response.data)
          }
    }

    return (<>
        
        <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<h1>Skriv här</h1>"
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