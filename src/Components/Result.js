import Loader from "./Loader";
export default function Result(props) {
  const {weather:data} = props
  // console.log(data)
  function kToC(k){
    return (k - 273.15).toFixed(2) + "C";
  }
  console.log(props)
  function getTheData(stamp){
    const data = new Date(stamp*1000);
    return data.toLocalTimeString();
  }
  let showOnPage;
  if(data == null){
    if(props.isSearched === true){
      showOnPage =     <Loader />
    }else{
      showOnPage = (
        <div className="container mt-2">
            <h1 className="text-center">Please Search a City</h1>
        </div>
      )
    }
  }else{
    showOnPage = <div className='row'>
    <div className='col'>
        <div className='card border-primary'>
            <div className='card-body'>
                <h4 className='card-title'>
                    <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
                    alt=""/>
                    {data.name} ({kToC(data.main.temp)})
                    <span className='pl-2'>{data.weather[0].description}</span>
                </h4>
                <div className='row'>
                  <div className='col'>
                      <div className='row'>
                          <table className='table'>
                            <tbody>
                                <tr>
                                  <th>Feels Like</th>
                                  <td>{kToC(data.main.feels_like)}</td>
                                </tr>
                                <tr>
                                  <th>Min Temp.</th>
                                  <td>{kToC(data.main.temp_max)}</td>
                                </tr>
                                <tr>
                                  <th>Max Temp.</th>
                                  <td>{getTheData(data.main.temp_max)}</td>
                                </tr>
                                <tr>
                                  <th>Sun Rise</th>
                                  <td>{getTheData(data.sys.sunrise)}</td>
                                </tr>
                                <tr>
                                  <th>Sun Set</th>
                                  <td>{getTheData(data.sys.sunset)}</td>
                                </tr>
                            </tbody>
                          </table>
                      </div>
                  </div>
                </div>
            </div>
        </div>  
    </div>
</div>
  }
  return (
    <>
      {showOnPage}
    </>
  )
}
