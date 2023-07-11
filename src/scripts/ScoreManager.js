export function findBestScore(scoreOne,scoreTwo)
{   
    // REWORK!!!!!
    if(scoreOne==null)
    {
        return scoreTwo;
    }
    else if (scoreTwo==null)
    {
        return scoreOne;
    }


    if(scoreOne["bombs"]>scoreTwo["bombs"])
    {
        return scoreOne;
    }
    else
    if(scoreOne["bombs"]<scoreTwo["bombs"])
    {
        return scoreTwo;
    }
    else
    {
        if(scoreOne["size"]>scoreTwo["size"])
        {
            return scoreOne;
        }
        else
        if(scoreOne["size"]<scoreTwo["size"])
        {
            return scoreTwo;
        }
        else
        {
            if(scoreOne["seconds"]<scoreTwo["seconds"])
            {
                return scoreOne;
            }
            else
            if(scoreOne["seconds"]>scoreTwo["seconds"])
            {
                return scoreTwo;
            }
            else
            {
                if(scoreOne["date"]>scoreTwo["date"])
                {
                    return scoreOne;
                }
                else
                {
                    return scoreTwo;
                }
            }
        }
    }

}