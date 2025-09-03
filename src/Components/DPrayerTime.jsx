import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment';
import { Link } from 'react-router-dom'
import { banglaDateConvetar } from './AllFunctions';
const { toBengaliNumber } = require('bengali-number');

const currentDay = moment().format('dddd')
const currentDate = moment().format('DD MMMM YYYY')
const currentNamaz = moment().format('YYYY-MM-DD')

let FajrHours = "";
let FajrMin = "";
let DhuhrHours = "";
let DhuhrMin = "";
let AsrHours = "";
let AsrMin = "";
let MaghribHours = "";
let MaghribMin = "";
let IshaHours = "";
let IshaMin = "";

export default function DPrayerTime() {
    const [namaz, setNamaz] = useState({}) // eslint-disable-line no-unused-vars

    useEffect(() => {
        axios
            .get(`https://www.emythmakers.com/namazapi/date/${currentNamaz}`,
                { headers: { Accesstoken: `62497a616353e` } }
            )
            .then(({ data }) => {
                setNamaz(data.prayertimes)
                FajrHours = (data.prayertimes.Fajr.split(':')[0] % 12) || 12
                FajrMin = (data.prayertimes.Fajr.split(':')[1])
                DhuhrHours = (data.prayertimes.Dhuhr.split(':')[0] % 12) || 12
                DhuhrMin = (data.prayertimes.Dhuhr.split(':')[1])
                AsrHours = (data.prayertimes.Asr.split(':')[0] % 12) || 12
                AsrMin = (data.prayertimes.Asr.split(':')[1])
                MaghribHours = (data.prayertimes.Maghrib.split(':')[0] % 12) || 12
                MaghribMin = (data.prayertimes.Maghrib.split(':')[1])
                IshaHours = (data.prayertimes.Isha.split(':')[0] % 12) || 12
                IshaMin = (data.prayertimes.Isha.split(':')[1])
            });
    }, [])
    return (
        <div className='container'>
            <div className="DPrayer ">
                <div className="SectionTitle"><h3><Link to="/namaj"><span className="ColorBox"></span>নামাজের সময়</Link></h3></div>

               <div className="row">
                <div className="col-md-6 m-auto mt-4">
                <div className="DPrayersTime2 table-responsive">
                <p>ঢাকা, {banglaDateConvetar(currentDay)}, {banglaDateConvetar(currentDate)} </p>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>ফজর</td>
                                <td>{toBengaliNumber(FajrHours) + ":" + toBengaliNumber(FajrMin)} ভোর </td>
                            </tr>
                            <tr>
                                <td>জোহর</td>
                                <td>{toBengaliNumber(DhuhrHours) + ":" + toBengaliNumber(DhuhrMin)} বেলা</td>
                            </tr>
                            <tr>
                                <td>আসর</td>
                                <td>{toBengaliNumber(AsrHours) + ":" + toBengaliNumber(AsrMin)} বিকেল</td>
                            </tr>
                            <tr>
                                <td>মাগরিব</td>
                                <td>{toBengaliNumber(MaghribHours) + ":" + toBengaliNumber(MaghribMin)} সন্ধ্যা</td>
                            </tr>
                            <tr>
                                <td>ইশা</td>
                                <td>{toBengaliNumber(IshaHours) + ":" + toBengaliNumber(IshaMin)} রাত</td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
                </div>
               </div>
            </div>
        </div>
    )
}