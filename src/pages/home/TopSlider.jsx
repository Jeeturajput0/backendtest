import react from "react";
import {homeCriclecard} from '../../components/data'
function TopSlider() {
  return( 
  <>
  <h1>topslider</h1>
  <div className="flex">{homeCriclecard.map((i,item)=>(
    <div key={item.id} className="">
        <img src={i.img} alt="" className="" />
        <h1>{i.title}</h1>
    </div>
  ))}</div>
  </>
  );  
}
export default TopSlider;
