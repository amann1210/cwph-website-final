import { async } from "@firebase/util";
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { db, storage } from "../../firebase-config";
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import { v4 } from "uuid";
import "./CreatePost.css"
function AdminPanel() {

  const [title, setTitle] = useState("")
  const [details, setDetails] = useState("")
  const [imageUpload, setImageUpload] = useState("")
  const [text,setText] = useState('')
  const [username,setUsername] = useState('')


  const [PresentCo, setPresentCo] = useState([]);
  const [activities,setActivities] = useState([])
  const [Members,setMembers] = useState([])

  const activitiesCollectionRef = collection(db, "Activities")
  const PresentCoCollectionRef = collection(db, "TeamList")
  const PastCoCollectionRef = collection(db,"PastCoordinatorList")
  const MemberCollectionRef = collection(db,"MemberList")



  const getCoordinator = async () => {

    let data = await getDocs(PresentCoCollectionRef);
    data = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(data);
    setPresentCo(data);
  };

  useEffect(() => {
    getCoordinator();
  }, []);

   
  const getActvities = async () => {

    let data = await getDocs(activitiesCollectionRef);
    data = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(data);
    setActivities(data);
  };

  useEffect(() => {
    getActvities();
  }, []);

  const getMembers = async () => {

    let data = await getDocs(MemberCollectionRef);
    data = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(data);
    setMembers(data);
  };

  useEffect(() => {
    getMembers();
  }, []);


   const AddMember = async() =>{


    await addDoc(MemberCollectionRef, { Name:title })
    setTitle("")


   }

   



  const createPost = async () => {

     if(title.length === 0|| details.length === 0|| imageUpload === 0 || text.length ===0)
       { alert("Empty field not allowed!!")
          return    
      }   
       document.getElementById("post_link").setAttribute('disabled', 'true');
    let postId = v4();

    if (imageUpload == null) return;
    const imageRef = ref(storage, `/${postId}`)

    var uploadTask = uploadBytesResumable(imageRef, imageUpload);

    uploadTask.on('state_changed',
      (snapshot) => {

        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);

          addDoc(activitiesCollectionRef, { title, details, postId: postId,text, link: downloadURL,username })
          setTitle("")
          setDetails("")
          setImageUpload("")
          document.getElementById("post_link").removeAttribute('disabled');
          //   console.log(imageLink)

        });
      }


    );
  }


  const AddCoordinator = async () => {
    if(title.length === 0 || imageUpload.length === 0){
      alert("Empty field not allowed!!")
          return 
    }
    document.getElementById("ADD_COORDINATOR").setAttribute('disabled', 'true');
    let postId = v4();

    if (imageUpload == null) return;
    const imageRef = ref(storage, `/${postId}`)

    var uploadTask = uploadBytesResumable(imageRef, imageUpload);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);

          addDoc(PresentCoCollectionRef, { title, postId: postId, link: downloadURL })
          setTitle("")
          setDetails("")
          setImageUpload("")
          getCoordinator();
          document.getElementById("ADD_COORDINATOR").removeAttribute('disabled');
          //   console.log(imageLink)

        });
      }


    );
  }


  let Delete_Co = async({member})=>{
    const PresentCoDoc = doc(db,"TeamList",member.id)
    addDoc(PastCoCollectionRef, { title:member.title, postId: member.postId, link: member.link })

    try{
       await deleteDoc(PresentCoDoc)
    }

    catch(e){
        alert.log("System error")
    }
     getCoordinator();
  }


  let Delete_member = async({member})=>{
    const MemberDoc = doc(db,"MemberList",member.id)
    

    try{
       await deleteDoc(MemberDoc)
    }

    catch(e){
        alert("System error")
    }
     getMembers();
  }

  let Delete_activity = async({member})=>{
    const ActvitityDoc = doc(db,"Activities",member.id)
    

    try{
       await deleteDoc(ActvitityDoc)
    }

    catch(e){
        alert.log("System error")
    }
     getActvities();
  }

  
  const style3 = {
    color: "#000",
    fontWeight: "bold",
  };

  const style = {
    color: "#000",
  };



  return <div className="CreatePostPage" style={{ paddingTop: "5rem" }}>
    <div className="bg-image">
      <div className="container">
        <div className='row'>
          <div className="col-md-12 dis-img">
            <h1 style={style3}>Admin Panel</h1>
            <div className='hhh'></div>
            <p style={style}>
              <a style={style} href="/" className='good'>
                Home
              </a>{" "}
              /                 <span className='reg'>Admin Panel</span>
            </p>
          </div>
        </div>
      </div>
    </div>


   

    
    <div className="AddPostContainer" >
      <h1 >Create A Post</h1>
      <div className="inContainer">
        <label>Title</label><br />
        <input type="text" placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)} />
     <br/>
      </div>
      <div className="inContainer">

      <label>Collaborator</label>
        <br />
        <textarea type="text" placeholder="Collaborator" value={username} onChange={(event) => setUsername(event.target.value)} />
      <br/>
      <label>Text</label>
        <br />
        <textarea type="text" placeholder="Text" value={text} onChange={(event) => setText(event.target.value)} />
<br/>
        <label>Details</label>
        <br />
        <textarea type="text" placeholder="Details" value={details} onChange={(event) => setDetails(event.target.value)} />
     <br/>
      </div>
      <div className="imageInput">
        <label>Upload Image</label>
        <br />
        <input style={{ marginLeft: "15%" }} type="file" accept="image/*" onChange={(event) => setImageUpload(event.target.files[0])} />
        <br />
        <br />
      </div>
      <br /><br /><br />
      <button id="post_link" onClick={createPost}>Post</button>
    </div>
    


    <div className="AddPostContainer" >
      <h1 >Delete Activities</h1>

      <div  >{activities.map((member) => (
        (<div className="container" key={member.link}>


          <div className="row">
            <div className="col">
            <h4 className="">{member.title}</h4>
            </div>
            <div className="col">
              
              <button type="button" className="Delete_btn" id="ADD_COORDINATOR" onClick={()=>{
                Delete_activity({member})
              }}>	
              &#10060;</button>
            </div>
            
            
          </div>
        </div>

        )))}

      </div>

</div>

    <div id = "AddPostContainer" className="AddPostContainer" >
      <h1 >ADD CO-ORDINATOR</h1>
      <div className="inContainer">
        <label>Name</label><br />
        <input type="text" placeholder="Name" value={title} onChange={(event) => setTitle(event.target.value)} />
      </div>
     
      <div className="imageInput">
        <label>Upload Image</label>
        <br />
        <input style={{ marginLeft: "15%" }} type="file" accept="image/*" onChange={(event) => setImageUpload(event.target.files[0])} />
        <br />
        <br />
      </div>
      <br /><br /><br />
      <button id="ADD_COORDINATOR" onClick={AddCoordinator}>Post</button>
    </div>
 



    <div  className="AddPostContainer" >
      <h1 >Delete CO-ORDINA</h1>

      <div  >{PresentCo.map((member) => (
        (<div className="container" key={member.link}>


          <div className="row">
            <div className="col">
            <h4 className="">{member.title}</h4>
            </div>
            <div className="col">
              
              <button type="button" className="Delete_btn" id="ADD_COORDINATOR" onClick={()=>{
                Delete_Co({member})
              }}>	
              &#10060;</button>
            </div>
            
            
          </div>
        </div>

        )))}

      </div>


    </div>

    <div className="AddPostContainer" >
      <h1 >ADD Members</h1>
      <div className="inContainer">
        <label>Name</label><br />
        <input type="text" placeholder="Name" value={title} onChange={(event) => setTitle(event.target.value)} />
      </div>
      <button id="ADD_COORDINATOR" onClick={AddMember}>Post</button>
    </div>

    

    <div className="AddPostContainer" >
      <h1 >Delete Members</h1>

      <div  >{Members.map((member) => (
        (<div className="container" key={member.id}>


          <div className="row">
            <div className="col">
            <h4 className="">{member.Name}</h4>
            </div>
            <div className="col">
              
              <button type="button" className="Delete_btn" id="ADD_COORDINATOR" onClick={()=>{
                Delete_member({member})
              }}>	
              &#10060;</button>
            </div>
            
            
          </div>
        </div>

        )))}

      </div>
   
  </div>
</div>
}
export default AdminPanel;