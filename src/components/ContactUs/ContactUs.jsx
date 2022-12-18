/* eslint-disable react/no-unescaped-entities */
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import emailjs from '@emailjs/browser';
import React,{ useState ,useEffect} from 'react';
import "./ContactUs.css";
const ContactUs = () => {
  let [formSubmit,setFormSubmit] = useState(false);
  const style = {
    color: "#000",
  };
  const ContactForm = () => {
    const sendEmail = (event) => {
      event.preventDefault();
      const templateParams = {
        name: document.getElementById("name").value,
        mailSubject: document.getElementById("subject").value,
        mailMessage: document.getElementById("message").value,
        mailId: document.getElementById("email").value
      };
      emailjs.send('service_cc5vk3p', 'template_7h54p29', templateParams, 'GKtcZiyvyjfW7elFe')
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          console.log(formSubmit);
          setFormSubmit(true);        
        }, (err) => {
          console.log('FAILED...', err);
        });
    }
    return (
      <div className="contact-us">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div onSubmit={sendEmail} className="contact-form">
                <form id="contact" action="/" method="post">
                  <div className="row">
                    <div className="col-md-12 col-sm-12">
                      <fieldset>
                        <input
                          name="name"
                          type="text"
                          id="name"
                          placeholder="Your name"
                          required />
                      </fieldset>
                    </div>
                    <div className="col-md-12 col-sm-12">
                      <fieldset>
                        <input
                          name="email"
                          type="email"
                          id="email"
                          placeholder="Your email"
                          required/>
                      </fieldset>
                    </div>
                    <div className="col-md-12 col-sm-12">
                      <fieldset>
                        <input
                          name="subject"
                          type="text"
                          id="subject"
                          placeholder="Subject"
                          required/>
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <textarea
                          name="message"
                          rows="6"
                          id="message"
                          placeholder="Your message"
                          required></textarea>
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <button
                          type="submit"
                          id="form-submit"
                          className="main-button">
                          Send Message
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <div className="right-content">
                <div className="section-heading">
                  <span>Contact Us</span>
                  <h2>Let's keep in touch</h2>
                  <p>
                    Here are our contact email and website.
                  </p>
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <ul>
                      <li>
                        <i className="fa fa-envelope"></i> cl.cwph@lnmiit.ac.in
                      </li>
                      <li>
                        <i className="fa fa-globe"></i> cwph-lnmiit.vercel.app
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      {/* <Header /> */}
      <div className="page-heading header-text contact-image">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 style={style}>Contact Us</h1>
              <p style={style}>
                <a style={style} href="/">
                  Home
                </a>{" "}
                / <span style={style}>Contact Us</span>
              </p>
            </div>
          </div>
        </div>
      </div>
   { formSubmit?<div> <h3>thankyou</h3> </div>: ContactForm()}
      {/* Contact Us Ends */}

      {/* Map Starts */}
      <div id="map">
        {/* How to change your own map point
	        1. Go to Google Maps
	        2. Click on your location point
	        3. Click "Share" and choose "Embed map" tab
	        4. Copy only URL and paste it within the src="" field below */}

        <iframe
          title="GoogleMapLocation"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1134.8298746924368!2d75.9225468367757!3d26.93573032796528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dba21e8a1d1c9%3A0x5ab565cce4d44c2b!2sThe%20LNM%20Institute%20of%20Information%20Technology!5e0!3m2!1sen!2sin!4v1641967396752!5m2!1sen!2sin"
          width="100%"
          height="520px"
          frameBorder="0"
          style={{ marginTop: "-50px" }}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
export default ContactUs;
