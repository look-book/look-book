import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../swiper.css";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { getUploads } from "../actions/uploads";
import UploadForm from "./UploadForm";
import Upload from "./Upload";
import { useParams } from "react-router";
import { TextField } from "@mui/material";

function Upload2({ match }) {
  const { userId } = useParams(match);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  const [q, setQ] = useState("");
  const [searchParam] = useState(["title"]);

  useEffect(() => {
    dispatch(getUploads());
  }, [userId, dispatch]);

  useEffect(() => {
    fetch(`/api/user/${userId}`, {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => alert(err));
  }, [userId]);

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

  return (
    <div className="container">
      <div className="uploadBox">
        <h1>Upload photos or browse below</h1>
        <UploadForm user={user} setUser={setUser} />
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
        {search(uploads).map((upload) => (
          <SwiperSlide key={upload.id}>
            <Upload
              upload={upload}
              user={user}
              setUser={setUser}
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
    </div>
  );
}

export default Upload2;