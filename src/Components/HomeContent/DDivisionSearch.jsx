

import React, { useState, useEffect } from 'react'
import axios from 'axios'


// var lazyloaded = false
export default function DDivisionSearch() {
    const [divisionName, setDivisionName] = useState([])
    const [districtName, setDistrictName] = useState([])
    const [SubdistrictName, setSubDistrictName] = useState([])

    useEffect(() => {
        try{
        axios
            .get(`${process.env.REACT_APP_API_URL}get-division-options`)
            .then(({ data }) => {
                if (data.data.length > 0) {
                    setDivisionName(data.data)
                    // console.log(setDivisionName);

                }
                else {
                    setDivisionName("")
                }
                // console.log(data.divisions);

                // setDivisionName(data.DivisionName);
                // console.log(data.DivisionName);

            });
        }
        catch(error){
            console.log(error);
        }
    }, [])

    const getDist = (e) => {
        e.preventDefault();

        //disabled ture & false
        // if (document.getElementById("division") !== null) {
        //     document.getElementById("button").disabled = false;
        // } else {
        //     document.getElementById("button").disabled = true;
        // }//disabled ture & false

        var division = e.target.value
        var district = e.target.value
        // // console.log(division);
        if (division !== 0) {
            try{
            axios
                .get(`${process.env.REACT_APP_API_URL}get-district-options/${division}`)
                .then(({ data }) => {
                    if (data.data.length > 0) {
                        setDistrictName(data.data);
                    }
                });
            }catch(error){   
                console.log(error);
            }
        } else {
            setDistrictName("");
        }
        if (district !== 0 ) {
            try{
            axios
                .get(`${process.env.REACT_APP_API_URL}get-sub-district-options/${district}`)
                .then(({ data }) => {
                    if (data.data.length > 0) {
                        setSubDistrictName(data.data);
                    }
                });}catch(error){   
                    console.log(error);
                }
        } else {
            setSubDistrictName("");
        }
    
    }

    const getURL = (e) => {
        e.preventDefault()
        var url = ""
        var division = e.target.division.value
        var district = e.target.district.value
       
        var subdistrict = e.target.subdistrict.value
        
     
        // var subdistrict = []
        // var subdistrict =''
        if (division > '0') { url = '/divisions/' + division }
        if (district > '0') { url = '/divisions/' + division + '/' + district }
        if (subdistrict > '0') { url = '/divisions/' + division + '/' + district + '/' + subdistrict }
        // console.log(url);
        window.location.href = url;
    }



    return (
        <>
            <form onSubmit={getURL} >
                <div className="DivOption ">
                    <div className="row">
                        <div className="col-md-3 ">
                            <div className="area-select">
                                <select className="form-select cboDivName" defaultValue={'0'} name="division" id="division" onChange={getDist}>
                                    <option value="0" >বিভাগ</option>
                                    {divisionName.map((nc) => {
                                        // console.log(nc.DivisionID);

                                        return (
                                            <option data-id={nc.DivisionID} key={nc.DivisionID} value={nc.DivisionSlug}>{nc.DivisionNameBn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3 ">
                            <div className="area-select">
                                <select className="form-select cboDivName" defaultValue={'0'} name="district" id="district" onChange={getDist}>
                                    <option value="0" >জেলা</option>
                                    {districtName.map((nc, i) => {
                                        return (
                                            <option data-id={nc.DistrictID} key={nc.DistrictID} value={nc.DistrictSlug}>{nc.DistrictNameBn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="area-select">
                                <select className="form-select cboDivName" defaultValue={'0'} name="subdistrict" id="subdistrict" onChange={getDist}>
                                    <option value="0">উপজেলা</option>
                                    {SubdistrictName.map((nc, i) => {
                                        return (
                                            <option data-id={nc.SubDistrictID} key={nc.SubDistrictID} value={nc.SubDistrictSlug}>{nc.SubDistrictNameBn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex srchButton  justify-content-center align-items-center">
                            <button type="submit"  name="btnSubmit">  <a className="btn ">খুঁজুন </a></button>
                          
                        </div>
                    </div>
                </div>
            </form>








        </>


    )
}
