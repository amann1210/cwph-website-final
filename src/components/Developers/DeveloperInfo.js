function Developer(props){
    return (
        <div className="col-lg-4 col-md-6 col-12">
              <div
                className="card-item"
                style={{
                  padding: "0",
                  paddingTop: "30px",
                  height: "33rem",
                  borderRadius: "50px",
                }}
              >
                <div className="below-dev-image">
                  <img
                    className="dev-image"
                    src={props.image}
                  />
                </div>
                <h3 style={{ fontWeight: "bold" }}>{props.name}</h3>
                <p className="activitiesPara"></p>
                <div className="social">
                  <button>
                    <a href={props.linkedIn} target="none">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </button>
                  <button>
                    <a href={props.gitHub} target="none">
                      <i className="fa fa-github"></i>
                    </a>
                  </button>
                  <br />
                  <button>
                    <a href={props.mail} target="none">
                      <i className="fa fa-envelope"></i>
                    </a>
                  </button>
                  <button>
                    <a href={props.instagram} target="none">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </button>
                </div>
              </div>
            </div>
    )
}
export default Developer;
{/* <div className="col-lg-4 col-md-6 col-12">
              <div
                className="card-item"
                style={{
                  padding: "0",
                  paddingTop: "30px",
                  height: "33rem",
                  borderRadius: "50px",
                }}
              >
                <div className="below-dev-image">
                  <img
                    className="dev-image"
                    src="/images/rishabh-jain.jpg"
                  />
                </div>
                <h3 style={{ fontWeight: "bold" }}></h3>
                <p className="activitiesPara"></p>
                <div className="social">
                  <button>
                    <a href="https://www.linkedin.com/in/rishabh-jain-8368531a6/" target="none">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </button>
                  <button>
                    <a href="" target="none">
                      <i className="fa fa-github"></i>
                    </a>
                  </button>
                  <br />
                  <button>
                    <a href="mailto:jain2001.rishabh@gmail.com" target="none">
                      <i className="fa fa-envelope"></i>
                    </a>
                  </button>
                  <button>
                    <a href="https://www.instagram.com/reeshabhjain321/" target="none">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </button>
                </div>
              </div>
            </div> */}