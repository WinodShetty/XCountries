import React, {useState, useEffect} from "react";
import './Flags.css'


const Flags = () => {
    const[countries, setcountries] = useState([]);
    const[error, setError] = useState(true);

    

    useEffect(()=> {
        const getApidata = async() => {
            try{
                const result = await fetch ("https://xcountries-backend.azurewebsites.net/all");
                if(!result.ok) {
                throw new error(`HTTP error! status: ${result.status}`);
                
                }
                const data = await result.json();
                setcountries(data);
    
          } catch(error){
            console.error("Error fetching data: ", error);
            setError(error)
          }
        }
        getApidata()
    },[])


    return(
       
        <div className="container">
            
            {countries.map((countries) => {
                return(
                    <div className="card" >
                        <img src={countries.flag} alt={`flag of ${countries.name}`}/>
                        <p>{countries.name}</p>
                    </div>
                )

            })}
            

        </div>
      
    )
}
export default Flags;