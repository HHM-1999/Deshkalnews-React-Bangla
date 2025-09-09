import React from 'react'
import { Helmet } from "react-helmet";

export default function LatestLdJson() {
    return (
        <Helmet>
            <script type="application/ld+json">
                {`
                {
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "আজকের সর্বশেষ খবর, ব্রেকিং নিউজ | Latest news, Breaking news | DeshkalNews.com",
                    "url": "${process.env.REACT_APP_FONT_DOMAIN_URL}latest",
                    "breadcrumb": {
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "${process.env.REACT_APP_FONT_DOMAIN_URL}bangla"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Latest",
                                "item": "${process.env.REACT_APP_FONT_DOMAIN_URL}latest"
                            }
                        ]
                    }
                }
                `}
            </script>
        </Helmet>
    )
}
