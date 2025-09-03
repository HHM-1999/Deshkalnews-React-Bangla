import { Route, Routes } from "react-router-dom";
// import Footer from './Components/Footer'
import Archives from './Components/Archives';
import Category from './Components/Category/Category';
import SubCategory from './Components/Category/SubCategory';
import Details from './Components/DetailsPage/Details';
import ErrorPage from './Components/ErrorPage';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Components/Home';
import DetailsPhotoFeature from './Components/Photo-features/DetailsPhotoFeature';
import PhotoGallery from './Components/Photo-features/PhotoGallery';
import SearchResult from './Components/SearchResult';
import AllTagList from './Components/Tags/AllTagList';
import TagPage from './Components/Tags/TagPage';
import VideoDetails from './Components/Video/VideoDetails';
import VideoGallery from './Components/Video/VideoGallery';
import AllWriters from './Components/Writers/AllWriters';
import WritersPage from './Components/Writers/WritersPage';
// import OnlinePollDetails from './Components/OnlinePollDetails'
// import OpinionPoll from './Components/OpinionPoll'
import About from './Components/About';
import AdvertisementPage from './Components/AdvertisementPage';
import ContactPage from './Components/ContactPage';
import DistrictSlug from "./Components/Country/DistrictSlug";
import DivisionSlug from './Components/Country/DivisionSlug';
import LiveDetails from './Components/DetailsPage/LiveDetails';
import EventSlug from './Components/EventSlug';
import Latest from './Components/Latest';
import PrivacyPolicy from './Components/Privacy-policy';
import Staff from './Components/Staff';
import Terms from './Components/Terms';
// import AdsDesktop from "../src/assets/media/Advertisement/Online_970X90.gif";
// import AdsMobile from '../src/assets/media/Advertisement/Online_doggy_300X250.gif'

export default function MainRouterLink() {
    return (
        <div className="main-site">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events/:EventSlug" element={<EventSlug />} />
                <Route path="/latest" element={<Latest />} />
                <Route path="/search/:searchSlug" element={<SearchResult />} />
                <Route path="/archives" element={<Archives />} />
                <Route path="/videos" element={<VideoGallery />} />
                <Route path="/:catSlug" element={<Category />} />
                <Route path="/:catSlug/:subCatSlug" element={<SubCategory />} />
                <Route path="/divisions/:divisionSlug" element={<DivisionSlug />} />
                <Route path="/divisions/:divisionSlug/:districtSlug" element={<DistrictSlug />} />
                <Route path="/videos/:vdoID" element={<VideoDetails />} />
                <Route path="/details/:catSlug/:id" element={<Details />} />
                <Route path="/live/details/:catSlug/:id" element={<LiveDetails />} />
                <Route path="/photo/" element={<PhotoGallery />} />
                <Route path="/photo/:AlbumID" element={<DetailsPhotoFeature />} />
                <Route path="/tags/:TagTitle" element={<TagPage />} />
                <Route path="/tags" element={<AllTagList />} />
                <Route path="/writers/:WriterSlug" element={<WritersPage />} />
                <Route path="/writers" element={<AllWriters />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/staff-member" element={<Staff />} />
                {/* <Route path="/pollresult" element={<OnlinePollDetails />} />
                <Route path='/OpinionPoll/:PollID' element={<OpinionPoll />} /> */}
                <Route path='/terms-conditions' element={<Terms />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                <Route path='/contact-us' element={<ContactPage />} />
                <Route path='/advertise' element={<AdvertisementPage />} />
            </Routes>
            <Footer />
        </div>


    )
}