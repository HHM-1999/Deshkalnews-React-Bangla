import axios from 'axios'
import { useEffect, useState } from 'react'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router-dom'
import demoProfile from '../assets/media/common/profiledemo.jpg'
import { ForLazyLoaderImg, scrollTop } from './AllFunctions'

var lazyloaded = false
export default function Staff() {
    const [state, setState] = useState([])
    const [state2, setState2] = useState([])
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}team-members`)
            .then(({ data }) => {
                if (data.length > 0) {
                    // console.log(data + "hello")
                    setState(data[0]);
                    setState2(data.slice(1));
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    }, [])

    return (
        <>
            <div className="container">
                <DocumentTitle title="স্টাফ :: দেশকালনিউজ" />
                <section className='about-us-sec'>
                    <div className="SectionTitle"><h1><span className="ColorBox"></span>স্টাফ</h1></div>
                    <div className="about-us-area2">
                        <Link rel="preload" as="image" to='/' key={state.id} onClick={scrollTop}>
                            <div className="about-img">
                                {state.image ?
                                    <img src={process.env.REACT_APP_DOMAIN_URL + state.image} alt={state.name} title={state.name} fetchpriority="high" className="img-fluid  " /> :
                                    <img src={demoProfile} alt={state.name} title={state.name} fetchpriority="high" className="img-fluid  " />
                                }

                            </div>
                            <div className="about-us-desc">
                                <h3 className="Title">{state.name}</h3>
                                <p className='design'>{state.designation}</p>
                                {/* <p className='design'>Employee Id : {state.employee_id}  </p> */}
                            </div>

                        </Link>

                    </div>
                    <div className="row">
                        {state2.map((nc) => {
                            return (
                                <div className="col-lg-3 col-sm-12">
                                    <div className="about-us-area">
                                        <Link to='/' key={nc.id} onClick={scrollTop} >
                                            <div className="about-img">
                                                {nc.image ?
                                                    <img src={process.env.REACT_APP_DOMAIN_URL + nc.image} alt={nc.name} title={nc.name} fetchpriority="high" className="img-fluid " /> :
                                                    <img src={demoProfile} alt={nc.name} title={nc.name} fetchpriority="high" className="img-fluid " />
                                                }

                                            </div>
                                            <div className="about-us-desc">
                                                <h3 className="Title">{nc.name}</h3>
                                                <p className='design'>{nc.designation}</p>

                                            </div>

                                        </Link>

                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>

            </div>

        </>

    )
}
