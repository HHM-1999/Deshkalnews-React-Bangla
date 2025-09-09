import { ForLazyLoaderImg, scrollTop } from "../AllFunctions";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

var lazyloaded = false
export default function EnviromentMobile() {
    const [List1, setList1] = useState([])
    const [List2, setList2] = useState([])
    // const [List3, setList3] = useState([])

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}home-json-bn/generateCategory28.json`)
            .then(({ data }) => {
                // if (data.length > 0) {
                setList1(data[0]);
                setList2(data.slice(1, 4))
                // setList3(data.slice(4, 9))
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
                // }
            });
    }, [])

    return (
        <>
            <div className="protibesh-poribesh">

                <div className="row">
                    <div className="col-12">
                        <div className="section-heading">
                            <h2><i className="fa-solid fa-chevron-right"></i><Link to='/environment' onClick={scrollTop}>পরিবেশ-প্রতিবেশ</Link></h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="multiple-news-wrap">
                            <div className="CommonLead">
                                <Link to={"/" + List1.Slug + "/" + List1.ContentID} onClick={scrollTop}>
                                    <div className="Imgresize">

                                        <picture>
                                            {List1.ImageBgPath == null ?
                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_LAZYL_IMG} alt={List1.DetailsHeading} title={List1.DetailsHeading} fetchpriority="high" className="img-fluid img100" style={{width: "100%", height:"100%"}} /> :
                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + List1.ImageBgPath} alt={List1.DetailsHeading} title={List1.DetailsHeading} fetchpriority="high" className="img-fluid img100" style={{width: "100%", height:"100%"}} />}
                                            {List1.ShowVideo === 1 && <div className="card-video-icon big transition"><FaPlay /></div>}
                                        </picture>
                                    </div>
                                    <div className="Desc">
                                        {List1.AltHomeTitle ?
                                            <h3 className="Title">{List1.AltHomeTitle}</h3> :
                                            <h3 className="Title">{List1.DetailsHeading}</h3>
                                        }
                                    </div>
                                </Link>
                            </div>
                            <div className="Common-list">
                                {List2.map((item, index) => {
                                    return (
                                        <div className="Common-listBox-item" key={index}>
                                            <Link to={"/" + item.Slug + "/" + item.ContentID} onClick={scrollTop} >
                                                <div className="Desc">
                                                    {item.AltHomeTitle ?
                                                        <h3 className="Title">{item.AltHomeTitle}
                                                        </h3> :
                                                        <h3 className="Title">{item.DetailsHeading}
                                                        </h3>
                                                    }

                                                </div>
                                            </Link>
                                        </div>
                                    )
                                }
                                )}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="seeMore">
                    <Link className="btn btnMore" to='/environment' onClick={scrollTop}>আরও...</Link>
                </div>
            </div>
        </>
    )

}
