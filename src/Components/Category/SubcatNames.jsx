import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ForLazyLoaderImg, scrollTop } from '../AllFunctions';

export default function SubcatNames() {
    let { catSlug } = useParams();
    const [catName, setCatName] = useState([]);   // always array
    const [slug, setSlug] = useState("");         // empty string

    useEffect(() => {
        let lazyloaded = false;

        axios
            .get(`${process.env.REACT_APP_API_URL}category/${catSlug}`)
            .then(({ data }) => {
                if (data?.category) {
                    const SubcatList = data.category;
                    setSlug(SubcatList?.Slug || "");
                    setCatName(SubcatList?.subCategories || []); // if null, keep []
                }

                setTimeout(() => {
                    lazyloaded = false;
                    ForLazyLoaderImg(lazyloaded);
                }, 1000);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });

    }, [catSlug]);

    return (
        <div className="DDivisionNav my-4 mt-4">
            <div className="row">
                <div className="col-lg-12 d-flex justify-content-center">
                    <div className="text-center">
                        <ul className="nav">
                            {catName && catName.length > 0 ? (
                                catName.map((nc, i) => (
                                    <li className="dropdown" key={i}>
                                        {slug ? (
                                            <Link to={`/${slug}/sub/${nc.Slug}`} onClick={scrollTop}>
                                                {nc.CategoryName}
                                            </Link>
                                        ) : (
                                            <span>{nc.CategoryName}</span> // fallback if slug missing
                                        )}
                                    </li>
                                ))
                            ) : (
                               " "
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
