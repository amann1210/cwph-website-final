    import React from "react";
    import { addDoc, collection , getDocs, serverTimestamp} from "firebase/firestore";
    import { useEffect } from "react";
    import { async } from "@firebase/util";
    import {db} from "../firebase-config";
    import { useState } from "react";
    
    import Header_post from "./header_post";
    import "./Instagram.css"
    
    

    function Instagram(){
        const [activityList, setActivityList] = useState([]);
        const [imgUrl, setImgUrl] = useState(null);
        const activitiesCollectionRef = collection(db,"Activities");
        const getActivites = async () => {
            let data = await getDocs(activitiesCollectionRef);
            data = data.docs.map((doc)=>({...doc.data(),id: doc.id}))
            console.log(data)
            setActivityList(data)
        };
        useEffect(() =>{
            getActivites();
        },[]);

    return(
        <div className="DisplayDetails" style={{paddingTop: "5rem"}}>
            
           { !activityList?(
            <div>
            
            </div>
           ):(activityList.map((activity) => {
                
                return <div key= {activity.id} className = "post">
                <Header_post title={activity.title}/>
                {<img 
                width={250} height={250} 
                style={{borderRadius:"7.5%"}}   
                className="activty_post"
                src= {activity.link}></img>
                }
                {activity.details}
                </div>
            }))
            }
        </div>
    )
    }
    export default Instagram;