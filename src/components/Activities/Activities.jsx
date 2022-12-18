/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import "./Activities.css";
import { db, auth } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";

// import { Header } from "./Header.jsx"





function Activities() {

  const [Readmore, setReadmore] = useState(-1)
  const [activities, setActivities] = useState([])
  const [isLoading,setLoading] = useState(true)
  const activitiesCollectionRef = collection(db, "Activities")

  const getActvities = async () => {

    let data = await getDocs(activitiesCollectionRef);
    data = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(data);
    setActivities(data);
  };

  useEffect(() => {
    getActvities();
    setLoading(false)
  }, []);



  const style = {
    color: "#000",
  };
  const style2 = {
    fontWeight: "bold",
  };



  
  return (

     <div>
      <div className="page-heading header-text activity-image">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 style={style}>Activities</h1>
              <p style={style}>
                <a style={style} href="/">
                  Home
                </a>{" "}
                / <span style={style}>Activities</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="services-section services-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="activities-section-heading">
                <h2>Activities which our team has engaged in.</h2>
                <p>
                  Here are some of the activities in the past our team has been part
                  of and will continue to be.
                </p>
              </div>
            </div>
           

            {
              activities.map((event) => (
                <div className=" col-md-7 col-12 h-auto " key={event.id}>
                  <div className=" service-item ">
                    <div className="w-auto p-3 bg-white border border-4 ">
                    <p style={{ textAlign: "center",fontWeight:"bolder",fontSize:25 }} >
                       {event.title}
                    </p>
                    </div>
                    <img className="img-fluid border-bottom" src={event.link} />
                   
                    <br />
                    <br />
                    <div className="container">
                      
                       
                        {Readmore === event.id ?<div> <div className="col align-items-center"><p><b>CWPH.LNMIIT</b></p>
                          <p><b>{event.username}</b></p></div> 
                          <div className="row"> <p style={{ textAlign: "justify" }} className="px-3">
                          {event.details}</p>
                          
                        </div><br />
                           </div>: <div className="row" >
                           <div className="col-4 "><p><b>CWPH.LNMIIT</b></p>
                          <p><b>{event.username}</b></p></div>
                          <div className="col-8">
                          
                          <p style={{ textAlign: "justify" }} className="px-3">
                            {event.text}
                          </p>
                          <button className="col align-self-end offset-3 bg-white border border-white text-primary" onClick={() => {
                            setReadmore(event.id)
                          }}>Read more</button>
                          <br />
                          <br />
                        </div>
                        </div>
                        }
                      </div>
                    </div>
                  </div>
                
              ))}
           

          </div>
        </div>
      </div>
    </div>
  )
  
}

export default Activities;
