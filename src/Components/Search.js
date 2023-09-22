import React from "react";

export default function Search(props) {
  return (
    <div className="container pt-4" style={{ height: "200px" }}>
      <div className="row">
        <div className="col-lg-5">
          <div className="form-group">
            <label htmlFor="">Type City Name</label>
            <input
              text="text"
              className="form-control"
              name="city"
              value={props.city}
              onChange={props.change}
              id="city"
              aria-describedby="helpId"
              placeholder=""
            />
          </div>
        </div>
        <div className="col-lg-1 text-center">
          <div className="form-group">
            <label htmlFor=""></label>
            <h5>OR</h5>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="form-group">
            <label htmlFor="">Get Co-ordinate</label>
            <button className="btn fa fa-crosshairs"
            onClick={props.getLocation}>
            </button>

            <div className="row">
              <div className="bg-dark text-white rounded pt-1 pl-1 pr-1">
                Lat:
              </div>
              <input
                type="number"
                className="form-control col mr-1"
                name="lat"
                onChange={props.change}
                id="lat"
                value={props.lat}
                aria-describedby="helpId"
                placeholder=""
              />

              <div className="bg-dark text-white rounded pt-1 pl-1 pr-1">
                Lon:
              </div>
              <input
                type="number"
                className="form-control col "
                name="lon"
                onChange={props.change}
                id="Lon"
                value={props.lon}
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
          </div>
        </div>
        <div className="col-lg-1">
          <label htmlFor=""> Search</label>
          <button className="btn btn-primary fa fa-search"
          onClick={props.search}> </button>
        </div>
      </div>
    </div>
  );
}
