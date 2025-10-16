import DocumentTitle from 'react-document-title'
import { Link } from 'react-router-dom'
import { scrollTop } from '../Components/AllFunctions'
import FBpagePlugin from './FBpagePlugin'



export default function Terms() {
    return (
        <div className='page-bangla'>

            <main>
                <div className="container">
                    <div className="TopHomeSection"></div>
                    <DocumentTitle title=' দেশকালনিউজ ::   Terms and Conditions ' />
                    <div className="SectionTitleEn"><h1><Link to="/terms-conditions" onClick={scrollTop}><span className="ColorBox"></span>Terms And Conditions for Deshkal News.com</Link></h1></div>
                    <div className='row mt-5'>
                        <div className='col-lg-8 col-12'>
                            <div className="policy-details">
                                <p>Welcome to Deshkal News.com  By accessing or using our website, you agree to abide by the following terms and conditions:</p>
                                <div className='policy-list'>
                                    <ul>
                                        <ol>1. Use of Content: The content provided on Deshkal News.com is for informational purposes only. You may not modify, reproduce, distribute, or sell any of the content without prior written permission from Deshkal News.com.</ol>
                                        <ol>2. User Conduct: You agree to use Deshkal News.com for lawful purposes only. You must not engage in any activity that disrupts the functioning of the website or infringes upon the rights of others.</ol>
                                        <ol>3. Intellectual Property: All content, trademarks, logos, and other intellectual property displayed on Deshkal News.com are owned by Deshkal News.com or third parties. You may not use or reproduce any of these without express permission.</ol>
                                        <ol>4. Third-Party Links: Deshkal News.com may contain links to third-party websites. We are not responsible for the content or privacy practices of these websites.</ol>
                                        <ol>5. Disclaimer of Warranties: Deshkal News.com is provided "as is" without any warranties, express or implied. We do not guarantee the accuracy, reliability, or completeness of any content on the website.</ol>
                                        <ol>6. Limitation of Liability: Deshkal News.com shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of your use of the website.</ol>
                                        <ol>7. Changes to Terms: Deshkal News.com reserves the right to modify or replace these terms and conditions at any time. Your continued use of the website after any such changes constitutes acceptance of the new terms.</ol>
                                        <ol>8. Governing Law: These terms and conditions shall be governed by and construed in accordance with the laws of Bangladesh.</ol>
                                    </ul>
                                    <p>If you have any questions or concerns about these terms and conditions, please contact us at <a href="mailto:hello@Deshkal News.com" target="_blank" rel="noreferrer">[hello@Deshkal News.com]</a>.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-12">
                            <FBpagePlugin />
                            <div className='mt-5'>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
