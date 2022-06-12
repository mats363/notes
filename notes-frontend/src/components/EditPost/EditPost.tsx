import { Editor } from "@tinymce/tinymce-react"
import axios from "axios";
import { useRef, useState } from "react";
import { IPost } from "../../models/IPost";
import { Post } from "../../models/Post";
import './EditPost.scss';



interface IChildComponentProps {
    post: Post;
}
export function EditPost(props: IChildComponentProps) {
    
    const [disable, setDisable] = useState(true)
    const editorRef = useRef<any>();
    async function submit () {
        
        if (editorRef.current) {
            const content = {postContent: editorRef.current.getContent()};
            
           let response = await axios.patch<IPost>(`http://localhost:4000/posts/${props.post.id}`, content);
           alert("Post saved")
          }
    }

    return (<>
        <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={props.post.postContent}
        init={{
            
            height: 250,
            menubar: true,
            plugins: [
              "charmap"
            ],
            toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}

          
        />
        <button onClick={submit}>Save</button>
        {/* <h2>{props.post.postContent}</h2> */}
    
    </>)
}