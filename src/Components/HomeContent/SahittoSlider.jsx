import { ForLazyLoaderImg, scrollTop } from "../AllFunctions";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRef } from "react";
import Slider from "react-slick";
import { FaPlay } from "react-icons/fa";

var lazyloaded = false
export default function SahittoSlider() {
    const [Lists, setLists] = useState([])
    const [slideIndex, setSlideIndex] = useState(0);
    const [updateCount, setUpdateCount] = useState(0);
    let sliderRef = useRef(null);


    var settings = {
        dots: false,
        infinite: true,
        speed: 100,
        slidesToShow: 4,
        slidesToScroll: 1,
        afterChange: () => setUpdateCount(updateCount + 1),
        beforeChange: (current, next) => setSlideIndex(next),
        centerPadding: "50px",
        className: "center",
        centerMode: true,
        dots: true,
        // infinite: true,
        // arrows: true,
        // autoplay: true,
        pauseOnFocus: true,
        Speed: 100,
        // slidesToShow: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
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
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}home-json-bn/generateCategory17.json`)
            .then(({ data }) => {
                if (data.length > 0) {
                    setLists(data.slice(1, 9));
                    // setList2(data.slice(1, 4))
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    }, [])

    return (
        <>

            <div className="Common-list3 pb-4">

                <Slider ref={slider => {
                    sliderRef = slider;
                }}
                    {...settings} className="commonSlider Sahitto">
                    {Lists.map((list, i) => {
                        return (
                            <div className="items Common-list3-details" key={i}>

                                <Link to={"/" + list.Slug + "/" + list.ContentID} onClick={scrollTop} >
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="Common-list3-img Imgresize">
                                                <picture>
                                                    {list.ImageBgPath == null ?
                                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={list.DetailsHeading} title={list.DetailsHeading} fetchpriority="high" className="img-fluid img100" /> :
                                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + list.ImageBgPath} alt={list.DetailsHeading} title={list.DetailsHeading} fetchpriority="high" className="img-fluid img100" />}

                                                    {list.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                                </picture>
                                            </div>

                                        </div>
                                        <div className="col-lg-12">
                                            {list.AltHomeTitle ?
                                                <h3 className="Title">{list.AltHomeTitle}</h3> :
                                                <h3 className="Title">{list.DetailsHeading}</h3>
                                            }

                                            {/* <span className="writer">{list.WriterName}</span> */}
                                        </div>
                                    </div>
                                </Link>

                            </div>
                        )
                    })}



                </Slider>

            </div>

        </>
    )
}
