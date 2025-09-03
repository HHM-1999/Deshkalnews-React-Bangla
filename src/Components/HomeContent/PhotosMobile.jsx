import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { ForLazyLoaderImg, scrollTop } from "../AllFunctions";
import Slider from "react-slick";
import { Link } from "react-router-dom";
// import { FaPlay } from "react-icons/fa";

var lazyloaded = false;

export default function PhotosMobile() {
    const [Lists, setLists] = useState([]);
    const [slideIndex, setSlideIndex] = useState(0);
    const [updateCount, setUpdateCount] = useState(0);
    let sliderRef = useRef(null);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}home-json-bn/generatePhotoAlbumGallery.json`)
            .then(({ data }) => {
                if (data.length > 0) {
                    setLists(data.slice(0, 12));
                    setTimeout(() => {
                        lazyloaded = false;
                        ForLazyLoaderImg(lazyloaded);
                    }, 1000);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const settings = {
        dots: false,
        infinite: Lists.length > 3, // Ensures the slider loops only if more than 3 items exist
        speed: 100,
        slidesToShow: 4,
        slidesToScroll: 1,
        afterChange: () => setUpdateCount(updateCount + 1),
        beforeChange: (current, next) => setSlideIndex(next),
        centerPadding: "0px",
        className: "center",
        // centerMode: Lists.length > 3,
        pauseOnFocus: true,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(3, Lists.length),
                    slidesToScroll: 1,
                    infinite: Lists.length > 2,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: Math.min(2, Lists.length),
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section className="Photo-glly-area">
          <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-heading">
                            <h2><i className="fa-solid fa-chevron-right"></i><Link to='/photo' onClick={scrollTop}>ফটো গ্যালারি</Link></h2>
                        </div>
                    </div>
                </div>
                
                <Slider ref={slider => { sliderRef = slider; }} {...settings} className="commonSlider">
                    {Lists.map((list, index) => (
                        <div key={index} className="items">
                            <div className="CommonSecNews2-wrapper">
                                <div className="row gx-3">
                                    <div className="col-12">
                                        <div className="Common-list2">
                                            <div className="Common-list2-details">
                                                <Link to={"/photo/" + list.AlbumID} onClick={scrollTop}>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-12">
                                                            <div className="video-img-wrap Imgresize">
                                                                <picture>
                                                                    {list.cover == null ?
                                                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={list.Title} title={list.Title} fetchpriority="high" className="img-fluid img100" style={{width: "100%", height:"100%"}} /> :
                                                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + list.cover} alt={list.Title} title={list.Title} fetchpriority="high" className="img-fluid img100" style={{width: "100%", height:"100%"}} />}

                                                                    <div className="video-icon"><i className="fa-solid fa-camera"></i>
                                                                    </div>
                                                                </picture>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 col-12">
                                                            <div className="Desc">
                                                                <h3 className="Title"> {
                                                                    list.Title
                                                                }</h3>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}
