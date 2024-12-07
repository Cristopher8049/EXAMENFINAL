import "./Carousel.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const banners = [
  {
    image:
      "https://cdn.shopify.com/s/files/1/0588/1380/8845/files/Virtuality_1717x592_1.png",
    alt: "Banner 1",
  },
  {
    image:
      "https://scontent.fsrz1-1.fna.fbcdn.net/v/t39.30808-6/400528137_736863921820244_8304446350767620788_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=qoBN5kK5X78Q7kNvgFc9Gno&_nc_ht=scontent.fsrz1-1.fna&oh=00_AYDADnY6aS8kw33u7l9no8exw9OrO3d2KaiGmX8DABHNCA&oe=667FAE51",
    alt: "Banner 2",
  },
];

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    dotsClass: "dots",
    arrows: false,
  };

  return (
    <div>
      <div className="carousel-container">
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <div key={index}>
              <img
                src={banner.image}
                alt={banner.alt}
                className="carousel-image"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Carousel;
