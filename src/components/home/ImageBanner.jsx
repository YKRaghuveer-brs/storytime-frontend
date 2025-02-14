import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
const ImageBanner = () => {
  return (
    <div className="rounded-lg text-white pt-8 hover:cursor-pointer">
      <Carousel showThumbs={false}
                autoPlay={true}
                interval={5000}  
                transitionTime={1000}  
                infiniteLoop={true}
      >
        <div><img src="./images/banner1.png" alt="" /></div>
        <div><img src="./images/banner2.png" alt="" /></div>
        <div><img src="./images/banner3.png" alt="" /></div>
      </Carousel>
    </div>
  );
};

export default ImageBanner;