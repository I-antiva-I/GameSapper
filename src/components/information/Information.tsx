import React from "react";
import InformationGroup from "./InformationGroup";


function Information()
{
    return(
        <div className="wrapper for-information">
            <div className="information">
                <h2>INFORMATION</h2>
                <InformationGroup
                    isContentVisible={true}
                    groupHeader={"About the game"}
                    groupClassName={"about"}
                >
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur quo perspiciatis suscipit officia est, maiores, nam, hic dolore eaque ullam laboriosam iusto ab. Architecto ad vitae sapiente quidem aut veritatis voluptatibus assumenda sunt perferendis facilis rerum inventore cupiditate praesentium velit nihil, odio distinctio similique atque dolorum quam beatae quaerat accusamus repellat quis? Sed iusto placeat sapiente sit unde facere error incidunt quisquam hic quod est, dicta itaque doloremque delectus necessitatibus autem nostrum, aspernatur molestias rem iste neque officia. Fugiat, eaque in. Aperiam amet doloremque excepturi possimus repudiandae qui optio quis et dolores. Consequuntur, dolorem! Distinctio fugiat voluptas debitis ut facilis!
                    </p>
                </InformationGroup>

            </div>
        </div>
    )
}


export default Information;