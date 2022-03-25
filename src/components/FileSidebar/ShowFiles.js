import {useEffect} from "react";

const ShowFiles = (props) => {
    useEffect(() => {
        console.log(props.data)
    }, [props.data])

    return (
        <div>
            {displayFiles(props.data)}
        </div>
    )
}

export default ShowFiles;

const displayFiles = (data) => {
    if(data.children){
        console.log(data.name)
        return(
            <div>
                {data.name}
                <ul>
                    {
                        data.children.forEach( (element, index,arr) => {
                            displayFiles(element);
                        })
                    }
                </ul>
            </div>
        )
    }
    else{
        return (
            <li>{data.name}</li>
        )
    }
}
