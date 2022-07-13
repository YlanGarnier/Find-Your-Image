import { image_interface } from "./image";

const ImagesComponent = (props: { Images: image_interface }) => {
    const { Images } = props;

    return (
        <div className="image">
            <a href={Images.pageURL} target="_blank" rel="noopener noreferrer"><img src={Images.webformatURL}/></a>
        </div>
    )
};

export default ImagesComponent;