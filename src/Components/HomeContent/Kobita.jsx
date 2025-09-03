import { ForLazyLoaderImg, scrollTop } from "../AllFunctions";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Pen from '../../assets/media/imgAll/pen.PNG'

var lazyloaded = false
export default function Kobita() {
    const [List1, setList1] = useState([])
    // const [List2, setList2] = useState([])
        useEffect(() => {
            axios
                .get(`${process.env.REACT_APP_API_URL}home-json-bn/generateSubCategory58.json`)
                .then(({ data }) => {
                    if (data.length > 0) {
                        setList1(data.slice(0,3));
                        // setList2(data.slice(1, 4))
                        setTimeout(function () {
                            lazyloaded = false
                            ForLazyLoaderImg(lazyloaded)
                        }, 1000);
                    }
                });
        }, [])

        return (
            <div className="kobitaSection">

                <div className="row">
                    <div className="col-12">
                        <div className="section-heading">
                            <h2><i className="fa-solid fa-chevron-right"></i><Link to='/literature/poetry'>কবিতা</Link></h2>
                        </div>
                    </div>
                </div>

                <div className="kobita-sec">
                    <div className="row">
                        <div className="col-lg-5 col-5">
                            <picture>
                                <img className="img-fluid img100" src={Pen} alt="deshkalnews" title="deshkalnews" fetchpriority="high" />
                            </picture>
                        </div>
                        <div className="col-lg-7 col-7">
                            {List1.map((item, index) => {

                                return (
                                    <div className="Common-listBox-item" key={index}>
                                        <Link to={"/details/" + item.Slug + "/" + item.ContentID} onClick={scrollTop}>
                                            <div className="Desc">
                                                {item.AltHomeTitle ?
                                                <h3 className="Title">{item.AltHomeTitle}</h3> :
                                                <h3 className="Title">{item.DetailsHeading}</h3>
                                            }
                                                
                                            </div>
                                        </Link>
                                    </div>
                                )

                            })}
                            
                            
                           
                        </div>
                    </div>
                </div>

            </div>
        )
}
