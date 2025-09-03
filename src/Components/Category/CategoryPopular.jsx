import React from 'react'
import { Link } from 'react-router-dom'
import { scrollTop } from '../AllFunctions'

export default function CategoryPopular({ catLatest, catSlug }) {
    return (
        <section className="MostPopularTab mt-4">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab" role="tab"
                            aria-selected="true" href="/national#tabs-1">এই বিভাগের সর্বাধিক
                            পঠিত</a></li>
                    </ul>
                </div>
                <div className="panel-body PanelHeight">
                    <div className="tab-content">
                        <div className="tab-pane active" id="tabs-1" role="tabpanel">
                            <div className="DLatestNews">
                                {catLatest.map((nc) => {
                                    return (
                                        <div className="MostPopularTabList" key={nc.ContentID}>
                                            <Link to={"/" + catSlug + "/news/" + nc.ContentID} onClick={scrollTop}>
                                                <div className="row">
                                                    <div className="col-lg-5 col-sm-4 col-5">
                                                        <div className="DImgZoomBlock">
                                                            <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageThumbPath} alt={nc.ContentHeading} title={nc.ContentHeading} /></picture>
                                                            {nc.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-7 col-sm-8 col-7">
                                                        <div className="Desc">
                                                            <h5 className="Title">{nc.ContentHeading}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
