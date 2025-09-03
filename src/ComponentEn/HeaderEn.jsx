import { getDate, getMonth, getYear } from 'bangla-calendar';

import moment from "moment";

import { Link, useNavigate } from 'react-router-dom';


// import Logo from '../assets/media/common/logo.jpg';
import Logo from "../assets/media/common/logo.png"
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { scrollTop } from '../Components/AllFunctions';
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

export default function HeaderEn() {
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
    navigate('/english/search/' + txt)
    window.location.href = '/english/search/' + txt
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
                    <a href="/english"><img className="img-fluid img100" src={Logo}
                      alt="DeshkalNews.com :: দেশকালনিউজ.কম" title="DeshkalNews.com :: দেশকালনিউজ.কম" style={{width: "300px", height:"35px"}} /></a>
                  </div>
                </div>
                <div className="col-3 col-md-6 d-flex align-items-center justify-content-end">
                  <div className="header-top-right">
                    <div className="DSocialLink">
                      <ul>
                        <li><a href="https://www.facebook.com/DeshkalNews24/" target="_blank" aria-label="fb"><i className="fa-brands fa-facebook-f"></i></a>
                        </li>
                        <li><a href="https://x.com/Deshkalnews/" target="_blank" aria-label="twitter"><FaXTwitter /></a>
                        </li>
                        <li><a href="https://linkedin.com/company/deshkal-news/" target="_blank" aria-label="linkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                        </li>
                        <li><a href="https://www.youtube.com/@DeshkalNews24/" target="_blank" aria-label="youTube"><i className="fa-brands fa-youtube"></i></a>
                        </li>
                        <li><a href="http://instagram.com/deshkalnews" target="_blank" aria-label="instragram"><i className="fa-brands fa-instagram"></i></a>
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
                            <i className="fas fa-calendar-alt"></i> &nbsp;{currentDay}, {currentDate}</p>
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
                            {/* <!-- <div className="search">
                                            <i className="fa fa-search"></i>
                                            <input type="text" className="form-control" placeholder="search here">
                                            <button className="btn btn-primary">Search</button>
                                        </div> --> */}
                            <button type="button" className="btn-close text-reset"
                              data-bs-dismiss="offcanvas" aria-label="Close"><i
                                className="fas fa-times"></i></button>
                          </div>
                          <div className="offcanvas-body">
                            <ul className="navbar-nav ">
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/news/bangladesh">Bangladesh
                              </a>
                              </li>
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/news/government">Government
                              </a>
                              </li>
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/news/election">Election
                              </a>
                              </li>
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/news/crime">
                                Crime</a>
                              </li>
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/news/law-and-justice">Law and Justice</a>
                              </li>
                              {/* <li className="nav-item"><a className="nav-link" target="_self" aria-label=""
                                href="/english/bangladesh/city">City</a>
                              </li>
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/bangladesh/accident">Accident</a>
                              </li>
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/bangladesh/district-news">District News

                              </a>
                              </li> */}
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/world"> World
                              </a> </li>
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/sports"> Sports
                              </a> </li>
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/business/economy"> Economy
                              </a> </li>
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/business">Business
                              </a> </li>
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/business/stock-market"> Stock Market
                              </a> </li>
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/business/banking">Banking
                              </a> </li>
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/business/consumer-market">Consumer Market</a>
                              </li>
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/business/trade-and-investment">Trade & Investment</a>
                              </li>
                              {/* <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/business/export-and-import">Export and Import </a>
                              </li> */}
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/entertainment">
                                Entertainment
                              </a> </li>
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/entertainment/art-and-literature">Art & Literature
                              </a> </li>
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/opinion">Opinion
                              </a> </li>
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/opinion/interview">Interview
                              </a> </li>
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/climate">Climate
                              </a> </li>
                              {/* <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/agriculture">Agriculture
                              </a> </li> */}
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/agro">Agro
                              </a> </li>
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/science-and-tech">Science & Tech
                              </a>
                              </li>
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/health"> Health
                              </a>
                              </li>
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/faith-and-religion">Faith and Religion
                              </a>
                              </li>
                              <li className="nav-item"><a className="nav-link" target="_self" aria-label="" href="/english/weather-and-enviroment">Weather & Environment
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
                        <a className="nav-link nav-link-search" href="/english">
                          <i className="fa-solid fa-house"></i>
                        </a>
                      </div>
                    </div>
                    <a href="/english" className="StickyLogo" rel="home">
                      <img src={Logo} title="DeshkalNews.com"
                        alt="DeshkalNews.com" className="img-fluid img100" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                      data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                      aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav ">
                        <li className="nav-item dropdown">
                          <Link onClick={scrollTop} to="/english/news" className="nav-link dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">News</Link>
                          <ul className="dropdown-menu">
                            <li><Link onClick={scrollTop} className="dropdown-item" to="/english/news/bangladesh">Bangladesh</Link></li>
                            <li><Link onClick={scrollTop} className="dropdown-item" to="/english/news/national">National</Link></li>
                            <li><Link onClick={scrollTop} className="dropdown-item" to="/english/news/crime">Crime</Link></li>
                            <li><Link onClick={scrollTop} className="dropdown-item" to="/english/news/law-and-justice">Law and Justice</Link></li>
                            <li><Link onClick={scrollTop} className="dropdown-item" to="/english/news/capital-affairs ">Capital Affairs</Link></li>
                            <li><Link onClick={scrollTop} className="dropdown-item" to="/english/news/education">Education</Link></li>
                            <li><Link onClick={scrollTop} className="dropdown-item" to="/english/news/local-coverage">Local Coverage</Link></li>
                            <li><Link onClick={scrollTop} className="dropdown-item" to="/english/news/election">Election</Link></li>
                            <li><Link onClick={scrollTop} className="dropdown-item" to="/english/news/spacial-report">Special Report</Link></li>


                            {/* <li><Link onClick={scrollTop} className="dropdown-item" to="/english/bangladesh/government">Government</Link></li>
                            <li><Link onClick={scrollTop} className="dropdown-item" to="/english/bangladesh/politics">Politics</Link></li>
                            <li><Link onClick={scrollTop} className="dropdown-item" to="/english/bangladesh/accident">Accident</Link></li>
                            <li><Link onClick={scrollTop} className="dropdown-item" to="/english/bangladesh/district-news">District News</Link></li>
                            <li><Link onClick={scrollTop} className="dropdown-item" to="/english/bangladesh/city">City</Link></li> */}

                          </ul>
                        </li>
                        {/* <li className="nav-item"><Link className="nav-link" to="/english/special-report" onClick={scrollTop}>Special Report </Link></li> */}
                        <li className="nav-item"><Link className="nav-link" to="/english/politics" onClick={scrollTop}>Politics</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/english/foreign-affairs" onClick={scrollTop}>Foreign Affairs</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/english/world" onClick={scrollTop}>World</Link></li>
                        <li className="nav-item dropdown">
                          <Link onClick={scrollTop} to="/english/business" className="nav-link dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">Business</Link>
                          <ul className="dropdown-menu">
                            <li><Link onClick={scrollTop} className="dropdown-item" to="/english/business/economy">Economy</Link></li>
                            <li><Link onClick={scrollTop} className="dropdown-item" to="/english/business/budget">Budget </Link></li>
                            <li><Link onClick={scrollTop} className="dropdown-item" to="/english/business/stock-market">Stock Market</Link></li>
                            <li><Link onClick={scrollTop} className="dropdown-item" to="/english/business/banking">Banking</Link></li>
                            <li><Link onClick={scrollTop} className="dropdown-item" to="/english/business/consumer-market">Consumer Market</Link></li>
                            <li><Link onClick={scrollTop} className="dropdown-item" to="/english/business/trade-and-investment">Trade & Investment</Link></li>
                          </ul>
                        </li>
                        <li className="nav-item"><Link className="nav-link" to="/english/sports" onClick={scrollTop}>Sports </Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/english/entertainment" onClick={scrollTop}>Entertainment </Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/english/feature" onClick={scrollTop}>Feature </Link></li>



                        {/* <li className="nav-item dropdown">
                          <Link onClick={scrollTop} to="/english/entertainment" className="nav-link dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">Entertainment</Link>
                          <ul className="dropdown-menu">
                            <li><Link onClick={scrollTop} className="dropdown-item" to="/english/entertainment/arts-and-culture">Arts and Culture</Link></li>
                          </ul>
                        </li> */}
                        {/* <li className="nav-item dropdown">
                          <Link onClick={scrollTop} to="/english/opinion" className="nav-link dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">Opinion</Link>
                          <ul className="dropdown-menu">
                            <li><Link onClick={scrollTop} className="dropdown-item" to="/english/opinion/interview">Interview</Link></li>
                          </ul>
                        </li> */}

                        {/* 
                        <li className="nav-item"><Link className="nav-link" to="/english/lifestyle" onClick={scrollTop}>Lifestyle </Link></li> */}

                        {/* <li className="nav-item"><Link className="nav-link" to="/english/health" onClick={scrollTop}>Health </Link></li> */}


                        <li className="nav-item dropdown has-megamenu">
                          <Link className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown">More
                          </Link>
                          <div className="dropdown-menu megamenu" role="menu">
                            <div className="row w-100 ">
                              <div className="col-md-3" style={{ flex: '0 0 20%', maxWidth: "20%" }}>
                                <ul className="nav flex-column">
                                  <li><Link className="dropdown-item" to="/english/health" onClick={scrollTop}>Health</Link></li>
                                  <li><Link className="dropdown-item" to="/english/science-and-tech" onClick={scrollTop}>Science & Tech</Link></li>



                                </ul>
                              </div>

                              <div className="col-md-3" style={{ flex: '0 0 20%', maxWidth: "20%" }}>
                                <ul className="nav flex-column">
                                  <li><Link className="dropdown-item" to="/english/weather-and-enviroment" onClick={scrollTop}>Weather & Environment</Link></li>
                                  <li><Link className="dropdown-item" to="/english/faith-and-religion" onClick={scrollTop}>Faith and Religion</Link></li>
                                  {/* <li><Link className="dropdown-item" to="/english/agriculture" onClick={scrollTop}>Agriculture</Link></li> */}



                                </ul>
                              </div>
                              <div className="col-md-3" style={{ flex: '0 0 20%', maxWidth: "20%" }}>
                                <ul className="nav flex-column">

                                  <li ><Link className="dropdown-item" to="/english/migrant" onClick={scrollTop}>Migrant </Link></li>

                                  <li><Link className="dropdown-item" to="/english/agro" onClick={scrollTop}>Agro </Link></li>

                                </ul>
                              </div>
                              <div className="col-md-3" style={{ flex: '0 0 20%', maxWidth: "20%" }}>
                                <ul className="nav flex-column">
                                  <li ><Link className="dropdown-item" to="/english/media-affairs" onClick={scrollTop}>Media Affairs </Link></li>
                                  <li><Link className="dropdown-item" to="/english/opinion/interview" onClick={scrollTop}>Interview </Link></li>

                                </ul>
                              </div>
                              <div className="col-md-3" style={{ flex: '0 0 20%', maxWidth: "20%" }}>
                                <ul className="nav flex-column">
                                  <li><Link className="dropdown-item" to="/english/entertainment/art-and-literature" onClick={scrollTop}>Art & Literature</Link></li>
                                  <li><Link className="dropdown-item" to="/english/opinion " onClick={scrollTop}>Opinion  </Link></li>

                                </ul>
                              </div>
                              <div className="col-md-3" style={{ flex: '0 0 20%', maxWidth: "20%" }}>
                                <ul className="nav flex-column">
                                  <li><Link className="dropdown-item" to="/english/lifestyle " onClick={scrollTop}>Lifestyle  </Link></li>

                                </ul>
                              </div>
                              <div className="col-md-3" style={{ flex: '0 0 20%', maxWidth: "20%" }}>
                                <ul className="nav flex-column">

                                  <li><Link className="dropdown-item" to="/english/archives" onClick={scrollTop}>Archives</Link></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="nav-item hide"><Link className="nav-link" to="/english/latest" onClick={scrollTop}>All News</Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="menu-right header-meta-link">
                    <ul>
                      <li className="menu-right-item"><Link to="/english/photo" onClick={scrollTop}><i className="fa-solid fa-camera"></i>
                        Photo</Link></li>
                      <li className="menu-right-item bn"><Link to="/" onClick={scrollTop}><i className="fa-solid fa-globe"></i>
                        বাংলা</Link></li>
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
                                    <input type="text" name="q" id="search" className="form-control" placeholder="Search Here... " />
                                    <button className='searchBtn' type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                                    <a onClick={setToggle} className="close-search " aria-label="close search"><i className="fa-solid fa-xmark"></i></a>
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
