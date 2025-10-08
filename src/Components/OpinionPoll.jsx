import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import { scrollTop } from './AllFunctions'
// import LeadLatestNews from './HomeContent/LeadLatestNews'
import ShareThisPopup from './ShareThisPopup'

// var PollID = 0
export default function OpinionPoll() {
    let { PollID } = useParams();
    const [poll, setPoll] = useState([])


    useEffect(() => {
        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        axios
            .get(`${process.env.REACT_APP_API_URL}current-poll-result/${PollID}`)
            .then(({ data }) => {
                if (data.data.details) {
                    setPoll(data.data.details);


                }
            });
        // const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        // return () => clearTimeout(timer);
    }, [PollID])

    const resultSubmit = (e) => {
        e.preventDefault()
        var PollValue = parseInt(e.target.rdoPoll.value);
        var formData = { 'pollID': PollID, 'PollValue': PollValue }
        // console.log(formData)
        axios
            .post(`${process.env.REACT_APP_API_URL}poll-update`, formData)
            .then(({ data }) => {
                document.getElementById("opinion-submit-msg").style.display = "block";
                e.target.submit.disabled = true;
            });
    }





    return (
        <main>
            <div className="DOnlineVote2">
                <div className="container">
                    <div className="TopHomeSection"></div>
                    <DocumentTitle title='দেশকালনিউজ :: অনলাইন জরিপ' />
                    <div className="DTitle"><Link to="/pollresult" onClick={scrollTop}><div className="DTitleInner"><h1 className="DTitleInnerBar">অনলাইন জরিপ</h1></div></Link></div>

                    <div className="row mt-5">
                        <div className="col-md-4 offset-md-2 col-sm-12 border-right-inner1">
                            <div className="row">

                                <div className="col-md-12  col-sm-12">
                                    {poll ?

                                        <React.Fragment key={poll.PollID} >
                                            <div id="opinion-submit-msg" className="opinion-submit-msg" style={{ display: 'none' }}><h4>আপনার মতামত জমা দেওয়া হয়েছে</h4></div>

                                            <div className="Imgresize">
                                                <figure className="ImgViewer">
                                                    <picture className="FixingRatio">
                                                        {poll.image == null ?
                                                            <img src={process.env.REACT_APP_LAZYL_IMG} alt={poll.QuestionBn} title={poll.QuestionBn} className="img-fluid img100 ImgRatio" /> :
                                                            <img src={process.env.REACT_APP_DOMAIN_URL + poll.image} alt={poll.QuestionBn} title={poll.QuestionBn} className="img-fluid img100 ImgRatio" />
                                                        }

                                                    </picture>
                                                </figure>
                                            </div>
                                            <div className="Question" key={poll.PollID}>
                                                <h3>{poll.QuestionBn}</h3>
                                                <form onSubmit={resultSubmit}>
                                                    <div className="VoteAnswer">
                                                        <label className="form-check-label" htmlFor="radio1"><input type="radio" id="radio1" className="form-check-input" name="rdoPoll" value="1" />হ্যাঁ</label>

                                                        <label className="form-check-label" htmlFor="radio2"><input type="radio" id="radio2" className="form-check-input" name="rdoPoll" value="2" /> না </label>

                                                        <label className="form-check-label" htmlFor="radio3"><input type="radio" id="radio3" className="form-check-input" name="rdoPoll" value="3" /> মন্তব্য নেই </label>

                                                    </div>
                                                    <div className="VoteSubmit">
                                                        <button type="submit" name="submit" className="btn btn-success mt-2">ভোট দিন</button>
                                                    </div>
                                                    {/* <div className="VoteSubmit">
                                                    <Link to="/pollresult" className="btn btn-success" onClick={scrollTop}>পুরোনো ফলাফল</Link>
                                                </div> */}

                                                    {/* <ShareThisPopup key={poll.PollID} title={poll.QuestionBn} url={`${process.env.REACT_APP_FONT_DOMAIN_URL}opinion-poll/` + (poll.PollID)} elem={poll.PollID} /> */}
                                                    {/* <div className="VoteSubmit">
                                                        <DSocialShare title={poll.QuestionBn} contentID={poll.PollID} />
                                                    </div> */}
                                                    <div className="VoteSubmit mb-0">
                                                        <ShareThisPopup key={poll.PollID} title={poll.QuestionBn} url={`${process.env.REACT_APP_FONT_DOMAIN_URL}opinion-poll/` + (poll.PollID)} elem={poll.PollID} />

                                                    </div>


                                                </form>
                                            </div>



                                        </React.Fragment>

                                        : ' '}
                                </div>







                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12 mb-5">
                            {/* <LatestPopularNews /> */}
                            {/* <LeadLatestNews /> */}
                        </div>
                    </div>
                </div>
            </div>

        </main >
    )
}
