import React from "react";

import Box from "@mui/material/Box";
import {ListItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import conversion from "../assets/conversion.svg";
import ScienceIcon from "@mui/icons-material/Science";
import BiotechIcon from "@mui/icons-material/Biotech";
import DatasetIcon from "@mui/icons-material/Dataset";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ChecklistIcon from "@mui/icons-material/Checklist";

function AboutUs() {
  return (
    <section className="container aboutUsBox">
      <h1>About Us</h1>
      <p className="intro">
        LookBook is a groundbreaking platform that aims to enhance cognition and
        memory through the utilization of images to trigger neural responses. We
        embarked on our journey in 2022 as a group of 2U Alumni, driven by a
        shared passion for exploring the intersection of technology and
        cognitive enhancement.
      </p>
      <br></br>

      <br></br>
      <Box sx={{ flexGrow: 1 }}>
        <h3>Our Vision and Mission</h3>
        <br></br>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <ListItem>
              <ScienceIcon />
            </ListItem>
          </Grid>
          <Grid item xs={11}>
            <ListItem component="p" className="bg-light">
              Research has shown that the impact of visual stimuli on memory is
              profound, particularly when emotional content is involved. Studies
              have demonstrated that emotional stimuli have a positive effect on
              long-term memory performance, while non-emotional stimuli may even
              result in memory decline. This knowledge forms the foundation of
              our work at LookBook.
            </ListItem>
          </Grid>

          <Grid item xs={1}>
            <ListItem>
              <BiotechIcon />
            </ListItem>
          </Grid>
          <Grid item xs={11}>
            <ListItem component="p" className="bg-light">
              One area of significant interest in recent research is oxytocin, a
              neuropeptide known for its potential as a pharmacological target
              for improving behavioral and cognitive symptoms in mental
              disorders. Oxytocin receptors are present in critical brain
              regions responsible for information processing and memory, such as
              the hippocampus, amygdala, and striatum. Animal studies have shown
              that oxytocin can have both memory-enhancing and memory-impairing
              effects depending on various factors.
            </ListItem>
          </Grid>

          <Grid item xs={1}>
            <ListItem>
              <DataThresholdingIcon />
            </ListItem>
          </Grid>
          <Grid item xs={11}>
            <ListItem component="p" className="bg-light">
              While studies on the effects of oxytocin on memory in humans are
              relatively limited, preliminary findings suggest its potential in
              enhancing memory recall and recognition, particularly for
              emotional stimuli. Researchers have observed oxytocin's positive
              impact on memory performance when administered before the encoding
              phase, leading to improved accuracy and familiarity ratings for
              emotional faces and words.
            </ListItem>
          </Grid>

          <Grid item xs={1}>
            <ListItem>
              <DatasetIcon />
            </ListItem>
          </Grid>
          <Grid item xs={11}>
            <ListItem component="p" className="bg-light">
              Furthermore, oxytocin has shown promise in Alzheimer's disease
              research, with evidence indicating its ability to reverse some of
              the damage caused by amyloid plaques in the brain's learning and
              memory center.
            </ListItem>
          </Grid>
          <Grid item xs={1}>
            <ListItem>
              <CheckCircleOutlineIcon />
            </ListItem>
          </Grid>
          <Grid item xs={11}>
            <ListItem component="p" className="bg-light">
              At LookBook, we are dedicated to harnessing the power of visual
              stimuli and the potential of oxytocin to optimize cognitive
              function. By leveraging cutting-edge technologies and insights
              from neuroscience, we aim to develop innovative tools and
              methodologies that promote enhanced cognition, memory retention,
              and overall mental well-being.
            </ListItem>
          </Grid>
          <Grid item xs={1}>
            <ListItem>
              <ChecklistIcon />
            </ListItem>
          </Grid>
          <Grid item xs={11}>
            <ListItem component="p" className="bg-light">
              We believe that by delving deeper into the connection between
              visual stimuli, neural responses, and memory processes, we can
              unlock new possibilities for improving cognitive abilities. Our
              team of passionate researchers, developers, and cognitive
              enthusiasts is committed to advancing the frontiers of cognitive
              enhancement and creating a brighter future for individuals seeking
              to optimize their mental potential.
            </ListItem>
          </Grid>

          <Grid item xs={12}>
            <ListItem>
           <p className="intro">Join us on this exciting journey as we pave the way for a new era
              of cognitive enhancement through LookBook.</p>
            </ListItem>
          </Grid>
        </Grid>
      </Box>
      <br></br>
      <br></br>
      <br></br>
     
      <h3 className="text-center">OUR MEMBERS </h3>
      <br></br>
      <div className="columnMember">
        <div className="cardMember bg-light">
          <img
            src="https://ca.slack-edge.com/TMX6ZRA2V-U01F6CQN3RC-8b7063e8dd7b-512"
            alt="Charlene Peters"
            className="profileMember"
          />
          <h3>Charlene Peters</h3>
          <p className="title">CEO & Founder, LookBook - 
          Kansas University</p>
          <div>
            <a href="https://cpetersresume.com/">
              <i className="fa fa-dribbble"></i>
            </a>
            <a href="https://twitter.com/PetersVirtServ">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="https://www.linkedin.com/in/charlenepeters1/">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="https://www.facebook.com/profile.php?id=100087309682589">
              <i className="fa fa-facebook"></i>
            </a>
          </div>
        </div>

        <div className="cardMember bg-light">
          <img
            src="https://ca.slack-edge.com/TMX6ZRA2V-U03JR97LBEW-a9546db18aa4-512"
            alt="Chelsey Gravel"
            className="profileMember"
          />
          <h3>Chelsey Gravel</h3>
          <p className="title">CEO & C0-Founder, LookBook - 
          Harvard University</p>
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
      <br></br>
      <br></br>
      <br></br>
      <Box sx={{ flexGrow: 1 }}>
        <h5>Some Research Facts</h5>
        <br></br>
        
        <Grid container className="researhSection">
          <Grid item xs={12} sm={6} className="p-2 research">
            <img
              src="https://slack-imgs.com/?c=1&o1=wi32.he32.si.gu&url=https%3A%2F%2Fwww.ncbi.nlm.nih.gov%2Fcoreutils%2Fnwds%2Fimg%2Ffavicons%2Ffavicon-57.png"
              alt=""
              width="80"
              className="p-2"
            /> {" "}
            <a
              href="https://www.ncbi.nlm.nih.gov/pmc/"
              className="researchlink"
            >
              PubMed Central (PMC)
            </a>
            <br></br>
            <p className="p-2">
              Visual stimuli induce serotonin release in occipital cortex: A
              simultaneous positron emission tomography/magnetic resonance
              imaging study Endogenous serotonin (5‐HT) release can be measured
              noninvasively using positron emission tomography (PET) imaging in
              combination with certain serotonergic radiotracers.
            </p>
          </Grid>
          <Grid item xs={12} sm={6} className="p-2 research">
            <img
              src="https://slack-imgs.com/?c=1&o1=ro.gu&url=https%3A%2F%2Fwww.ncbi.nlm.nih.gov%2Fcorehtml%2Fpmc%2Fpmcgifs%2Fpmc-card-share.jpg%3F_%3D0"
              alt=""
              width="200px"
              className="p-2"
            />{" "}
            <a
              href="https://2ubootcampnetwork.slack.com/archives/D052BDMUFE1/p1687761756017919?thread_ts=1681626030.520939&cid=D052BDMUFE1"
              className="researchlink"
            >
              Psychiatric Times{" "}
            </a>
            <br></br>
            <p className="p-2">
              Study Identifies Promising Potential Treatment for Alzheimer
              Disease Results show comparisons between intranasal and
              intracerebroventricular distribution of an oxytocin derivative.
            </p>
          </Grid>
          <Grid item xs={12} sm={6} className="p-2 research">
            <a
              href="https://theconversation.com/could-love-hormone-oxytocin-help-treat-alzheimers-disease-heres-what-researchers-currently-know-163301"
              className="researchlink p-2"
            >
              <img src={conversion} alt="" width="200" className="p-2"/>{" "}
            </a>
            <p className="p-2">
              Could ‘love hormone’ oxytocin help treat Alzheimer’s disease?
              Here’s what researchers currently know
            </p>
          </Grid>

          <Grid item xs={12} sm={6} className="p-2 research">
            <img
              src="https://slack-imgs.com/?c=1&o1=ro.gu&url=https%3A%2F%2Fmedia-cldnry.s-nbcnews.com%2Fimage%2Fupload%2Ft_nbcnews-fp-1024-512%2Cf_auto%2Cq_auto%3Abest%2Fnewscms%2F2017_26%2F2057816%2F170630-cute-animal-ac-439p.jpg"
              alt="dog"
              width="200px"
              className="p-2"
            />{" "}
            <a href="https://www.nbcnews.com/better/health/science-says-looking-cute-photos-can-rekindle-your-love-life-ncna778561" className="researchlink p-2">
              NBC News{" "}
            </a>
            <br></br>
            <p>Why looking at your photos can rekindle your marriage</p>
          </Grid>
          <Grid item xs={12} sm={6} className="p-2 research">
           
              <a href="https://onlinelibrary.wiley.com/doi/10.1002/npr2.12292" className="researchlink p-2">
               <p className="p-2"> Wiley Online Library research. Some interesting results according from their experts.</p>
              </a>
           
          </Grid>
          <Grid item xs={12} sm={6} className="p-2 research">
            
              <a href="https://core.ac.uk/download/pdf/302079066.pdf" className="researchlink p-2">
               <p className="p-2"> Effects of Intranasal Oxytocin on Long-Term Memoryin
                Healthy Humans: a Systematic Review</p>
              </a>
            
          </Grid>
        </Grid>
      </Box><br></br>
    </section>
  );
}

export default AboutUs;
