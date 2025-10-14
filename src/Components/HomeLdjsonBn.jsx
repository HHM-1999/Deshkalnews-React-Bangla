import React from 'react'
import { Helmet } from "react-helmet";

export default function HomeLdjsonBn() {
    return (
        <Helmet>
            {/* Organization Schema --> */}
            <script type="application/ld+json">
                {`{
                        "@context": "https://schema.org",
                        "@type": "NewsMediaOrganization",
                        "name": "দেশকাল নিউজ",
                        "alternateName": "Deshkal News",
                        "url": "${process.env.REACT_APP_FONT_DOMAIN_URL}",
                        "logo": {
                          "@type": "ImageObject",
                          "url": "${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/logo.png",
                          "width": 300,
                          "height": 300
                        },
                        "foundingDate": "২০২৪-০১-০১",
                        "founder": {
                          "@type": "Person",
                          "name": "ইলিয়াস উদ্দিন পলাশ",
                          "jobTitle": "প্রতিষ্ঠাতা ও প্রধান সম্পাদক",
                          "url": "${process.env.REACT_APP_FONT_DOMAIN_URL}about"
                        },
                        "publisher": {
                          "@type": "Organization",
                          "name": "দেশকাল নিউজ",
                          "logo": {
                            "@type": "ImageObject",
                            "url": "${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/logo.png"
                          }
                        },
                        "contactPoint": {
                          "@type": "ContactPoint",
                          "contactType": "সম্পাদকীয় বিভাগ",
                          "email": "info@deshkalnews.com",
                          "url": "${process.env.REACT_APP_FONT_DOMAIN_URL}contact-us"
                        },
                        "address": {
                          "@type": "PostalAddress",
                          "streetAddress": "১১/৮/ডি (২য় তলা), প্যারাডাইস মারিয়া, ফ্রি স্কুল স্ট্রিট",
                          "addressLocality": "ঢাকা",
                          "postalCode": "1205",
                          "addressRegion": "ঢাকা",
                          "addressCountry": "BD"
                        },
                        "telephone": "+880241062939",
                        "inLanguage": "bn",
                        "description": "দেশকাল নিউজ একটি বিশ্বাসযোগ্য বাংলাদেশি সংবাদ প্ল্যাটফর্ম যা বাংলা ও ইংরেজি ভাষায় জাতীয়, আন্তর্জাতিক এবং জনস্বার্থ সংশ্লিষ্ট খবর পরিবেশন করে।",
                        "headline": "দেশকাল নিউজ - নির্ভরযোগ্য জাতীয় ও আন্তর্জাতিক সংবাদ মাধ্যম",
                        "sameAs": [
                          "https://www.facebook.com/DeshkalNews24",
                          "https://www.instagram.com/Deshkalnews",
                          "https://x.com/Deshkalnews",
                          "https://www.youtube.com/@DeshkalNews24",
                          "https://www.linkedin.com/company/deshkal-news",
                          "https://www.threads.net/@deshkalnews"
                        ],
                        "potentialAction": {
                          "@type": "SearchAction",
                          "target": "${process.env.REACT_APP_FONT_DOMAIN_URL}search/",
                          "query-input": "required name=query"
                        }
                      }
`
                }
            </script>
            {/* Breadcrumb Schema --> */}
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
        </Helmet>
    )
}
