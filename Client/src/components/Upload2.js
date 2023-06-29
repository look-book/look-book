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
import { setUserId } from "../redux/result_reducer";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Quiz from "./Quiz";
import { CheckUserExist } from "../helper/helper";

function Upload2() {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

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

  const inputRef = useRef(null);

  function startQuiz() {
    if (inputRef.current?.value) {
      dispatch(setUserId(inputRef.current?.value));
    }
  }

  return (
    <div className="container">
      <div>
        <h2>Memory Recall Test</h2>
        <p>
          You need to key in your name in order to access the questions that
          will are located on the back of each images.
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
              ref={inputRef}
              className="userid"
              type="text"
              placeholder="Name"
            />
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
            <div className="containerOverlay">
              <div className="overlayBack">
                <Upload
                  upload={upload}
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                  key={upload._id}
                />
              </div>
              <div className="overlay">
                <CheckUserExist>
                  <Quiz />
                </CheckUserExist>
              </div>
            </div>
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
      <div className="uploadBox">
        <h4 className="text-center">Upload photos or browse above</h4>
        <UploadForm currentId={currentId} setCurrentId={setCurrentId} />
      </div>
    </div>
  );
}

export default Upload2;
