import React from 'react'
import { TiPencil } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { scrollTop } from '../AllFunctions';

export default function DWriters({ news }) {
    const contributors = news.content_contributors;
    if (!contributors || contributors.length === 0) {
        // If no contributors, show fallback WriterName
        return (
            <div className="WritterName mt-2">
                <p><i className="fa-solid fa-pen"></i> {news.WriterName}</p>
            </div>
        );
    }

    // If contributors exist
    const writerNames = contributors.map(nd => nd.WriterName).join(', ');
    const slugs = contributors.map(nd => nd.Slug).join(',');

    return (
        <div className="WritterName mb-1">
            <p>
                <Link to={`/writers/${slugs}`} onClick={scrollTop}>
                    <TiPencil /> {writerNames}
                </Link>
            </p>
        </div>
    );
}
