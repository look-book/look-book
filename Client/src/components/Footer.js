import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import logoFooter from "../assets/logo.png"
const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "#dedede",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg d-flex">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="black" variant="p">
            <img src={logoFooter} alt="logo" width="60px" /> LOOKBOOK LLC
           </Typography><br></br><br></br>
            <Typography color="textSecondary" className="footerp" >
            © {`${new Date().getFullYear()} | lookbook@services.com | +1 775 753 6747`}
            </Typography>
            <Typography color="textSecondary" className="footerp">
             Alrights reserved | Private Policy/Terms
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div className="socialicons">
          <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
      </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
