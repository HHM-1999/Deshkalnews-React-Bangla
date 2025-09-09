import axios from 'axios'
import { useEffect, useState } from 'react'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router-dom'
import { ForLazyLoaderImg, formatDateToBengali24, scrollTop } from './AllFunctions'
import ArchiveLdJson from './ArchieveLdJson'


var lazyloaded = false
var offset = 0
var limit = 12
var showMore = true

var start_date = ""
var end_date = ""
var category_id = ""

var formData = []
export default function Archives() {
    // const { state } = useLocation();
    const [allCategoryList, setAllCategoryList] = useState([]);
    const [news, setNews] = useState([]);
    const [selectedStartDate, setSelectedStartDate] = useState('');
    const [isLoading, setisLoading] = useState(false)
    // const [isLoading, setisLoading] = useState(true)
    // console.log(state);
    useEffect(() => {
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        setTimeout(() => { window.location.reload(1); }, 300000);
        setisLoading(true)
        // // setisLoading(true)
        // // setTimeout(() => { setisLoading(false) }, 300);
        // // setisLoading(true)
        // // setTimeout(() => { setisLoading(false) }, 300);
        // // window.scrollTo(0, 0)
        // // state = { 'start_date': "", 'end_date': "", 'category_name': "0", 'limit': limit, 'offset': offset }
        // if (state) {
        //     axios
        //         .post(`${process.env.REACT_APP_API_URL}archive`, state)
        //         .then(({ data }) => {
        //             // setisLoading(false)
        //             // setisLoading(false)
        //             setNews(data.data);
        //             if (data.data.length < limit) {
        //                 showMore = false
        //             }
        //             setTimeout(function () {
        //                 lazyloaded = false
        //                 ForLazyLoaderImg(lazyloaded)
        //             }, 1000);
        //         });
        // } else {
        offset = 0
        formData = { 'start_date': "", 'end_date': "", 'category_id': "", 'limit': limit, 'offset': offset }
        axios
            .post(`${process.env.REACT_APP_API_URL}archive`, formData)
            .then(({ data }) => {
                setisLoading(false)
                if (data.data.length < limit) {
                    showMore = false
                }
                setNews(data.data);
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
            });
        // }
        axios
            .get(`${process.env.REACT_APP_API_URL}category`)
            .then(({ data }) => {
                setisLoading(false)
                setAllCategoryList(data.categories);
            });
        // const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        // return () => clearTimeout(timer);
    }, []);

    // const resultSubmit = (e) => {
    //     e.preventDefault()
    //     showMore = true
    //     start_date = e.target.start_date.value;
    //     end_date = e.target.end_date.value;
    //     category_id = e.target.category_id.value;
    //     offset = 0
    //     formData = { 'start_date': start_date, 'end_date': end_date, 'category_id': category_id, 'limit': limit, 'offset': offset }
    //     axios
    //         .post(`${process.env.REACT_APP_API_URL}archive`, formData)
    //         .then(({ data }) => {
    //             if (data.data.length > 0) {
    //                 setNews(data.data);
    //                 if (data.data.length < limit) {
    //                     showMore = false
    //                 }
    //                 setTimeout(function () {
    //                     lazyloaded = false
    //                     ForLazyLoaderImg(lazyloaded)
    //                 }, 1000);
    //             } else setNews("null")
    //         });
    // }
    // const resultSubmit = (e) => {
    //     e.preventDefault();
    //     showMore = true;

    //     start_date = e.target.start_date.value;
    //     end_date = e.target.end_date.value;
    //     category_id = e.target.category_id.value;

    //     offset = 0;

    //     // If category is not selected, send request without filtering category
    //     formData = {
    //         'start_date': start_date,
    //         'end_date': end_date,
    //         'limit': limit,
    //         'offset': offset
    //     };

    //     if (category_id && category_id !== "0") {
    //         formData['category_id'] = category_id; // Only add category_id if it's selected
    //     }

    //     axios.post(`${process.env.REACT_APP_API_URL}archive`, formData)
    //         .then(({ data }) => {
    //             if (Array.isArray(data.data) && data.data.length > 0) {
    //                 setNews(data.data);
    //                 if (data.data.length < limit) {
    //                     showMore = false;
    //                 }
    //                 setTimeout(() => {
    //                     lazyloaded = false;
    //                     ForLazyLoaderImg(lazyloaded);
    //                 }, 1000);
    //             } else {
    //                 setNews([]); // Fix: Set empty array instead of "null"
    //             }
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching news:", error);
    //             setNews([]); // Handle errors gracefully
    //         });
    // };
    const resultSubmit = (e) => {
        e.preventDefault();
        let inputStartDate = e.target.start_date.value;
        let inputEndDate = e.target.end_date.value;

        const endDateObj = new Date(inputEndDate);
        endDateObj.setDate(endDateObj.getDate() + 1);
        const adjustedEndDate = endDateObj.toISOString().split('T')[0];

        start_date = inputStartDate;
        end_date = adjustedEndDate;
        category_id = e.target.category_id.value
        // category_id = e.target.category_id.value !== "" ? parseInt(e.target.category_id.value) : "";

        offset = 0;
        formData = {
            'start_date': start_date,
            'end_date': end_date,
            'category_id': category_id,
            'limit': limit,
            'offset': offset
        };

        setisLoading(true);
        showMore = true;

        axios
            .post(`${process.env.REACT_APP_API_URL}archive`, formData)
            .then(({ data }) => {
                setisLoading(false);
                if (data.data.length > 0) {
                    setNews(data.data);
                    if (data.data.length < limit) {
                        showMore = false;
                    }
                    setTimeout(() => {
                        lazyloaded = false;
                        ForLazyLoaderImg(lazyloaded);
                    }, 1000);
                } else {
                    setNews(null);
                }
            });
    };



    const toggleButtonState = (e) => {
        e.preventDefault()
        offset += limit
        formData = { 'start_date': start_date, 'end_date': end_date, 'category_id': category_id, 'limit': limit, 'offset': offset }
        setisLoading(true)
        axios
            .post(`${process.env.REACT_APP_API_URL}archive`, formData)
            .then(({ data }) => {
                if (data.data.length < limit) {
                    setisLoading(false)
                    showMore = false
                }
                for (let i = 0; i < data.data.length; i++) {
                    setNews(oldArray => [...oldArray, data.data[i]]);
                }
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
            });
    }
    const handleChange = (e) => {
        setSelectedStartDate(e.target.value);
    };
    return (
        <main>
            <div className="container">
                <div className="TopHomeSection"></div>
                <DocumentTitle title="আর্কাইভ | পুরনো সব গুরুত্বপূর্ণ খবর ও রেকর্ড" />
                <ArchiveLdJson />
                <div className="DTitle"><Link to="/archives"><div className="DTitleInner"><h1 className="DTitleInnerBar"><span>আর্কাইভস</span></h1></div></Link></div>
                <div className="row">
                    <div className="col-sm-12 my-4">
                        <form className="form-inline" onSubmit={resultSubmit}>
                            <div className="form-group clearfix">
                                <div className="row">
                                    <div className="col-sm-4 my-2">
                                        <label htmlFor="start_date">  তারিখ হতে :</label>
                                        <input type="date" className="form-control hasDatepicker" id="datepicker" name="start_date" onChange={handleChange} />
                                    </div>
                                    <div className="col-sm-4 my-2">
                                        <label htmlFor="end_date">  তারিখ পর্যন্ত :</label>
                                        <input type="date" id="datepickerto" name="end_date" min={selectedStartDate} className="form-control hasDatepicker" />
                                    </div>
                                    <div className="col-sm-4 my-2">
                                        <label htmlFor="category_id">  সব ক্যাটাগরি :</label>
                                        {/* <select defaultValue={'0'} name="category_id" className="form-control cboCatName">
                                            <option value="0" disabled>সকল খবর</option>
                                            {allCategoryList.map((nc) => {
                                                return (
                                                    <option key={nc.CategoryID} value={nc.CategoryID}>{nc.CategoryName}</option>
                                                );
                                            })}
                                        </select> */}
                                        <select defaultValue={''} name="category_id" className="form-control cboCatName">
                                            <option value="" disabled >সকল খবর</option> {/* Ensure '0' is the default for all categories */}
                                            {allCategoryList.map((nc) => (
                                                <option key={nc.CategoryID} value={nc.CategoryID}>
                                                    {nc.CategoryName}
                                                </option>
                                            ))}
                                        </select>

                                    </div>
                                </div>
                            </div>
                            <div id="btnDiv" className="text-center my-4">
                                <button type="submit" name="btnSubmit" className="btn btn-lg btn-block ButtonBG">
                                    খুঁজুন
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="DAdd1 mb-4 d-flex  justify-content-center">
                            <Link to="/"><img src={"/media/Advertisement/Advertisement(970X90).png"} alt="Advertisement" title="Advertisement" fetchpriority="high" className="img-fluid img100" /></Link>
                        </div>
                    </div>
                </div>
                <div className="row archiveSection">
                    {news === null ?
                        <><h1 className='warningHeader'> <span>দুঃখিত,</span> কোন খবর খুঁজে পাওয়া যায়নি।</h1></>
                        :
                        news.map((nc, i) => (
                            <div className="col-lg-6 col-sm-12" key={i}>
                                <div className="archiveListNews">
                                    <Link rel="preload" as="image" to={"/" + nc.Slug + "/" + nc.ContentID} onClick={scrollTop}>
                                        <div className="row">
                                            <div className="col-sm-4 col-5 card-video-part">
                                                <div className="DImgZoomBlock">
                                                    <picture>
                                                        <img
                                                            src={process.env.REACT_APP_LAZYL_IMG}
                                                            data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath}
                                                            alt={nc.ContentHeading}
                                                            title={nc.ContentHeading}
                                                            fetchpriority="high"
                                                            style={{width: "100%", height:"100%"}}
                                                        />
                                                    </picture>
                                                    {nc.ShowVideo === 1 && <div className="video-icon"><i className="fa-solid fa-play"></i></div>}
                                                </div>
                                            </div>
                                            <div className="col-sm-8 col-7">
                                                <div className="Desc">
                                                    <h3 className="catTitle">{nc.CategoryName}</h3>
                                                    {nc.ContentSubHeading == null ? (
                                                        <h3 className="Title BGTitle">{nc.DetailsHeading}</h3>
                                                    ) : (
                                                        <h3 className="Title BGTitle">
                                                            <span className="subHeading">{nc.ContentSubHeading + " / "}</span> {nc.DetailsHeading}
                                                        </h3>
                                                    )}
                                                    <div className="Brief">
                                                        <p>{nc.ContentBrief}</p>
                                                    </div>
                                                </div>
                                                <p className="pDate">{formatDateToBengali24(nc.created_at)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {showMore &&
                    <div id="btnDiv" className="text-center mt-3 mb-4">
                        <button onClick={toggleButtonState} id="ajax-more-btn" className="btn btn-lg btn-block ButtonBG">আরো খবর...{isLoading === true &&
                            <img src={process.env.REACT_APP_FONT_DOMAIN_URL + "media/common/loading.gif"} alt="loading" title='loading' fetchpriority="high" style={{ width: '28px', marginLeft: '12px' }} />
                        }</button>
                    </div>}
            </div>



        </main>
    )
}
