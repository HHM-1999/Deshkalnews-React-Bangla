import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ForLazyLoaderImg } from '../AllFunctions';

export default function SubcatNames() {
    let { catSlug } = useParams();
    const [catName, setCatName] = useState([]);
    const [slug, setSlug] = useState('');
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        let lazyloaded = false;

        axios
            .get(`${process.env.REACT_APP_API_URL}category/${catSlug}`)
            .then(({ data }) => {
                const SubcatList = data.category;
                setSlug(SubcatList.Slug);
                setCatName(SubcatList.subCategories);
                setLoading(false);

                setTimeout(() => {
                    lazyloaded = false;
                    ForLazyLoaderImg(lazyloaded);
                }, 1000);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
                setLoading(false);
            });

    }, [catSlug]); // Runs only when catSlug changes

    return (
        <div className="DDivisionNav my-4 mt-4">
            <div className="row">
                <div className="col-lg-12 d-flex justify-content-center">
                    <div className="text-center">
                        <ul className="nav">
                            {loading ? (
                                // Show Skeleton Loaders
                                Array.from({ length: 5 }).map((_, i) => (
                                    <li className="dropdown skeleton" key={i} style={{ background: "#eee", height: "20px", width: "100px", margin: "5px 10px" }}></li>
                                ))
                            ) : (
                                catName.map((nc, i) => (
                                    <li className="dropdown" key={i}>
                                        <Link to={`/${slug}/${nc.Slug}`}>{nc.CategoryName}</Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
