import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ForLazyLoaderImg, scrollTop } from '../AllFunctions'
import LatestPopular from './LatestPopular'
var lazyloaded = false
export default function VideoLead() {
    const [LeadData, setLeadData] = useState([])
    const [MblLeadData, setMblLeadData] = useState([])

    // const [generateLatest, setgenerateLatest] = useState([])
    // const [generatePopular, setgeneratePopular] = useState([])
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}home-json-bn/generateVideo_features.json`)
            .then(({ data }) => {
                if (data.length > 0) {
                    setMblLeadData(data[0])
                    setLeadData(data.slice(0, 4));
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });


    }, [])

    return (
        <>
            <div className="leadTop4">
                <div className="row ">
                    {LeadData.map((nc, i) => {
                        return (
                            <div className="col-lg-3 MblHide" key={i}>
                                <div className="Common-list-details">
                                    <Link to={"/videos/" + nc.WebTVID} onClick={scrollTop}>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="leadTop4-img Imgresize">
                                                    <picture>
                                                        {nc.WebTVLinkCode === null ? (
                                                            <img
                                                                src={process.env.REACT_APP_LAZYL_IMG}
                                                                data-src={process.env.REACT_APP_LAZYL_IMG}
                                                                alt={nc.WebTVHeading}
                                                                title={nc.WebTVHeading}
                                                                className="img100 ImgRatio Imgresize"
                                                                fetchpriority="high"
                                                                
                                                            />
                                                        ) : (
                                                            <img
                                                                src={process.env.REACT_APP_LAZYL_IMG}
                                                                data-src={'https://img.youtube.com/vi/' + nc.WebTVLinkCode + '/0.jpg'}
                                                                alt={nc.WebTVHeading}
                                                                title={nc.WebTVHeading}
                                                                fetchpriority="high"
                                                                className="img100 ImgRatio Imgresize"
                                                                
                                                            />
                                                        )}
                                                    </picture>
                                                    <div className="video-icon"><i className="fas fa-play"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="Desc">
                                                    <h3 className="Title">{nc.WebTVHeading}
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                    {MblLeadData ?
                        <div className="col-lg-12  MblShow">
                            <div className="Common-list-details">
                                <Link to={"/videos/" + MblLeadData.WebTVID} onClick={scrollTop}>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="leadTop4-img Imgresize">
                                                <picture>
                                                    {MblLeadData.WebTVLinkCode === null ? (
                                                        <img
                                                            src={process.env.REACT_APP_LAZYL_IMG}
                                                            data-src={process.env.REACT_APP_LAZYL_IMG}
                                                            alt={MblLeadData.WebTVHeading}
                                                            title={MblLeadData.WebTVHeading}
                                                            fetchpriority="high"
                                                            className="img100 ImgRatio Imgresize"
                                                          
                                                        />
                                                    ) : (
                                                        <img
                                                            src={process.env.REACT_APP_LAZYL_IMG}
                                                            data-src={'https://img.youtube.com/vi/' + MblLeadData.WebTVLinkCode + '/0.jpg'}
                                                            alt={MblLeadData.WebTVHeading}
                                                            title={MblLeadData.WebTVHeading}
                                                            fetchpriority="high"
                                                            className="img100 ImgRatio Imgresize"
                                                          
                                                        />
                                                    )}
                                                </picture>
                                                <div className="video-icon"><i className="fas fa-play"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="Desc">
                                                <h3 className="Title">{MblLeadData.WebTVHeading}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        : ""
                    }
                    <div className="seeMore">
                        <Link className="btn btnMore" to="/videos" onClick={scrollTop}>আরও...</Link>
                    </div>
                </div>
                <LatestPopular />
            </div>

        </>

    )
}
