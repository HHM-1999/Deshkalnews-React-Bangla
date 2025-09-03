import React from 'react'
import { Link } from 'react-router-dom'
import { scrollTop } from '../AllFunctions'
export default function DRelatedNews({ relatedNews }) {
    return (
        <>
            <div className="DRelatedNewsSection d-print-none">
                <p className="DRelatedNews Title"><i className="fa-solid fa-list"></i> আরও পড়ুন:</p>
                <div className="row">
                    {relatedNews.map((nc) => {
                        return (
                            <div className="col-lg-3 col-12 d-flex" key={nc.ContentID}>
                                <div className="DRelatedNewsList align-self-stretch">
                                    <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} onClick={scrollTop}>
                                        <div className="row">
                                            <div className="col-lg-12 col-sm-4 col-5">
                                                <div className="DImgZoomBlock">
                                                    <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.ContentHeading} title={nc.ContentHeading} /></picture>
                                                    {nc.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-sm-8 col-7">
                                                <div className="Desc">
                                                    <h3 className="Title">{nc.ContentHeading}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
