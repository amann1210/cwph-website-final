import React, { useEffect, useState } from 'react'
import "./Discussion.css"
// import { addDoc, collection, doc } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { addDoc, collection, deleteDoc, doc, updateDoc, arrayUnion, arrayRemove, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getDocs } from "firebase/firestore";
import { async } from '@firebase/util';
import { isDOMComponent } from 'react-dom/test-utils';
import Comments from "./comments"
import { Redirect } from "react-router-dom";
// import "../node_modules/bootstrap/scss/functions";
// import "../node_modules/bootstrap/scss/variables";
// import { get } from 'https';


let Discussion = () => {

    const commentCollectionRef = collection(db, "Comments")
    const replyCollectionRef = collection(db, "Replys");

    let [discussions, setDiscussions] = useState(null)
    let [comment, setComment] = useState("");
    let [reply, setReply] = useState("");
    let [isReplying, setIsReplying] = useState(null);
    // isReply => either null or id of the comment

    let [isViewingReply, setIsViewingReply] = useState(null);
    //  isViewingReply => either null or id of the comment

    let [replies, setReplies] = useState([]);
    // 
    // console.log(IsAuth)

   

    const getComments = async () => {

        let data = await getDocs(commentCollectionRef);
        data = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        console.log(data);
        setDiscussions(data);
    };


    const getReplies = async (commentId) => {
        let replys = await getDocs(replyCollectionRef);
        replys = replys.docs.map((reply) => ({ ...reply.data(), id: reply.id }));
        replys = replys.filter((reply) => {
            return reply.pid == commentId
        }).sort((c, d) => new Date(c.createdAt).getTime() - new Date(d.createdAt).getTime());

        // console.log(replys);
        return replys;

    }




   

    useEffect(() => {
        getComments();
    }, []);


    // let createdAt = new Date(comment.createdAt).toLocaleDateString();
    const postcomment = async () => {
  
if(comment.length === 0){
    alert("Not Possible to do that!!Empty Comment not allowed")
    return
}

        await addDoc(commentCollectionRef,
            {
                author: { name: auth.currentUser.displayName, id: auth.currentUser.uid, profilePic: auth.currentUser.photoURL },
                comment,
                createdAt: (new Date()).toString().substring(0, 21),
                pid: null
            });

        setComment("")
        getComments();
    };

    let handleOnChange = (e) => {
        if (!e.target.value) {
            console.log('empty')
        }
        else
            setComment(e.target.value);
    }

    let postReplyHandler = async (pid) => {
        if (reply.length === 0) {
            alert("Empty Reply are not worth the effort")
            return
        }

        setIsViewingReply(null)
        setIsReplying(null);
        await addDoc(replyCollectionRef,
            {
                author: { name: auth.currentUser.displayName, id: auth.currentUser.uid, profilePic: auth.currentUser.photoURL },
                reply,
                createdAt: (new Date()).toString().substring(0, 21),
                pid: pid
            });
        setReply("");
    }

    let viewReplyHandler = async (pid) => {
        setIsReplying(null)
        setIsViewingReply(pid);
        if (pid == null) {
            return;
        }
        let replys = await getReplies(pid);
        // console.log(replys[0])

        setReplies(replys);
        return replys;
    }
    let DeletePost = async (id) => {
        const commentDoc = doc(db, "Comments", id)
        let q = query(where)
        await deleteDoc(commentDoc)
        getComments();
    }

    let DeleteReply = async (id) => {
        const ReplyDoc = doc(db, "Replys", id)
        await deleteDoc(ReplyDoc)
        getReplies();
    }

    let like = async (id) => {
        const commentDoc = doc(db, "Comments", id)

        try {
            await updateDoc(commentDoc,
                { like: arrayUnion(auth.currentUser.email) })
        }
        catch (e) {
            console.laog("system error")
        }

        getComments();
    }

    let dislike = async (id) => {
        const commentDoc = doc(db, "Comments", id)

        try {
            await updateDoc(
                commentDoc,
                {
                    like: arrayRemove(auth.currentUser.email)
                }
            )
        }

        catch (e) {
            alert.log("System error")
        }
        getComments();
    }



    let loadCommentUI = (discussion) => {

        if (isViewingReply == null && isReplying == null) {
            return (<div className="container">
                <div className='row justify-content-center'>
                    <div className='bg-white shadow p-3 mb-5 bg-body rounded col-lg-8 col align-self-end' key={discussion.id}>


                        <div className='col-12 h-auto'>
                            <Comments
                                name={discussion.author.name}
                                image={discussion.author.profilePic}
                                time={discussion.createdAt}
                                comment={discussion.comment} />
                        </div>


                        {
                            auth.currentUser.email === "20ucs109@lnmiit.ac.in" ? <button className="border-0 bg-transparent " onClick={() => { DeletePost(discussion.id) }}>🗑️</button> : null

                        }


                        <div className='but-div'>

                        {
                                discussion.like == null ? <button className='border-0 bg-transparent border border-light' onClick={() => like(discussion.id)}>
                                    &#9734;</button> :
                                    discussion.like.includes(auth.currentUser.email) == true ? <button className='border-0 bg-transparent border border-light' onClick={() => dislike(discussion.id)}>&#127775;</button> : <button className='border-0 bg-transparent border border-light' onClick={() => like(discussion.id)}>
                                        &#9734;</button>
                            }
                            <button className='border-0 bg-transparent border border-light' onClick={() => {
                                setIsReplying(discussion.id);
                            }}>Reply</button>
                            <button className='border-0 bg-transparent border border-light' onClick={() => viewReplyHandler(discussion.id)}>View Reply		
</button>
                           



                        </div>
                    </div>
                </div>
            </div>

            )
        }

        else if (isViewingReply == null && isReplying != null) {

            return (<div className="container" key={discussion.id}>

                <div className='row justify-content-center'>
                    <div className='bg-white shadow p-3 mb-5 bg-body rounded col-lg-8 col align-self-end' key={discussion.id}>


                        <div className='col-12 h-auto'>
                            <Comments
                                name={discussion.author.name}
                                image={discussion.author.profilePic}
                                time={discussion.createdAt}
                                comment={discussion.comment} />
                        </div>
                        <div className='col-12 h-auto'>
                        {
                            isReplying == discussion.id ?
                                <div className='post2'>
                                    <div className="input-group mb-1 mt-3 ms-3">
                                        <input type="text" className="form-control " placeholder='Add a Coment...' aria-label="Recipient's username" aria-describedby="basic-addon2" value={reply} onChange={(e) => setReply(e.target.value)}/>
                                       
                                        <button className="input-group-text" id="basic-addon2" onClick={() => postReplyHandler(discussion.id)}>Post</button><br />
                                    </div>
                                    

                                 
                                </div>
                             : null
                        }
                        </div>
                        <div className='but-div'>
                            {
                                isReplying == discussion.id ? <button onClick={() => {
                                    setIsReplying(null);
                                }} className='comment-button'>Cancel</button> : <button onClick={() => {
                                    setIsReplying(discussion.id);
                                }} className='comment-button'>Reply</button>

                            }

                            <button className='comment-button' onClick={() => viewReplyHandler(discussion.id)}>View Reply</button>
                        </div>
                    </div>
                </div>
            </div>

            )
        }

        else if (isViewingReply != null && isReplying == null) {
            return (<div className="container" key={discussion.id}>

                <div className='row justify-content-center'>
                    <div className='bg-white shadow  mb-5 bg-body rounded col-lg-8 col align-self-end' key={discussion.id}>


                        <div className='col-12 h-auto'>
                            <Comments
                                name={discussion.author.name}
                                image={discussion.author.profilePic}
                                time={discussion.createdAt}
                                comment={discussion.comment} />

                        </div>
                        <div>
                            {
                                isViewingReply == discussion.id ? <div>
                                    {
                                        replies.map((reply) => {
                                            return <div key={reply.id}>
                                                <div className='reply'>
                                                    <div className='comment-name-continaer-reply'><img src={reply.author.profilePic} />{reply.author.name}
                                                        <div className='time-reply'>{reply.createdAt}</div></div>
                                                    <div className='comment-reply-container'>{reply.reply} </div>
                                                    {
                            auth.currentUser.email === "20ucs109@lnmiit.ac.in" ? <button className="border-0 bg-transparent " onClick={() => { DeleteReply(reply.id) }}>🗑️</button> : null

                        }
                                                </div>

                                            </div>
                                        })
                                    }

                                </div> : null
                            }


                        </div >
                        <div className='but-div'>


                            <button onClick={() => {
                                setIsReplying(discussion.id);
                                setIsViewingReply(null)
                            }} className='comment-button'>Reply</button>

                            {
                                isViewingReply == discussion.id ? <button className='comment-button' onClick={() => viewReplyHandler(null)}>Close View</button> :
                                    <button className='comment-button' onClick={() => viewReplyHandler(discussion.id)}>View Reply</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            )
        }

        else {

            return (<div className="homepage" key={discussion.id}>
                <Comments
                    name={discussion.author.name}
                    image={discussion.author.profilePic}
                    time={discussion.createdAt}
                    comment={discussion.comment} />

                {
                    isReplying == discussion.id ? <div className='post2'>
                        <textarea className='area' value={reply} onChange={(e) => setReply(e.target.value)} placeholder='Reply Something' /><br />
                        <button className='post' onClick={() => postReplyHandler(discussion.id)}>Post Reply</button><br /><br />
                    </div> : null
                }

                <div>
                    {
                        isViewingReply == discussion.id ? <div>
                            {
                                replies.map((reply) => {
                                    return <div key={reply.id}>
                                        <div className='reply'>
                                            <div className='comment-name-continaer'><img src={reply.author.profilePic} />{reply.author.name}
                                                <div className='time-reply'>{reply.createdAt}</div>
                                            </div>
                                            <div className='comment-reply-container'>{reply.reply} </div>
                                        </div>
                                    </div>
                                })
                            }

                        </div> : null
                    }


                </div>
                <div className='but-div'>
                    {

                        isReplying == discussion.id ? <button onClick={() => {
                            setIsReplying(null);
                        }} className='comment-button'>Close Reply</button> : <button onClick={() => {
                            setIsReplying(discussion.id);
                        }} className='comment-button'>Reply</button>

                    }


                    {
                        isViewingReply == discussion.id ? <button onClick={() => viewReplyHandler(null)}>Close View</button> :
                            <button className='comment-button' onClick={() => viewReplyHandler(discussion.id)}>View Reply</button>
                    }
                </div>
            </div>
            )


        }



    }

    const style = {
        color: "#000",
    };
    const style2 = {
        fontWeight: "bold",

    };
    const style3 = {
        color: "#000",
        fontWeight: "bold",
    };


    return <div className='discussion-parent-conatiner' style={{ paddingTop: "5rem" }}>
        <div className="discussion-image">
            <div className="container">
                <div className='row'>
                    <div className="col-md-12 dis-img">



                        <h1 style={style3}>Discussion Forum</h1>
                        <div className='hhh'></div>
                        <p style={style}>
                            <a style={style} href="/" className='good'>
                                Home
                            </a>{" "}
                            /                 <span className='reg'>Discussion Forum</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>




        <div>

            <textarea className='text-area-container' value={comment} onChange={handleOnChange} placeholder='Place your comments here!'/>
            <button className='comment-buttonn' onClick={postcomment}> 	
&#10148;</button>       
        </div>
        <br /><br /><br />

     


        {

            discussions == null ? <h1>Loading Comments</h1> : discussions.length === 0 ? <h1>No Comments Right now.</h1> : <div>
                {
                    discussions.map((discussion) => {
                        return loadCommentUI(discussion);
                    })
                }</div>
        }




    </div>
}

export default Discussion
