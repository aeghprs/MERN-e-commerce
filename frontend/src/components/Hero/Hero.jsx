import React from "react";
import Beach from "../bag.avif"
import Old from "../laptop.avif"
import cam from "../cam.avif"
import watch from '../watch.avif'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Hero.css'

const Hero = () => {

  // For banner ad carousel
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    swipeToSlide: true,
    pauseOnHover: true,
    fade: true,
  }
  return (
    <>
      <div className="mt-20 main_hero_container w-full" id="hero">
        <div className=" mx-auto bg-red-300 w-full">
          <Slider {...settings} className=" w-full h-[58vh]">
            <div className="banner_container relative">
              <div className="w-full flex justify-center h-[58vh] items-center relative">
                <div className="absolute z-10 text-white max-w-4xl flex items-center text-center justify-center ">
                  <h1 className="font-Jakarta text-6xl font-bold capitalize">Think Fast. Work Smart. Have Fun.Your key to running a business.</h1>
                </div>
                <div className="flex justify-center items-center w-full h-[50vh]">
                  <div className="w-full h-[58vh]">
                    <img className="w-full h-[58vh] object-cover" src={Old} />
                  </div>
                </div>
              </div>
            </div>
            <div className="banner_container relative">
              <div className="w-full flex justify-center h-[58vh] items-center relative">
                <div className="absolute z-10 text-white">
                  <h1 className="font-Jakarta text-6xl font-bold capitalize">Quality Products, Quality life.</h1>
                </div>
               
                <div className="flex justify-center items-center w-full h-[50vh]">
                  <div className="w-full h-[58vh]">
                    <img className="w-full h-[58vh] object-cover" src={Beach} />
                  </div>
                </div>
              </div>
            </div>
            <div className="banner_container relative">
              <div className="w-full flex justify-center h-[58vh] items-center relative">
                <div className="absolute z-10 text-white">
                  <h1 className="font-Jakarta text-6xl font-bold capitalize">capture it all.</h1>
                </div>
               
                <div className="flex justify-center items-center w-full h-[50vh]">
                  <div className="w-full h-[58vh]">
                    <img className="w-full h-[58vh] object-cover" src={cam} />
                  </div>
                </div>
              </div>
            </div>
            <div className="banner_container relative">
              <div className="w-full flex justify-center h-[58vh] items-center relative">
                <div className="absolute z-10 text-white">
                  <h1 className="font-Jakarta text-6xl font-bold capitalize">Because times are changing</h1>
                </div>
               
                <div className="flex justify-center items-center w-full h-[50vh]">
                  <div className="w-full h-[58vh]">
                    <img className="w-full h-[58vh] object-cover" src={watch} />
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>


    </>
  );
};

export default Hero;
