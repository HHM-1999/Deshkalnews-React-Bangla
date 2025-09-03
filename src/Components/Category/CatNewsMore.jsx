'use client'

import { scrollTop } from '@/AllFunctions';
// import react from 'react'
import Link from 'next/link'



// Client side approach
export default function CatNewsMore({ articles }) {
    return (
        <>
            {articles.map((nc) => {
                return (
                    <div className="col-lg-6 col-12 d-flex " key={nc.ContentID}>
                        <div className="DCatNewsList  align-self-stretch ">
                            <Link href={"/details/" + nc.Slug + "/" + nc.ContentID} onClick={scrollTop}>
                                <div className="row">
                                    <div className="col-lg-5 col-sm-4 col-5">
                                        <div className="DImgZoomBlock">
                                            {nc.ImageBgPath === null ?
                                                <picture><img src={process.env.REACT_APP_LAZYL_IMG} alt={nc.DetailsHeading} title={nc.DetailsHeading} /></picture> :
                                                <picture><img src={process.env.REACT_APP_IMG_Path + nc.ImageBgPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} /></picture>}
                                            {nc.ShowVideo === 1 && <div className="card-video-icon big transition">
                                                <FontAwesomeIcon icon={faPlay} />
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="col-lg-7 col-sm-8 col-7">
                                        <div className="Desc">
                                            {nc.ContentSubHeading == null ?
                                                <h3 className="Title">{nc.DetailsHeading}</h3> :
                                                <h3 className="Title"> <span className="subHeading">{nc.ContentSubHeading} /</span>{nc.DetailsHeading}</h3>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                )
            })}
        </>
    );
}