import React from "react";

import "./style.scss";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const Unauthorized = () => {
    return (
        <div className="pageNotFound">
            <ContentWrapper>
                <span className="bigText">unauthorized</span>
                <span className="smallText">Page not found! </span>
                <span className="smallText">Login First Please </span>

            </ContentWrapper>
        </div>
    );
};

export default Unauthorized;
