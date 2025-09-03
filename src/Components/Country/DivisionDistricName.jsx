import React from 'react'
import { Link } from "react-router-dom";
import { scrollTop } from '../AllFunctions';

export default function DivisionDistricName() {
    return (
        <>
            <div className="DDivisionNav my-4 mt-4">
                <div className="row">
                    <div className="col-lg-12 d-flex justify-content-center">
                        <div className="text-center">
                            <ul className="nav">
                                <li className="dropdown">
                                    <Link onClick={scrollTop} to="/divisions/dhaka" className="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">ঢাকা</Link>
                                    <ul className="dropdown-menu">
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/dhaka/kishoreganj">কিশোরগঞ্জ</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/dhaka/gazipur">গাজীপুর</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/dhaka/gopalganj">গোপালগঞ্জ</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/dhaka/tangail">টাঙ্গাইল</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/dhaka/dhaka">ঢাকা</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/dhaka/narsingdi">নরসিংদী</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/dhaka/narayanganj">নারায়ণগঞ্জ</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/dhaka/faridpur">ফরিদপুর</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/dhaka/madaripur">মাদারীপুর</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/dhaka/manikganj">মানিকগঞ্জ</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/dhaka/munshiganj">মুন্সিগঞ্জ</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/dhaka/rajbari">রাজবাড়ী</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/dhaka/shariatpur">শরীয়তপুর</Link>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <Link onClick={scrollTop} to="/divisions/chattogram" className="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">চট্টগ্রাম</Link>
                                    <ul className="dropdown-menu">
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/chattogram/coxs-bazar">কক্সবাজার</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/chattogram/cumilla">কুমিল্লা</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/chattogram/khagrachari">খাগড়াছড়ি</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/chattogram/chattogram">চট্টগ্রাম</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/chattogram/chandpur">চাঁদপুর</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/chattogram/noakhali">নোয়াখালী</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/chattogram/feni">ফেনী</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/chattogram/bandarban">বান্দরবান</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/chattogram/brahmanbaria">ব্রাহ্মণবাড়িয়া</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/chattogram/rangamati">রাঙামাটি</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/chattogram/lakshmipur">লক্ষ্মীপুর</Link>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <Link onClick={scrollTop} to="/divisions/barishal" className="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">বরিশাল</Link>
                                    <ul className="dropdown-menu">
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/barishal/jhalokati">ঝালকাঠী</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/barishal/patuakhali">পটুয়াখালি</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/barishal/pirojpur">পিরোজপুর</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/barishal/barguna">বরগুনা</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/barishal/barishal">বরিশাল</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/barishal/bhola">ভোলা</Link>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <Link onClick={scrollTop} to="/divisions/khulna" className="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">খুলনা</Link>
                                    <ul className="dropdown-menu">
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/khulna/kushtia">কুষ্টিয়া</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/khulna/khulna">খুলনা</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/khulna/chuadanga">চুয়াডাঙ্গা</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/khulna/jhenaidah">ঝিনাইদহ</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/khulna/narail">নড়াইল</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/khulna/bagerhat">বাগেরহাট</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/khulna/magura">মাগুরা</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/khulna/meherpur">মেহেরপুর</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/khulna/jashore">যশোর</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/khulna/satkhira">সাতক্ষীরা</Link>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <Link onClick={scrollTop} to="/divisions/rajshahi" className="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">রাজশাহী</Link>
                                    <ul className="dropdown-menu">
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/rajshahi/chapai-nawabganj">চাঁপাইনবাবগঞ্জ</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/rajshahi/joypurhat">জয়পুরহাট</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/rajshahi/naogaon">নওগাঁ</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/rajshahi/natore">নাটোর</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/rajshahi/pabna">পাবনা</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/rajshahi/bogura">বগুড়া</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/rajshahi/rajshahi">রাজশাহী</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/rajshahi/sirajgonj">সিরাজগঞ্জ</Link>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <Link onClick={scrollTop} to="/divisions/sylhet" className="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">সিলেট</Link>
                                    <ul className="dropdown-menu">
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/sylhet/maulvibazar">মৌলভীবাজার</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/sylhet/sylhet">সিলেট</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/sylhet/sunamganj">সুনামগঞ্জ</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/sylhet/habiganj">হবিগঞ্জ</Link>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <Link onClick={scrollTop} to="/divisions/rangpur" className="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">রংপুর</Link>
                                    <ul className="dropdown-menu">
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/rangpur/kurigram">কুড়িগ্রাম</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/rangpur/gaibandha">গাইবান্ধা</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/rangpur/thakurgaon">ঠাকুরগাঁও</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/rangpur/dinajpur">দিনাজপুর</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/rangpur/nilphamari">নীলফামারী</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/rangpur/panchagarh">পঞ্চগড়</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/rangpur/rangpur">রংপুর</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/rangpur/lalmonirhat">লালমনিরহাট</Link>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <Link onClick={scrollTop} to="/divisions/mymensingh" className="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">ময়মনসিংহ</Link>
                                    <ul className="dropdown-menu">
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/mymensingh/jamalpur">জামালপুর</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/mymensingh/netrokona">নেত্রকোনা</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/mymensingh/mymensingh">ময়মনসিংহ</Link>
                                        <Link onClick={scrollTop} className="dropdown-item" to="/divisions/mymensingh/sherpur">শেরপুর</Link>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
