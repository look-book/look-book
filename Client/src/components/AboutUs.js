import React from "react";

function AboutUs() {
  return (
    <section className="aboutUsBox">
      <h1>About Us</h1>
      <p>
        It is an app that works to help Alzheimers patients by finding the
        series of photos that help their memories by stimulating oxytocin and
        other beneficial hormones through memory recall.{" "}
      </p>
      <br></br>

      <h2>OUR MEMBERS </h2>
      <div className="columnMember">
        <div className="cardMember">
          <img
            src="https://ca.slack-edge.com/TMX6ZRA2V-U01F6CQN3RC-8b7063e8dd7b-512"
            alt="Charlene Peters"
            className="profileMember"
          />
          <h3>Charlene Peters</h3>
          <p className="title">CEO & Founder, LookBook</p>
          <p>Harvard University</p>
          <div>
            <a href="/">
              <i className="fa fa-dribbble"></i>
            </a>
            <a href="/">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="/">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="/">
              <i className="fa fa-facebook"></i>
            </a>
          </div>
        </div>

        <div className="cardMember">
          <img
            src="https://ca.slack-edge.com/TMX6ZRA2V-U03JR97LBEW-a9546db18aa4-512"
            alt="Chelsey Gravel"
            className="profileMember"
          />
          <h3>Chelsey Gravel</h3>
          <p className="title">CEO & C0-Founder, LookBook</p>
          <p>Harvard University</p>
          <div>
            <a href="/">
              <i className="fa fa-dribbble"></i>
            </a>
            <a href="/">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="/">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="/">
              <i className="fa fa-facebook"></i>
            </a>
          </div>
        </div>

        <div className="cardMember">
          <img
            src="https://ca.slack-edge.com/TMX6ZRA2V-U03CXFF8V0B-b1617ef4c88a-512"
            alt="Arturo
            "
            className="profileMember"
          />
          <h3>Arturo</h3>
          <p className="title">Application Security Engineer | DevSecOps</p>
          <p>Harvard University</p>
          <div>
            <a href="/">
              <i className="fa fa-dribbble"></i>
            </a>
            <a href="/">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="/">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="/">
              <i className="fa fa-facebook"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
