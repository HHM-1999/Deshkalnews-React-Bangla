import React from "react";
import { EmailShareButton, FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { EmailIcon, FacebookIcon, LinkedinIcon, TwitterIcon, WhatsappIcon } from "react-share";

export default function ShareThisPopup({ title, url }) {
    return (
        <div className="DSocialTop mt-2 ">
            {/* social media button end */}
            <FacebookShareButton url={url} title={title}>
                <FacebookIcon size={30} round={true} />
            </FacebookShareButton>
            <LinkedinShareButton url={url}>
                <LinkedinIcon size={30} round={true} />
            </LinkedinShareButton>
            <TwitterShareButton url={url}>
                <TwitterIcon size={30} round={true} />
            </TwitterShareButton>
            <EmailShareButton url={url} body="mailto:hello@DeshKalNews.com">
                <EmailIcon size={30} round={true} />
            </EmailShareButton>
            <WhatsappShareButton url={url}>
                <WhatsappIcon size={30} round={true} />
            </WhatsappShareButton>
            {/* social media button end */}
        </div>
    )
}
