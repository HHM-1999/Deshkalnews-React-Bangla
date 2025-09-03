import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function SubDistrictNames({ divisionSlug, districtSlug }) {
    const [subDistrictNames, setSubDistrictNames] = useState([])

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}get-sub-district-options/${districtSlug}`)
            .then(({ data }) => {
                if(data.data){
                    setSubDistrictNames(data.data)
                }
            });
            
    }, [ districtSlug]);

    return (
        <div className="DDivisionNav my-4 mt-4">
            <div className="row">
                <div className="col-lg-12 d-flex justify-content-center">
                    <div className="text-center">
                        <ul className="nav">
                            {subDistrictNames && subDistrictNames.map((nc,i) => {
                                return (
                                    <li className="dropdown" key={i}>
                                        <Link to={"/divisions/" + divisionSlug + "/" + districtSlug + "/" + nc.SubDistrictSlug} className="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">{nc.SubDistrictNameBn} </Link>
                                    </li>
                                )}
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
