import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from "./hero.module.css";

//importing images for hero gallery
import chat from "../../../assets/images/chat.png";
import collaboration from "../../../assets/images/collaborate.png";
import video from "../../../assets/images/video-call.png";

const images = [
  {
    src: chat,
    title:
      "Seamlessly communicate with your team in real-time with our built-in chat feature.",
  },
  {
    src: collaboration,
    title:
      "Collaborate and code in real-time with our powerful platform. With a built-in compiler, you can code, compile and test your code without any hassle.",
  },
  {
    src: video,
    title:
      "Stay connected with your team with our video call feature. Discuss your code in real-time, no matter where you are in the world.",
  },
];
const components = images.map((i) => (
  <div className={classes.images}>
    <img src={i.src} alt="chat" />
    <div>
      <h1>{i.title}</h1>
    </div>
  </div>
));

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

const Hero = () => {
  return (
    <div className={classes.gallery}>
      <Slider {...settings} className={classes.slider}>
        {components.map((component, index) => (
          <div key={index}>{component}</div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
