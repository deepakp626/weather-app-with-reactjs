import React, { Component } from "react";
import Search from "./Search";
import Result from "./Result";
import Recent from "./Recent";
import axios from "axios";
export default class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: "",
      lon: "",
      weatherData: null,
      city: "",
      isSearched:false,
      recent:[],
    };
  }
  changeHandler = (event) => {
    const name = event.target.name;
    if (name === "city") {
      this.setState({
        city: event.target.value,
      });
    } else if (name === "lat") {
      this.setState({
        lat: event.target.value,
      });
    } else if (name === "lon") {
      this.setState({
        lon: event.target.value,
      });
    }
  };

  researchHandler =(lat,lon)=>{
    this.setState({ weatherData: null},()=>{
      this.setState({lat,lon},()=>{
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&appid=6f4132f9df8b5c8a840bb0c6512590c2`)
        .then((result)=>{
            this.setState({
              city:result.data.name,
              weatherData:result.data
            })
        })
        .catch((error)=>{
          console.log("error = ",error)
        });
      })
    })
     
  }

  searchHandler =()=>{
    this.setState({
      weatherData: null,
    });
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&appid=6f4132f9df8b5c8a840bb0c6512590c2`)
    .then((result)=>{
        this.setState({
          city:result.data.name,
          weatherData:result.data
        },()=>{
          this.addDataToRecent();
       })
    })
    .catch((error)=>{
      console.log("error = ",error)
    });
  }

  addDataToRecent =()=>{
    console.log(this.state)
      let recent = this.state.recent;
      recent.push({
        lat:this.state.lat,
        lon:this.Search.lon,
        city:this.state.city
      });
      this.setState({recent},()=>{
         window.localStorage.setItem("recent",JSON.stringify(this.state.recent))
      });
  } 

  componentDidMount(){
    const data= window.localStorage.getItem("recent")
    let recent = data === null ? [] : JSON.parse(data);
    this.setState({recent})
  }

  locationHandler = () => {
    this.setState({
      lat: "",
      lon: "",
      city: "",
      isSearched:true,
      weatherData: null,
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (res) => {
          setTimeout(() => {
            this.setState({
              lat: res.coords.latitude,
              lon: res.coords.longitude,
            });
          }, 500);
          axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${this.state.lat}&lon=${this.state.lon}&appid=6f4132f9df8b5c8a840bb0c6512590c2`)
          .then((result)=>{
              this.setState({
                city:result.data.name,
                weatherData:result.data
              },()=>{
                 this.addDataToRecent();
              })
          })
          .catch((error)=>{
            console.log("error = ",error)
          })
        },
        (error) => {
          console.log(error);
        }
      )
    } else {
      console.log("Location is not support");
    }
  };

  render() {
    return (
      <div className="container pt-4" style={{ height: "500px" }}>
        <Recent
            recent={this.state.recent}
            research={this.researchHandler}
        />
        <Search
          lat={this.state.lat}
          lon={this.state.lon}
          city={this.state.city}
          weatherData={this.state.weatherData}
          change={this.changeHandler}
          getLocation={this.locationHandler}
          search={this.searchHandler}
        ></Search>
        <Result 
        recent={this.state.recent}
        isSearched={this.state.isSearched}
        weather={this.state.weatherData}></Result>
      </div>
    );
  }
}
