import React from 'react'
import { Helmet } from "react-helmet";

export default function HomeLdjsonBn() {
    return (
        <Helmet>
            <script type="application/ld+json">
                {`
                    {
                        "name":"deshkalnews.com",
                        "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}",
                        "logo":{
                            "@context":"http://schema.org",
                            "@type":"ImageObject",
                            "author":"DeshKalNews :: দেশকালনিউজ.কম",
                            "contentUrl":"${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/logo.png",
                            "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/logo.png",
                            "name":"logo",
                            "width":"250",
                            "height":"99"
                        },
                        "sameAs":[
                            
                        ],
                        "@type":"Organization",
                        "@context":"http://schema.org"
                    }  
                `}
            </script>
            <script type="application/ld+json">
                {`
                    {
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": "${process.env.REACT_APP_FONT_DOMAIN_URL}"
                            }
                        ]
                    }
                       
                `}
            </script>
            <script type="application/ld+json">
                {`
                    {
                        "@context":"http://schema.org",
                        "@type":"Website",
                        "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}",
                        "interactivityType":"mixed",
                        "name":"deshkalnews.com",
                        "headline":"DeshKalNews.com | বাংলাদেশ ও বিশ্বসংবাদ | সর্বশেষ খবর",
                        "keywords":"DeshKalNews.com, Deshkal News, বাংলাদেশ সংবাদ, সর্বশেষ খবর, বাংলা নিউজ, জাতীয় খবর, রাজনীতি, আন্তর্জাতিক সংবাদ, খেলার খবর, বিনোদন, অর্থনীতি, প্রযুক্তি, ব্রেকিং নিউজ, আজকের খবর, মতামত, চাকরির খবর, ইসলাম",
                        "copyrightHolder":{
                            "@type":"Organization",
                            "name":"deshkalnews.com"
                        },
                        "potentialAction":{
                            "@type":"SearchAction",
                            "target":"${process.env.REACT_APP_FONT_DOMAIN_URL}search/{query}",
                            "query-input":"required name=query"
                        },
                        "mainEntityOfPage":{
                            "@type":"WebPage",
                            "@id":"${process.env.REACT_APP_FONT_DOMAIN_URL}"
                        }
                    }
                       
                `}
            </script>
            <script type="application/ld+json">
                {`
                    {
                        "@context":"http://schema.org",
                        "@type":"LocalBusiness",
                        "name":"Deshkal News",
                        "image":"${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/logo.png",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "11/8/D (2nd Floor), Paradise Maria, Free School St",
                            "addressLocality": "Dhaka",
                            "postalCode": "1205",
                            "addressRegion": "Dhaka",
                            "addressCountry": "BD"
                          },
                          "telephone": "+880 2-41062939",
                          "url":"${process.env.REACT_APP_FONT_DOMAIN_URL}",
                          "openingHours": [
                            "Mo-Su 00:00-23:59"
                          ]
                        }
                    }
                       
                `}
            </script>
        </Helmet>
    )
}
                                                                                                                                                                                                                                                  