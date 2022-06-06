import { Editor } from "@tinymce/tinymce-react"
import { useRef, useState } from "react";
import { IPost } from "../models/IPost";

export function Post() {
    
    const editorRef = useRef<any>();
    const [post, setPost] = useState<IPost>({
        date: "2022-06-06",
        content: editorRef.current.getContent()
    })

    function submit () {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
          }
    }

    return (<>
        <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>Skriv här</p>"
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