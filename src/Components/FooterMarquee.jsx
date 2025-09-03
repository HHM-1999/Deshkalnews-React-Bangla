import axios from "axios";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

export default function FooterMarquee() {
    const [breaking, setBreaking] = useState([]);
    const [scroll, setScroll] = useState([]);
    const [hasContent, setHasContent] = useState(false);

    const fetchData = async () => {
        try {
            // First check for breaking news
            const breakingRes = await axios.get(`${process.env.REACT_APP_API_URL}home-json-bn/generateActiveBreaking.json`);
            if (breakingRes.data.length > 0) {
                setBreaking(breakingRes.data);
                setScroll([]); // clear scroll if breaking exists
                setHasContent(true);
                return;
            }

            // If no breaking news, fallback to scroll news
            const scrollRes = await axios.get(`${process.env.REACT_APP_API_URL}home-json-bn/generateActiveScroll.json`);
            if (scrollRes.data.length > 0) {
                setScroll(scrollRes.data);
                setBreaking([]); // clear breaking if scroll exists
                setHasContent(true);
            } else {
                setHasContent(false); // nothing available
            }
        } catch (error) {
            console.error("Error fetching marquee data:", error);
            setHasContent(false);
        }
    };

    useEffect(() => {
        fetchData(); // initial fetch
    }, []);

    if (!hasContent) return null;

    return (
        <div className="container-fluid">
            {breaking.length > 0 ? (
                <div className="DScroll d-print-none">
                    <div className="DScrollSection">
                        <div className="ScrollHeading d-flex justify-content-center">
                            <p>ব্রেকিং নিউজ ::</p>
                        </div>
                        <div className="ScrollSubject">
                            <Marquee delay='0' speed='70' direction="left" pauseOnHover={true} play={true}>
                                {breaking.map((nd) => (
                                    <a key={nd.ScrollID} href={nd.ScrollUrl || ''}>
                                        <span>
                                            <div className="SquareIcon"></div> {nd.BreakingHead}
                                        </span>
                                    </a>
                                ))}
                            </Marquee>
                        </div>
                    </div>
                </div>
            ) : scroll.length > 0 ? (
                <div className="DScroll d-print-none">
                    <div className="DScrollSection">
                        <div className="ScrollHeading d-flex justify-content-center">
                            <p>শীর্ষ সংবাদ ::</p>
                        </div>
                        <div className="ScrollSubject">
                            <Marquee delay='0' speed='60' direction="left" pauseOnHover={true} play={true}>
                                {scroll.map((nd) => (
                                    <div key={nd.ScrollID}>
                                        <a href={nd.ScrollUrl || ''}>
                                            <span>
                                                <div className="SquareIcon"></div> {nd.ScrollHead}
                                            </span>
                                        </a>
                                    </div>
                                ))}
                            </Marquee>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
