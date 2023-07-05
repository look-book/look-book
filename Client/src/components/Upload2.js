import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../assets/css/swiper.css";
import "../assets/css/main.css";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper";
import { getUploads } from "../actions/uploads";
import UploadForm from "./UploadForm";
import Upload from "./Upload";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUserId, setLocation } from "../redux/result_reducer";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Quiz from "./Quiz";
import { CheckUserExist } from "../helper/helper";
import HomeIcon from "@mui/icons-material/Home";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  color: "grey",
  p: 4,
};

function Upload2() {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const [q, setQ] = useState("");
  const [searchParam] = useState(["title"]);

  useEffect(() => {
    dispatch(getUploads());
  }, [dispatch]);

  const uploads = useSelector((state) => state.uploads);

  function search(uploads) {
    return uploads.filter((upload) => {
      return searchParam.some((newItem) => {
        return (
          upload[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      });
    });
  }

  const inputRefUser = useRef(null);
  const inputRefLoc = useRef(null);

  function startQuiz() {
    if (inputRefUser.current?.value) {
      dispatch(setUserId(inputRefUser.current?.value));
      dispatch(setLocation(inputRefLoc.current?.value));
      setOpen(true);
    }
  }

  return (
    <div className="container">
      <div>
        <h2>Memory Recall Test</h2>
        <p>
          You need to key in your name in order to access the questions that
          will appear once you hover the images.
        </p>
        <ol>
          <li>You will be asked some questions one after another.</li>
          <li>10 points is awarded for the correct answer.</li>
          <li>
            Each question has three or more options. You can choose only one
            options.
          </li>
          <li>You can review and change answers before the quiz finish.</li>
          <li>The result will be declared at the end of the quiz.</li>
        </ol>
        <form id="form">
          <div>
            {" "}
            <AccountCircle /> Patient Name:{" "}
            <input
              ref={inputRefUser}
              className="userid"
              type="text"
              name="username"
              placeholder="Name"
            />{" "}
            <HomeIcon /> State Location:{" "}
            <input
              ref={inputRefLoc}
              className="location"
              type="text"
              name="location"
              placeholder="State Location"
            />{" "}
          </div>
        </form>

        <div className="start">
          <Link className="btn" to="/album" onClick={startQuiz}>
            Start Quiz
          </Link>
        </div>
      </div>

      <br></br>
      <div className="main">
        <div className="search">
          <TextField
            id="outlined-basic"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            variant="outlined"
            fullWidth
            placeholder="Search categories..."
          />
        </div>
      </div>
      <br></br>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {search(uploads).map((upload, i) => (
          <SwiperSlide key={i}>
            <Upload
              upload={upload}
              currentId={currentId}
              setCurrentId={setCurrentId}
              key={upload._id}
            />
          </SwiperSlide>
        ))}

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div>
      </Swiper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CheckUserExist>
            <Quiz />
          </CheckUserExist>
        </Box>
      </Modal>
      <div className="uploadBox">
        <h4 className="text-center">Upload photos or browse above</h4>
        <UploadForm currentId={currentId} setCurrentId={setCurrentId} />
      </div>
    </div>
  );
}

export default Upload2;
