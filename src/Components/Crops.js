import React from "react";
import { useContext } from "react";
import noteContext from "../Context/Crops/CropContext";
/* import Addnote from "./AddCrops"; */
import Noteitem from "./CropDetails";
/* import { FDashboard } from "./Dashboard/FDashboard"; */
const Notes = () => {
  const context = useContext(noteContext);
  const {crops,getCrops}=context;
  // useEffect(() => {
  //   getCrops();
  //   //eslint-disable-next-line
  // }, []);
 
  const handleClick = (e) => {
    e.preventDefault();
    getCrops();
  };
  //const crop=crops[0];
  return (
    <>
      <div className="container">
        <div className="row">
          <h2 className="mb-5 text-white">Your All Crops</h2>
          <div className="container mx-2">
            {/* <h5>{crops.length === 0 && "No Crop to Display"}</h5> */}
             {console.log(crops)}
            <button
                    className="btn btn-lg btn-success btn-login fw-bold text-uppercase mb-5"
                    type="submit"
                    onClick={handleClick}
                  >
                    Get current crop
                  </button>

                  {crops.map((crop) => {
            return <Noteitem key={crop._id} crop={crop} />;
          })}
                   
          </div>
         
        </div>
      </div>
    </>
  );
};

export default Notes;
