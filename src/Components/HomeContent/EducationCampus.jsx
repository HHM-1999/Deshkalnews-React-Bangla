

import { useEffect, useState } from "react";
import { ForLazyLoaderImg, scrollTop } from "../AllFunctions";

import { Link } from "react-router-dom";
import axios from "axios";
import { FaPlay } from "react-icons/fa";

var lazyloaded = false
export default function EducationCampus() {
    const [SubcatName, setSubcatName] = useState([])
    const [List2, setList2] = useState([])
    const [List3, setList3] = useState([])

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}home-json-bn/generateCategory13.json`)
            .then(({ data }) => {
                if (data.length > 0) {
                setList2(data[0]);
                setList3(data.slice(1, 3))
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
                }
            });
        axios
            .get(`${process.env.REACT_APP_API_URL}category/education`)
            .then(({ data }) => {
                if (data.category) {
                    // setcatName(data.category)
                    setSubcatName(data.category.subCategories)

                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    }, [])



    return (
        <>
            <div className="row">
                <div className="col-12">
                <div className="section-heading d-flex align-items-end">
                        <h2><a href="/education"><i className="fa-solid fa-chevron-right"></i>শিক্ষা</a> </h2>
                        <div className="multiple-subcat-title">
                            {SubcatName.map((nc, i) => {
                                return (
                                    <Link to={`/education/sub/${nc.Slug}`} onClick={scrollTop} key={i}>{nc.CategoryName}</Link>
                                )
                            })}

                        </div>
                    </div>
                </div>
            </div>
            <div className="multiple-news-wrap">
                {List2 ?
                    <div className="CommonLead">
                        <Link to={"/" + List2.Slug + "/" + List2.ContentID} onClick={scrollTop} >
                            <div className="row">
                                <div className="col-lg-12 col-5 Imgresize">
                                    <picture>
                                        {List2.ImageSmPath == null ?
                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={List2.DetailsHeading} title={List2.DetailsHeading} fetchpriority="high" className="img-fluid img100" width={300} height={169} />
                                            :
                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + List2.ImageSmPath} alt={List2.DetailsHeading} title={List2.DetailsHeading} fetchpriority="high"  className="img-fluid img100" width={300} height={169} />

                                        }
                                        {List2.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                    </picture>
                                </div>
                                <div className="col-lg-12 col-7">
                                    <div className="Desc">
                                        {List2.AltHomeTitle ?
                                            <h3 className="Title">{List2.AltHomeTitle}</h3> :
                                            <>
                                                {List2.ContentSubHeading === null || List2.ContentSubHeading === undefined ?
                                                    <h3 className="Title">{List2.DetailsHeading}</h3> :
                                                    <h3 className="Title"> <span className="subHeading">{List2.ContentSubHeading + " / "}</span> {List2.DetailsHeading}</h3>
                                                }
                                            </>
                                        }

                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    : ""}

            </div>
            {List3.map((nc, i) => {
                return (
                    <>

                        <div className="Common-list" key={i}>
                            <div className="Common-listBox-item">
                                <Link to={"/" + nc.Slug + "/" + nc.ContentID} onClick={scrollTop}>
                                    <div className="Desc">
                                        {nc.AltHomeTitle ?
                                            <h3 className="Title">{nc.AltHomeTitle}</h3> :
                                            <>
                                                {nc.ContentSubHeading === null || nc.ContentSubHeading === undefined ?
                                                    <h3 className="Title">{nc.DetailsHeading}</h3> :
                                                    <h3 className="Title"> <span className="subHeading">{nc.ContentSubHeading + " / "}</span> {nc.DetailsHeading}</h3>
                                                }
                                            </>
                                        }

                                    </div>
                                </Link>
                            </div>

                        </div></>

                )
            })}
            <div className="seeMore">
                <Link className="btn btnMore" to="/education" onClick={scrollTop}>আরও...</Link>
            </div>
            {/* <div className="row">
                    <div className="col-12">
                        <div className="DHomeAdd300X250 d-flex justify-content-center mt-3">
                            <img src="/media/Advertisement/Advertisement (300X250).png"
                                alt="" title="" className="img-fluid" />
                        </div>
                    </div>
                </div> */}

        </>
    )

}
