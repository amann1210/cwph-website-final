import "./HomePage.css";
import WellnessCards from "./WellnessCards";
import Quotes from "../Quotes/Quotes";
import CountDownTimer from "../Timer/Timer";
import { useEffect, useState } from 'react'
import { Redirect } from "react-router-dom";

const HomePage = () => {

  

  return (
    <div>
      <div className="banner">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div
                className="header-text caption"
                style={{ background: "transparent" }}
              >
                <h1 className="welcome" onClick={xyz=>{
                  <Redirect to="/" />
                }}>
                  Welcome to Center For Wellness and Positive Health
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="services-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-header">
                <div className="section-heading-content">
                  <h2><b>What is CWPH</b> </h2>
                  <p>
                    The centre for Wellness and Positive Health aims to inculcate
                    good habits as well as infuse positive and powerful thoughts
                    among our students and others so that they could develop a
                    healthy body and a sound mind necessary for a complete all round
                    holistic and moral development of their personality
                  </p>
                </div>
                <div className="section-heading-image">
                  <img src="/images/wellness2.jpg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="seperation-line"
        style={{
          width: "79.1vw",
          height: "12px",
          borderBottom: "2px solid #CCCCCC",
          margin: "37px auto",
        }}
      ></div>
      <WellnessCards />
      <section className="team_area section_gap" id="team_area">
        <div className="container-fluid justify-content-center py-4">
          <div className="main_title text-center">
            <h2 style={{ fontWeight: "bold" }}>People You May Know</h2>
            <p
              style={{
                color: "#00bcd4",
                fontSize: "15px",
                fontWeight: "500",
                letterSpacing: "0.5px",
                display: "inline-block",
                marginTop: "0px",
              }}
            >
              Contact Details of our Counsellors, Faculty, Staff and Alumini
            </p>
          </div>
          <div className="row mx-auto team_inner pt-5">
            <div className="col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="team_item">
                <div className="team_img">
               <a  href= "https://www.lnmiit.ac.in/Employee_ProfileNew.aspx?nDeptID=qg" target="_blank" rel="noopener noreferrer">
                  <img
                    className="host-image"
                    src="/images/team-images/amit-neogi-sir.jpg"
                    alt=""
                  />
                  </a>
                </div>
                <div className="team_name">
                  <h4>Dr. Amit Neogi</h4>
                  <p>Center Lead</p>
                  <p className="mt-20"></p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="team_item">
                <div className="team_img">
                <a href="https://www.lnmiit.ac.in/Department/HSS/HSS_FacultyProfile.aspx?nDeptID=84" target="_blank" rel="noopener noreferrer">
                  <img
                    className="host-image"
                    src="/images/team-images/ap-singh-sir.jpg"
                    alt=""
                  /></a>
                </div>
                <div className="team_name">
                  
                  <h4>Prof. A.P. Singh</h4>
                  <p>Faculty</p>
                  <p className="mt-20"></p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="team_item">
                <div className="team_img">
                  <a href="https://www.linkedin.com/in/manuj-sharma-72103880/?originalSubdomain=in" target="_blank" rel="noopener noreferrer">
                  <img
                    className="host-image"
                    src="/images/team-images/manuj-sharma-sir.jpg"
                    alt=""
                  /></a>
                </div>
                <div className="team_name">
                  <h4>Mr. Manuj Sharma</h4>
                  <p>Training and Placement Officer</p>
                  <p className="mt-20"></p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="team_item">
                <div className="team_img">
                  <a href="https://www.lnmiit.ac.in/Employee_ProfileNew.aspx?nDeptID=eagga" target="_blank" rel="noopener noreferrer"></a>
                  <img
                    className="host-image"
                    src="/images/team-images/mukesh-jadon-sir.jpg"
                    alt=""
                  />  
                </div>
                <div className="team_name">
                  <h4>Mr. Mukesh Jadon</h4>
                  <p>Faculty</p>
                  <p className="mt-20"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        className="seperation-line"
        style={{
          width: "79.1vw",
          height: "12px",
          borderBottom: "2px solid #CCCCCC",
          margin: "37px auto",
        }}
      ></div>
      <Quotes />
      <div
        className="seperation-line"
        style={{
          width: "79.1vw",
          height: "12px",
          margin: "27px auto",
        }}
      ></div>
    </div>
  );
};

export default HomePage;