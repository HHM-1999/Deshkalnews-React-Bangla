import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import { scrollTop } from './AllFunctions'
import { toBengaliNumber } from 'bengali-number'

var PollID = 0
export default function OnlinePollDetails() {
    const [poll, setPoll] = useState([])
    const [pollResult, setPollResult] = useState([])

    useEffect(() => {
        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        axios
            .get(`${process.env.REACT_APP_API_URL}poll-result`)
            .then(({ data }) => {
                if (data.poll_result) {
                    setPollResult(data.poll_result)
                   	 


                }
            })
        axios
            .get(`${process.env.REACT_APP_API_URL}latest-poll`)
            .then(({ data }) => {
                if (data.poll_latest.length > 0) {
                    setPoll(data.poll_latest);
                    PollID = data.poll_latest[0].PollID
                    
                }
            });
        // const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        // return () => clearTimeout(timer);
    }, [])

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
                    <h2 className="DTitle"><Link to="/pollresult" onClick={scrollTop}><span className="DTitleInner"><span className="DTitleInnerBar"><span>অনলাইন জরিপ</span></span></span></Link></h2>

                    <div className="row mt-5">
                        <div className="col-lg-8 col-sm-12 border-right-inner1">
                            <div className="row">
                                {/* <div className="col-sm-12">

                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '70%' }}>প্রশ্ন</th>
                                            <th>হ্যাঁ</th>
                                            <th>না</th>
                                            <th>মন্তব্য নেই</th>
                                        </tr>
                                    </thead>
                                    {pollResult.map((nc, i) => {
                                        return (
                                            <React.Fragment key={pollResult.PollID}>
                                                <tbody>
                                                    <tr>
                                                        <td>{pollResult.QuestionBn}</td>
                                                        <td>{toBengaliNumber(pollResult.Yes)}</td>
                                                        <td>{toBengaliNumber(pollResult.No)}</td>
                                                        <td>{toBengaliNumber(pollResult.NoComments)}</td>
                                                    </tr>
                                                </tbody>
                                            </React.Fragment>
                                        )
                                    })}
                                </table>
                            </div> */}


                                {/* <div className="col-lg-6  col-sm-12">
                                    {poll.map((nc) => {
                                        return (
                                            <React.Fragment key={nc.PollID} >
                                                <div id="opinion-submit-msg" className="opinion-submit-msg" style={{ display: 'none' }}><h4>আপনার মতামত জমা দেওয়া হয়েছে</h4></div>

                                                <div className="Imgresize">
                                                    <figure className="ImgViewer">
                                                        <picture className="FixingRatio">
                                                            {nc.image == null ?
                                                                <img src={process.env.REACT_APP_LAZYL_IMG} alt={nc.QuestionBn} title={nc.QuestionBn} className="img-fluid img100 ImgRatio" /> :
                                                                <img src={process.env.REACT_APP_DOMAIN_URL + nc.image} alt={nc.QuestionBn} title={nc.QuestionBn} className="img-fluid img100 ImgRatio" />
                                                            }

                                                        </picture>
                                                    </figure>
                                                </div>
                                                <div className="Question" key={nc.PollID}>
                                                    <h3>{nc.QuestionBn}</h3>
                                                    <form onSubmit={resultSubmit}>
                                                        <div className="VoteAnswer">
                                                            <label className="form-check-label" htmlFor="radio1"><input type="radio" id="radio1" className="form-check-input" name="rdoPoll" value="1" />হ্যাঁ</label>

                                                            <label className="form-check-label" htmlFor="radio2"><input type="radio" id="radio2" className="form-check-input" name="rdoPoll" value="2" /> না </label>

                                                            <label className="form-check-label" htmlFor="radio3"><input type="radio" id="radio3" className="form-check-input" name="rdoPoll" value="3" /> মন্তব্য নেই </label>

                                                        </div>
                                                        <div className="VoteSubmit">
                                                            <button type="submit" name="submit" className="btn btn-success mt-3">ভোট দিন</button>
                                                        </div>
                                                        
                                                        <div className="VoteSubmit mb-0">
                                                            <ShareThisPopup key={nc.PollID} title={nc.QuestionBn} url={`${process.env.REACT_APP_FONT_DOMAIN_URL}pollresult/` + (nc.PollID)} elem={nc.PollID} />
                                                            
                                                        </div>
                                                    </form>
                                                </div>



                                            </React.Fragment>
                                        )
                                    })}
                                </div> */}


                                <div className="col-sm-12">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '70%' }}>প্রশ্ন</th>
                                                <th>হ্যাঁ</th>
                                                <th>না</th>
                                                <th>মন্তব্য নেই</th>

                                            </tr>
                                        </thead>
                                        {pollResult.map((nc, i) => {
                                           

                                            return (
                                                <React.Fragment key={nc.PollID}>
                                               
                                                    <tbody>
                                                        <tr>
                                                            <td>{nc.QuestionBn}</td>
                                                            <td>{toBengaliNumber(((nc.Yes) / Math.round((nc.Yes)+(nc.No)+(nc.NoComments))*100).toFixed(2) || 0)} %</td>
                                                            <td>{toBengaliNumber(((nc.No) / ((nc.Yes)+(nc.No)+(nc.NoComments))*100).toFixed(2) || 0)}%</td>
                                                            <td>{toBengaliNumber(((nc.NoComments) / ((nc.Yes)+(nc.No)+(nc.NoComments))*100).toFixed(2) || 0)}%</td>

                                                        </tr>
                                                    </tbody>
                                                </React.Fragment>
                                            )
                                        })}
                                    </table>
                                </div>




                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12 mb-5">
                            {/* <LatestPopularNews /> */}
                            {/* <LeadLatestNews /> */}
                        </div>
                    </div>
                </div>
            </div>

        </main >
    )
}
