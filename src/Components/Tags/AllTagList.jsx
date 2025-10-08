import axios from 'axios'
import { useEffect, useState } from 'react'
import DocumentTitle from 'react-document-title'
import { Link, useParams } from 'react-router-dom'
import { ForLazyLoaderImg, scrollTop } from '../AllFunctions'


var offset = 0
var limit = 20
var showMore = true
var lazyloaded = false
export default function AllTagList() {
    let { all_tags } = useParams();
    const [allTags, setAllTags] = useState([])

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}tags-list/${limit}/${offset}`)
            .then(({ data }) => {
                setAllTags(data.tags);
            });
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        // return () => clearTimeout(timer);
    }, [all_tags])

    const toggleButtonState = (e) => {
        e.preventDefault()
        offset += limit
        // formData = { 'start_date': start_date, 'end_date': end_date, 'category_id': category_id, 'limit': limit, 'offset': offset }
        axios
            .get(`${process.env.REACT_APP_API_URL}tags-list/${limit}/${offset}`)
            .then(({ data }) => {
                if (data.tags.length < limit) {
                    showMore = false
                }
                for (let i = 0; i < data.tags.length; i++) {
                    setAllTags(oldArray => [...oldArray, data.tags[i]]);
                }
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
            });
    }


    return (
        <main>
            <div className="container">
                <div className="TopHomeSection"></div>
                <DocumentTitle title='দেশকালনিউজ :: ট্যাগ সমূহ' />
                <div className="DTitle">
                    <Link to={+ '/'} onClick={scrollTop}>
                        <div className="DTitleInner"><h1 className="DTitleInnerBar">ট্যাগ সমূহ</h1></div>
                    </Link>
                </div>
                <div className="DTagListArea mb-5">
                    <ul className="row">
                        {allTags.map((nc) => {
                            return (
                                <li className="col-lg-3 col-sm-6 col-12" key={nc.TagID}>
                                    <div className="DTagListItem">
                                        <Link to={"/tags/" + nc.TagName}>
                                            <div className="Desc">
                                                <h2 className="Title">{nc.TagName}{/* || <span>sara-ali-khan</span> */}
                                                </h2>
                                            </div>
                                        </Link>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                {showMore &&
                    <div id="btnDiv" className="text-center mt-3 mb-4">
                        <button onClick={toggleButtonState} id="ajax-more-btn" className="btn btn-lg btn-block ButtonBG">আরো ট্যাগ...</button>
                    </div>}
            </div>
        </main>
    )
}
