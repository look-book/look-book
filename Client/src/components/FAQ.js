import React from "react";
import { Container } from "@mui/material";


function FAQ() {
  return (
    <Container>
    <section className="contentBox">
      <h1>FAQ</h1>
      <h5>What is LookBook?</h5>
      <p>
        This is a an app that will be used to help with memory recall in
        Alzheimer's patients. The app will use a set of algorithms to determine
        the best time to show the picture using emotion ratings, tags and color
        data.
      </p>
      <h5>What it does?</h5>
      <p>
        Future Goals Ideally, with each upload, you will be able to enter if the
        photo contains close relatives, friends, acquaintances, strangers,
        favorite objects, etc. You will also be able to answer if you love the
        photo, like the photo, don't care about the photo, etc... so that
        hormones that are released while looking at the pattern of photos are
        able to be hypothesized based on your self-reported feelings about the
        photo. Then, ideally, after looking at so many photos, the results are
        connected to a backend computing platform that will determine the
        pattern of images that are likely to produce the most cognitive success
        in patients. This will be deteremind by having a series of 1-question
        quizes after so many images.
      </p>
    </section>
    </Container>
  );
}

export default FAQ;
