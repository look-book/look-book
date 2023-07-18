import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../assets/css/swiper.css";
import "../assets/css/main.css";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper";
import { getUploads } from "../actions/uploads";
import Upload from "./Upload";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import UploadForm from "./UploadForm";

function Upload2() {
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    fetch("/api/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => (data.isLoggedIn ? setUser(data) : null))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const getUser = () => {
      fetch("/auth/login/success", {
        credentials: "include",
        SameSite: "none",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  useEffect(() => {
    const getUser = () => {
      fetch("/user/facebook", {
        credentials: "include",
        SameSite: "none",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <div className="container">
      <div>
        <h2>Memory Recall Test</h2>
        <p>
          You need to key in your name in order to access the questions that
          will appear at the bottom of each images.
        </p>
        <ol>
          <li>
            You will be asked some questions one after another. And if you get
            stuck you can scroll through images to give you ideas.
          </li>
          <li>10 points is awarded for the correct answer.</li>
          <li>
            Each question has three or more options. You can choose only one
            options.
          </li>
          <li>You can review and change answers before the quiz finish.</li>
          <li>The result will be declared at the end of the quiz.</li>
        </ol>
      </div>

      <br></br>
      {user && user.username ? (
        <>
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
                  setUser={setUser}
                  user={user}
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

          <div className="uploadBox">
            <h4 className="text-center">Upload photos or browse above</h4>
            <UploadForm setUser={setUser} user={user} />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Upload2;
