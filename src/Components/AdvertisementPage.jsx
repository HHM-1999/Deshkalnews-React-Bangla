import DocumentTitle from 'react-document-title'
import pdfFile from '../Components/DeshkalnewsRateCard.pdf'

export default function AdvertisementPage() {
    return (
        <>
            <main>
                <div className="container">
                    <div className="advertise-page">
                        <div className="TopHomeSection"></div>
                        <DocumentTitle title='Advertisement :: দেশকালনিউজ' />
                        <h1 className="DTitleAdvertise"><span className="DTitleInner"><span className="DTitleInnerBar"><span>Advertisement</span></span></span></h1>
                        <div className="row">
                            <div className="col-md-11 m-auto">
                                <div style={{ height: '90vh', overflowY: 'scroll', WebkitOverflowScrolling: 'touch' }}>
                                    <iframe
                                        src={pdfFile}
                                        title="PDF"
                                        style={{
                                            width: '100%',
                                            height: '100vh',
                                            border: 'none',
                                        }}
                                        typeof='application/pdf'
                                    ></iframe>
                                </div>

                                {/* Scrollable wrapper */}
                                {/* <div style={{ WebkitOverflowScrolling: 'touch',overflow:"auto",height:"1000px", position: 'relative',zIndex: 1, }}>
                                    <iframe
                                        src={pdfFile}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            border: 'none',
                                            minWidth: '100%',
                                            display: 'block' 
                                        }}
                                        title="Rate Card PDF"
                                        seamless="seamless"
                                        type='application/pdf'
                                        sandbox="allow-scripts allow-same-origin allow-forms"
                                    />
                                </div> */}
                            </div>
                        </div>

                    </div>


                </div>
            </main>
        </>
    )
}
