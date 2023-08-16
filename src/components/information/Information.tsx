import React from "react";
import InformationGroup from "./InformationGroup";
import AboutInfo from "./AboutInfo";
import OtherInfo from "./OtherInfo";
import HowToInfo from "./HowToInfo";

function Information()
{
    return(
        <div className="wrapper for-information">
            <div className="information">
                <div className="information-header">
                    <h2>INFORMATION</h2>
                </div>

                <div className="information-content">
                    <InformationGroup
                        isContentVisible=   {true}
                        groupHeader=        "About the game"
                        groupClassName=     "about-info">
                        <AboutInfo/>
                    </InformationGroup>

                    <InformationGroup
                        isContentVisible=   {false}
                        groupHeader=        "How to play"
                        groupClassName=     "how-to-info">
                        <HowToInfo/>
                    </InformationGroup>

                    <InformationGroup
                        isContentVisible=   {false}
                        groupHeader=        "Other"
                        groupClassName=     "other-info">
                        <OtherInfo/>
                    </InformationGroup>
                </div>
            </div>
        </div>
    )
}

export default Information;