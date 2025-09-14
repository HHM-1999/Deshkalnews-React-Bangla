import { getDate, getMonth, getYear } from 'bangla-calendar';
import { banglaDateConvetar, scrollTop } from "./AllFunctions";
import moment from "moment";

import { Link, useNavigate } from 'react-router-dom';
// import Logo from '../assets/media/common/logo.jpg';
import Logo from '../assets/media/common/logo.png'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { FaXTwitter } from 'react-icons/fa6';


const date1 = new Date();
let bnDate = getDate(date1, { format: 'D' })
let bnMonth = getMonth(date1, { format: 'MMMM' })
let bnYear = getYear(date1, { format: 'YYYY' })
let BNDATEs = bnDate + ' ' + bnMonth + ' ' + bnYear
const currentDate = moment().format('DD MMMM YYYY')
const currentDay = moment().format('dddd')

var todaysDate = new Date();
todaysDate.setDate(todaysDate.getDate() - 1);

export default function Header() {
    const useToggle = (initialState) => {
        const [toggleValue, setToggleValue] = useState(initialState);

        const toggler = () => { setToggleValue(!toggleValue) };
        return [toggleValue, toggler]
    };
    const [toggle, setToggle] = useToggle();
    let navigate = useNavigate();

    const handelSubmit = (e) => {
        e.preventDefault();
        const txt = e.target.q.value;
        navigate('/search/' + txt)
        window.location.href = '/search/' + txt
        window.location.hash = txt
    }
    const navbarRef = useRef(null);

    useEffect(() => {
        const navbar = navbarRef.current;
        const sticky = navbar.offsetTop;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > sticky) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        });

        return () => {
            window.removeEventListener('scroll', () => { });
        };
    }, []);
    return (
        <>
            <header>
                <div className="DHeaderTop2 MobileHide">
                    <div className="container">
                        <div className="DLogoArea">
                            <div className="row">
                                <div className="col-12 col-md-6 d-flex align-items-start justify-content-start">
                                    <div className="DLogo">
                                        <a rel="preload" as="image" href="/"><img className="img-fluid img100" src={Logo}
                                            alt="DeshkalNews.com :: দেশকালনিউজ.কম" title="DeshkalNews.com :: দেশকালনিউজ.কম" style={{width: "300px", height:"35px"}} /></a>
                                    </div>
                                </div>
                                <div className="col-3 col-md-6 d-flex align-items-center justify-content-end">
                                    <div className="header-top-right">
                                        <div className="DSocialLink">
                                            <ul>
                                                <li><a href="https://www.facebook.com/DeshkalNews24/" target="_blank" rel="noreferrer" aria-label="fb"><i className="fa-brands fa-facebook-f"></i></a>
                                                </li>
                                                <li><a href="https://x.com/Deshkalnews/" target="_blank" rel="noreferrer" aria-label="twitter"><FaXTwitter /></a>
                                                </li>
                                                <li><a href="https://linkedin.com/company/deshkal-news/" target="_blank" rel="noreferrer" aria-label="linkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                                                </li>
                                                <li><a href="https://www.youtube.com/@DeshkalNews24/" target="_blank" rel="noreferrer" aria-label="youTube"><i className="fa-brands fa-youtube"></i></a>
                                                </li>
                                                <li><a href="http://instagram.com/deshkalnews" target="_blank" rel="noreferrer" aria-label="instragram"><i className="fa-brands fa-instagram"></i></a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="DateTime d-flex align-items-center ">
                                            <div className="header-topBar">
                                                <div className="DateTimeBn d-flex">
                                                    {/* <p className="date"><i className="fas fa-calendar-alt"></i>
                                            <?php echo fEn2Bn($dtDay);?>, <?php echo fEn2Bn($dtDateTime); ?></p>
                                        <p className="date2"> <samp>|</samp> <?php echo $dtDateBN; ?></p> */}
                                                    <p className="date">
                                                        <i className="fas fa-calendar-alt"></i>  &nbsp;{banglaDateConvetar(currentDay)}, {banglaDateConvetar(currentDate)} | {BNDATEs}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div ref={navbarRef} id="myHeader" className="MobileHide">
                        <div className="DHeaderNav">
                            <div className="container">
                                <nav className="navbar navbar-expand-lg navbar-light">
                                    <div className="menu-left">
                                        <div className="StickySideMenu">
                                            <div className="toggle-menu">
                                                <button className="btn btnName" type="button" data-bs-toggle="offcanvas"
                                                    data-bs-target="#offcanvasWithBothOptions"
                                                    aria-controls="offcanvasWithBothOptions"><i className="fas fa-bars"></i></button>
                                                <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1"
                                                    id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                                                    <div className="offcanvas-header">
                                                        <button type="button" className="btn-close text-reset"
                                                            data-bs-dismiss="offcanvas" aria-label="Close"><i
                                                                className="fas fa-times"></i></button>
                                                    </div>
                                                    <div className="offcanvas-body">
                                                        <ul className="navbar-nav">
                                                            <li className="nav-item hide"><a className="nav-link" target="_self" aria-label="" href="/latest">সব খবর
                                                            </a>
                                                            </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/national">জাতীয়
                                                            </a>
                                                            </li>

                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/politics">রাজনীতি
                                                            </a>
                                                            </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/country">
                                                                দেশজুড়ে</a>
                                                            </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/special-report">বিশেষ
                                                                প্রতিবেদন</a>
                                                            </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/international">আন্তর্জাতিক</a>
                                                            </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/finance-and-trade">অর্থ ও
                                                                বাণিজ্য</a>
                                                            </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/court-of-law">আইন-আদালত
                                                            </a>
                                                            </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/sports"> খেলাধুলা
                                                            </a></li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/opinion"> মতামত
                                                            </a> </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/entertainment"> বিনোদন
                                                            </a> </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/dhaka">ঢাকা
                                                            </a> </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/education"> শিক্ষা
                                                            </a> </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/technology">বিজ্ঞান-প্রযুক্তি
                                                            </a> </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/crime">অপরাধ </a>
                                                            </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/feature">ফিচার </a>
                                                            </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/literature">
                                                                সাহিত্য
                                                            </a> </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/today-in-dhaka">ঢাকায় আজ
                                                            </a> </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/interview">সাক্ষাৎকার
                                                            </a> </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/jobs">চাকরির খবর
                                                            </a> </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/probash">প্রবাস
                                                            </a> </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/health">স্বাস্থ্য
                                                            </a> </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/mass-media">গণমাধ্যম
                                                            </a>
                                                            </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/religion-and-life"> ধর্ম ও
                                                                জীবন
                                                            </a>
                                                            </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/horoscope">রাশিফল
                                                            </a>
                                                            </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/agriculture">কৃষি ও সেবা
                                                            </a>
                                                            </li>
                                                            {/* <li className="nav-item"><a className="nav-link" onClick={scrollTop} to="#">অপরাধ
                                                            </a>
                                                            </li> */}
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/environment">পরিবেশ-প্রতিবেশ
                                                            </a>
                                                            </li>
                                                            {/* <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/cartoon">কার্টুন
                                                            </a>
                                                            </li> */}
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/photo">ফটো গ্যালারি
                                                            </a>
                                                            </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/women">নারী
                                                            </a>
                                                            </li>
                                                            {/* <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/patriot">দেশহিতৈষী
                                                            </a>
                                                            </li> */}
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/artist">শিল্পজন
                                                            </a>
                                                            </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/lifestyle">লাইফস্টাইল
                                                            </a>
                                                            </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/event">ইভেন্ট
                                                            </a>
                                                            </li>
                                                            <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/archives">আর্কাইভ
                                                            </a>
                                                            </li>

                                                        </ul>
                                                        <form className="d-flex">
                                                            <input className="form-control me-2" type="search" placeholder="Search"
                                                                aria-label="Search" />
                                                            <button className="btn btn-outline-success" type="submit">Search</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="nav-item homeBtn">
                                                <a className="nav-link nav-link-search" href="/">
                                                    <i className="fa-solid fa-house"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <a href="/" className="StickyLogo" rel="home">
                                            <img src={Logo} title="DeshkalNews.com"
                                                alt="DeshkalNews.com" className="img-fluid img100" />
                                        </a>
                                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                            aria-expanded="false" aria-label="Toggle navigation">
                                            <span className="navbar-toggler-icon"></span>
                                        </button>
                                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                            <ul className="navbar-nav justify-content-center">
                                                <li className="nav-item"><Link className="nav-link" to="/national" onClick={scrollTop}>জাতীয় </Link></li>
                                                <li className="nav-item"><Link className="nav-link" to="/politics" onClick={scrollTop}>রাজনীতি </Link></li>
                                                <li className="nav-item"><Link className="nav-link" to="/country" onClick={scrollTop}>দেশজুড়ে
                                                </Link></li>
                                                {/* <li className="nav-item"><Link className="nav-link" to="/special-report" onClick={scrollTop}>বিশেষ প্রতিবেদন</Link>
                                                </li> */}
                                                <li className="nav-item"><Link className="nav-link" to="/international" onClick={scrollTop}>আন্তর্জাতিক</Link></li>
                                                {/* <li className="nav-item"><Link className="nav-link" to="/finance-and-trade" onClick={scrollTop}>অর্থ ও বাণিজ্য</Link></li> */}
                                                <li className="nav-item"><Link className="nav-link" to="/sports" onClick={scrollTop}>খেলাধুলা</Link></li>
                                                <li className="nav-item"><Link className="nav-link" to="/entertainment" onClick={scrollTop}>বিনোদন</Link></li>
                                                <li className="nav-item"><Link className="nav-link" to="/feature" onClick={scrollTop}>ফিচার</Link></li>
                                                <li className="nav-item dropdown has-megamenu">
                                                    <Link className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown">অন্যান্য
                                                    </Link>
                                                    <div className="dropdown-menu megamenu" role="menu">
                                                        <div className="row w-100 ">
                                                            <div className="col-md-3" style={{ flex: '0 0 20%', maxWidth: "20%" }}>
                                                                <ul className="nav flex-column">
                                                                    <li><Link className="dropdown-item" to="/court-of-law" onClick={scrollTop}> আইন-আদালত</Link></li>
                                                                    <li><Link className="dropdown-item" to="/opinion" onClick={scrollTop}>মতামত</Link></li>
                                                                    <li><Link className="dropdown-item" to="/dhaka" onClick={scrollTop}>ঢাকা</Link></li>
                                                                    <li><Link className="dropdown-item" to="/religion-and-life" onClick={scrollTop}>ধর্ম ও জীবন</Link></li>
                                                                    {/* <li><Link className="dropdown-item" to="/cartoon" onClick={scrollTop}>কার্টুন</Link></li> */}
                                                                    <li><Link className="dropdown-item" to="/lifestyle" onClick={scrollTop}>লাইফস্টাইল</Link></li>
                                                                    
                                                                </ul>
                                                            </div>
                                                            <div className="col-md-3" style={{ flex: '0 0 20%', maxWidth: "20%" }}>
                                                                <ul className="nav flex-column">
                                                                   
                                                                    <li><Link className="dropdown-item" to="/education" onClick={scrollTop}>শিক্ষা</Link></li>
                                                                    <li><Link className="dropdown-item" to="/technology" onClick={scrollTop}>বিজ্ঞান-প্রযুক্তি</Link></li>
                                                                    <li><Link className="dropdown-item" to="/interview" onClick={scrollTop}>সাক্ষাৎকার</Link></li>
                                                                    <li><Link className="dropdown-item" to="/horoscope" onClick={scrollTop}>রাশিফল</Link></li>
                                                                    <li><Link className="dropdown-item" to="/photo" onClick={scrollTop}>ফটো গ্যালারি</Link></li>

                                                                </ul>
                                                            </div>
                                                            <div className="col-md-3" style={{ flex: '0 0 20%', maxWidth: "20%" }}>
                                                                <ul className="nav flex-column">
                                                                    <li><Link className="dropdown-item" to="/finance-and-trade" onClick={scrollTop}>অর্থ ও বাণিজ্য</Link></li>
                                                                    {/* <li><Link className="dropdown-item" to="/feature" onClick={scrollTop}>ফিচার</Link></li> */}
                                                                    <li><Link className="dropdown-item" to="/literature" onClick={scrollTop}>সাহিত্য</Link></li>
                                                                    <li><Link className="dropdown-item" to="/today-in-dhaka" onClick={scrollTop}>ঢাকায় আজ</Link></li>
                                                                    <li><Link className="dropdown-item" to="/agriculture" onClick={scrollTop}>কৃষি ও সেবা</Link></li>
                                                                    <li><Link className="dropdown-item" to="/women" onClick={scrollTop}>নারী</Link></li>
                                                                    
                                                                </ul>
                                                            </div>
                                                            <div className="col-md-3" style={{ flex: '0 0 20%', maxWidth: "20%" }}>
                                                                <ul className="nav flex-column">
                                                                    {/* <li><Link className="dropdown-item" to="/patriot" onClick={scrollTop}>দেশহিতৈষী</Link></li> */}
                                                                    <li><Link className="dropdown-item" to="/jobs" onClick={scrollTop}>চাকরির খবর</Link></li>
                                                                    <li><Link className="dropdown-item" to="/probash" onClick={scrollTop}>প্রবাস</Link></li>
                                                                    <li><Link className="dropdown-item" to="/crime" onClick={scrollTop}>অপরাধ</Link></li>
                                                                    <li><Link className="dropdown-item" to="/event" onClick={scrollTop} >ইভেন্ট</Link></li>
                                                                    <li><Link className="dropdown-item" to="/archives" onClick={scrollTop}>আর্কাইভ</Link></li>

                                                                </ul>
                                                            </div>
                                                            <div className="col-md-3" style={{ flex: '0 0 20%', maxWidth: "20%" }}>
                                                                <ul className="nav flex-column">
                                                                    <li><Link className="dropdown-item" to="/artist" onClick={scrollTop}>শিল্পজন </Link>
                                                                    </li>
                                                                    <li><Link className="dropdown-item" to="/health" onClick={scrollTop}>স্বাস্থ্য</Link></li>
                                                                    <li><Link className="dropdown-item" to="/mass-media" onClick={scrollTop}>গণমাধ্যম </Link>
                                                                    </li>
                                                                    <li><Link className="dropdown-item" to="/capital" onClick={scrollTop}>রাজধানী</Link></li>
                                                                    <li><Link className="dropdown-item" to="/environment" onClick={scrollTop} >পরিবেশ-প্রতিবেশ</Link></li>
                                                                </ul>
                                                            </div>
                                                            <div className="col-md-3" style={{ flex: '0 0 20%', maxWidth: "20%" }}>
                                                                <ul className="nav flex-column">




                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="nav-item"><Link className="nav-link" to="/latest" onClick={scrollTop}>সব খবর </Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="menu-right header-meta-link">
                                        <ul>
                                            <li className="menu-right-item hide "><Link to="/latest" onClick={scrollTop}>
                                                সব খবর</Link></li>
                                            <li className="menu-right-item"><Link to="/videos" onClick={scrollTop}><i
                                                className="fa-regular fa-circle-play"></i>ভিডিও</Link></li>
                                            <li className="menu-right-item"><Link to="/photo" onClick={scrollTop}><i className="fa-solid fa-camera"></i>
                                            ফটোগ্যালারি</Link></li>
                                            <li className="menu-right-item en"><Link to={"https://www.deshkalnews.com/"} onClick={scrollTop}><i className="fa-solid fa-globe"></i>
                                                English</Link></li>
                                            <li className="menu-right-item menu-search">
                                                <span className="nav-link nav-link-search" onClick={setToggle}>
                                                    <i className="fa-solid fa-magnifying-glass"></i>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                                {
                                    toggle && (
                                        <div className="search-block-bottom">
                                            <div className="search_block">
                                                <div className="container">
                                                    <div className="col-lg p-0">

                                                        <div className="search_logo display-flex">
                                                            <div className="col-xl">
                                                                <form name="q" action="" onSubmit={handelSubmit}>
                                                                    <div className="search_logo display-flex">
                                                                        <input type="text" name="q" id="search" className="form-control" placeholder="এখানে খুঁজুন... " />
                                                                        <button className='searchBtn' type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                                                                        <a onClick={setToggle} className="close-search " aria-label="close search" href="#"><i className="fa-solid fa-xmark"></i></a>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>

                                                        {/* <form action="" method="get">
                                                    <div className="search_logo display-flex">
                                                        <input type="text" name="title" placeholder="এখানে খুঁজুন..." />
                                                        <button><i className="fa-solid fa-magnifying-glass"></i></button>
                                                        <a href="" className="close-search"><i className="fa-solid fa-xmark"></i></a>
                                                    </div>
                                                </form> */}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                    </div>
                </div>



            </header>


        </>
    );
}
