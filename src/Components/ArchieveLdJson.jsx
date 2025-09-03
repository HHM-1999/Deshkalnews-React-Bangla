import React from 'react'
import { Helmet } from "react-helmet";

export default function ArchiveLdJson() {
    return (
        <Helmet>
            <script type="application/ld+json">
                {`
                {
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "আর্কাইভ | পুরনো সব গুরুত্বপূর্ণ খবর ও রেকর্ড",
                    "url": "${process.env.REACT_APP_FONT_DOMAIN_URL}archives",
                    "breadcrumb": {
                      "@type": "BreadcrumbList",
                      "itemListElement": [{
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "${process.env.REACT_APP_FONT_DOMAIN_URL}"
                      },{
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Archive",
                        "item": "${process.env.REACT_APP_FONT_DOMAIN_URL}archives"
                      }]
                    }
                }
                `}
            </script>
        </Helmet>
    )
}
