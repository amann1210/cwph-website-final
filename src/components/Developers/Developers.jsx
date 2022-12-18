import "./Developers.css";
import Developer from "./DeveloperInfo";
function Developers() {
  const style = {
    color: "#000",
  };
  return (
    <div>
      <div className="page-heading developers-page">
        <div className="">
          <div className="row">
            <div className="col-md-12">
              <h1 className="glowing-heading" >Developers</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="services-section services-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="activities-section-heading">
                <h2 style={{ fontWeight: "bold" }}>
                  Hello, we are the developers of this site.
                </h2>
                <p>You can contact us on our social media and Linkedin.</p>
              </div>
            </div>
            <Developer name="LAKSHIT SOMANI" linkedIn ="https://www.linkedin.com/in/rishabh-jain-8368531a6/" gitHub ="https://www.github.com/lakshits11" instagram ="https://www.instagram.com/_.pixelated/" mail="mailto:lakshits11@gmail.com" image="/images/LakshitSomani_pic.jpg"/>
            <Developer name="LAKSHIT SOMANI" linkedIn ="https://www.linkedin.com/in/rishabh-jain-8368531a6/" gitHub ="https://www.github.com/lakshits11" instagram ="https://www.instagram.com/_.pixelated/" mail="mailto:lakshits11@gmail.com" image="/images/LakshitSomani_pic.jpg"/>
            <Developer name="LAKSHIT SOMANI" linkedIn ="https://www.linkedin.com/in/rishabh-jain-8368531a6/" gitHub ="https://www.github.com/lakshits11" instagram ="https://www.instagram.com/_.pixelated/" mail="mailto:lakshits11@gmail.com" image="/images/LakshitSomani_pic.jpg"/>
            <Developer name="LAKSHIT SOMANI" linkedIn ="https://www.linkedin.com/in/rishabh-jain-8368531a6/" gitHub ="https://www.github.com/lakshits11" instagram ="https://www.instagram.com/_.pixelated/" mail="mailto:lakshits11@gmail.com" image="/images/LakshitSomani_pic.jpg"/>
            <Developer name="RISHABH JAIN" linkedIn ="https://www.linkedin.com/in/rishabh-jain-8368531a6/" gitHub ="https://github.com/RishabhJ01" instagram ="https://www.instagram.com/reeshabhjain321/" mail="mailto:jain2001.rishabh@gmail.com" image="/images/rishabh-jain.jpg"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Developers;
