import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { ForLazyLoaderImg, scrollTop } from "../AllFunctions";
import Slider from "react-slick";
import { Link } from "react-router-dom";
// import { FaPlay } from "react-icons/fa";

var lazyloaded = false;

export default function Opinion() {
    const [Lists, setLists] = useState([]);
    const [slideIndex, setSlideIndex] = useState(0);
    const [updateCount, setUpdateCount] = useState(0);
    let sliderRef = useRef(null);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}home-json-bn/generateCategory11.json`)
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
        // slidesToShow: Math.min(4, Lists.length), // Adjusts slides based on available data
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
        <section className="opinion-area">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-heading">
                            <h2><i className="fa-solid fa-chevron-right"></i><Link to='/opinion' onClick={scrollTop}>মতামত</Link></h2>
                        </div>
                    </div>
                </div>
                <Slider ref={slider => { sliderRef = slider; }} {...settings} className="commonSlider">
                    {Lists.map((list, index) => (
                        <div key={index} className="items border-right-inner">
                            <div className="opinion-list">
                                <Link to={`/details/${list.Slug}/${list.ContentID}`} onClick={scrollTop}>
                                    <div className="row">
                                        <div className="col-lg-5 col-5 Imgresize">
                                            {list.WriterImagePath ?
                                                <picture>
                                                    <img
                                                        src={process.env.REACT_APP_LAZYL_IMG}
                                                        data-src={process.env.REACT_APP_IMG_Writer + list.WriterImagePath}
                                                        alt={list.DetailsHeading}
                                                        title={list.DetailsHeading}
                                                        fetchpriority="high"
                                                        className="img-fluid img100"
                                                        width={300}
                                                        height={300}
                                                    />

                                                </picture>
                                                :
                                                <picture>
                                                    <img
                                                        src={process.env.REACT_APP_LAZYL_IMG}
                                                        data-src={list.ImageSmPath ? process.env.REACT_APP_IMG_Path + list.ImageSmPath : process.env.REACT_APP_LAZYL_IMG}
                                                        alt={list.DetailsHeading}
                                                        title={list.DetailsHeading}
                                                        fetchpriority="high"
                                                        className="img-fluid img100"
                                                        width={300}
                                                        height={300}
                                                    />

                                                </picture>

                                            }

                                        </div>
                                        <div className="col-lg-7 col-7">
                                            { list.AltHomeTitle ?
                                                    <p>{list.AltHomeTitle}</p> :
                                                    <p>{list.DetailsHeading}</p>
                                            }
                                            <span className="writer">{list.WriterName}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}
