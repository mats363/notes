import axios from "axios";
import { IPost } from "../models/IPost";

export class PostService {

    async fetchPosts() {
        
        try {
            let fetchedResponse = await axios.get<any>('http://localhost:4000/posts'
            
            );

            if (fetchedResponse) {
                let postArray: any = fetchedResponse.data
                console.log(postArray[0]);
                return postArray;
            }
           
            

        } catch (err) {
            console.log(err)
        }
       
    }
}