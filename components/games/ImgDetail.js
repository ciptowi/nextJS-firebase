import { useEffect, useState } from "react";

const ImgDetail = ({ detailGame }) => {
  const [data, setData] = useState("");

  useEffect(() => {
    setData(detailGame);
  }, [detailGame]);

  return (
    <div className=" d-flex justify-content-center" >
      <img className="img-fluid mt-4" src={data.thumbnail} alt={data.name} />
    </div>
  );
};

export default ImgDetail;
