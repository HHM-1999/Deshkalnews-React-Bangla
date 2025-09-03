import React from 'react';
import { Helmet } from "react-helmet";

export default function PhotoGalleryLdJson() {
    return (
        <Helmet>
            <script type="application/ld+json">
                {`
                {
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "ছবিতে সংবাদ | ফটোজার্নালিজম ও চিত্র প্রতিবেদন",
                    "url": "${process.env.REACT_APP_FONT_DOMAIN_URL}photo",
                    "breadcrumb": {
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "${process.env.REACT_APP_FONT_DOMAIN_URL}"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Photo Gallery",
                                "item": "${process.env.REACT_APP_FONT_DOMAIN_URL}photo"
                            }
                        ]
                    }
                }
                `}
            </script>
        </Helmet>
    )
}
