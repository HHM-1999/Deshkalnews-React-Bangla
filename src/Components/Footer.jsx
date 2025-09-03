import FooterMarquee from './FooterMarquee';
import { FaXTwitter } from 'react-icons/fa6';
import Logo from "../assets/media/common/logo.png"
import { scrollTop } from './AllFunctions';

const Footer = () => {
    const years = new Date().getFullYear()
    return (
        <>
            <footer style={{ minHeight: "200px"}}>
                <div className="DFooterBg d-print-none">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-12 d-flex align-items-center justify-content-start">
                                <div className="footer-info">
                                    <div className="footer-links">
                                        <div className="DSocialLink">
                                            <ul>
                                                <li><a href="https://www.facebook.com/DeshkalNews24/" target="_blank" aria-label="fb"><i className="fab fa-facebook-f"></i></a>
                                                </li>
                                                <li><a href="https://x.com/Deshkalnews" className='icon' target="_blank" aria-label="twitter"><FaXTwitter /></a></li>
                                                <li><a href="https://www.instagram.com/deshkalnews?igsh=MWJrcmRjdjkwbjRtdw== " target="_blank" aria-label="instragram"><i className="fab fa-instagram"></i></a></li>
                                                <li><a href="https://linkedin.com/company/deshkal-news" target="_blank"><i className="fab fa-linkedin" aria-label="linkedIn"></i></a></li>
                                                <li><a href="https://www.youtube.com/@DeshkalNews24" target="_blank"><i className="fab fa-youtube" aria-label="youTube"></i></a></li>
                                            </ul>
                                        </div>
                                        <div className="more-cat">
                                            {/* <a className="btn" href="/patriot">দেশহিতৈষী</a> */}
                                            <a className="btn" href="/artist">শিল্পজন</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12 d-flex align-items-center justify-content-center">
                                <div className="footerMiddle">
                                    <div className="footer-logo">
                                        <a href="/"> <img src={Logo} alt="DeshKalNews.com"
                                            title="DeshKalNews.com" />
                                        </a>
                                    </div>
                                    <ul className="footer-links">
                                        <li><a href="/about" onClick={scrollTop}>ABOUT</a>
                                        </li>
                                        <li><a href="/staff-member" onClick={scrollTop}>STAFF</a>
                                        </li>
                                        <li><a href="/contact-us" onClick={scrollTop}>CONTACT</a>
                                        </li>
                                        <li><a href="/archives" onClick={scrollTop}>ARCHIVE</a>
                                        </li>
                                        <li><a href="/terms-conditions" onClick={scrollTop}>TERMS</a>
                                        </li>
                                        <li><a href="/privacy-policy" onClick={scrollTop}>POLICY</a>
                                        </li>
                                        <li><a href="/advertise" onClick={scrollTop}>ADVERTISEMENT</a>
                                        </li>
                                    </ul>
                                    <div className="others">
                                        <p>সম্পাদক ও প্রকাশক: ইলিয়াস উদ্দিন পলাশ
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-12 d-flex justify-content-end gx-4 ">
                                <div className="DFooterEpprLink">
                                    <a href="https://epaper.shampratikdeshkal.com/" target="blank" aria-label="" >
                                        <img className="img-fluid img100" src={process.env.REACT_APP_FOOTER_E_PAPER_IMG} alt="shampratikdeshkal.com"
                                            title="shampratikdeshkal.com" />
                                        <p>e-paper</p>
                                    </a>

                                </div>
                                <div className="DFooterEpprLink">
                                    <a href="https://www.deshkalpotrika.com/" target="blank" aria-label="" >
                                        <img className="img-fluid img100" src={process.env.REACT_APP_FOOTER_POTRIKA_IMG} alt="deshkalpotrika.com"
                                            title="deshkalpotrika.com" />
                                        <p>Deshkal Potrika</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="DFooterBottomBg">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 text-center">
                                {/* <p>© ২০২৪ | <a href="#">DeshKal News</a> A Radiant Publications Limited Concern. All Rights
                        Reserved| Developed by<a href="https://www.emythmakers.com" target="_blank"> eMythMakers.com</a>

                    </p> */}
                                <p>&copy; {(years)} | <a href="/">DeshKal News </a> A Radiant Publications Limited Concern. All Rights
                                    Reserved | Developed by <a href="https://www.emythmakers.com/" target="_blank">eMythMakers.com</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <FooterMarquee />
        </>
    );
};

export default Footer;
