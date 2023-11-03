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
            <Developer name="Aman Agrawal" linkedIn ="https://www.linkedin.com/in/amanagrawal12/" gitHub ="https://www.github.com/amann1210" instagram ="https://www.instagram.com/__aman_1210/" mail="mailto:agrawalaman1210@gmail.com" image="/images/image.png"/>
            <Developer name="Manan Badaya" linkedIn ="https://www.linkedin.com/in/manan-badaya-62b8711b8/" gitHub ="https://www.github.com/badaya12" instagram ="https://www.instagram.com/manan_badaya/" mail="mailto:manan19badaya6@gmail.com" image="/images/manan.jpg"/>
            <Developer name="Suhani Sharma" linkedIn ="https://www.linkedin.com/in/suhanisharma26/" gitHub ="https://www.github.com/suhanisharma26" instagram ="https://www.instagram.com/suhanishamma/" mail="mailto:suhanisharma030303@gmail.com" image="/images/suhani.jpg"/>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Developers;
