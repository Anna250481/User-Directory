import React, { Component } from "react";
import SearchBar from "./SearchBar";
import EmployeeInfo from "./EmployeeInfo";
import API from "../utils/API";
import "../styles/Results.css";

class ListResults extends Component {
  state = {
    result: [],
    filter: "",
    filterBy: "firstName",
    currentSort: "default",
    sortField: ""

  };

  componentDidMount() {
    API.search()
      .then(res => {
        console.log(res)
        this.setState({
          result: res.data.results.map((e, i) => ({
            picture: e.picture.large,
            firstName: e.name.first,
            lastName: e.name.last,
            email: e.email,
            phone: e.phone,
            key: i,
            
          }))

        })
     
      })
      .catch(err => console.log(err));
  }

  filterEmployees = (searchkey) => {
    console.log("***in Filter*******");
    console.log(searchkey);
    console.log(this.state.result);
    var filterResult = this.state.result.filter(person => person.firstName === searchkey)

    this.setState({
      result:filterResult
      
    })

   
  }


  handleFormSubmit = event => {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;
    console.log("**********");
    console.log(value);
    console.log(name);

    //filter function
    this.filterEmployees(value);
    this.setState({

      [name]: value

    });
    this.filterEmployees(value);
    this.filterEmployees(this.state.search);

  };


  handleInputChange = event => {
    event.preventDefault();
    console.log(event);
    const value = event.target.value;
    const name = event.target.name;
    console.log("**********");
    console.log(value);
    console.log(name);
    this.setState({

      [name]: value

    });
        
  };

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2>Employee Directory</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <SearchBar
              value={this.state.search}
               handleInputChange={this.handleInputChange}
               handleFormSubmit={this.handleFormSubmit}
            />
          </div>
        </div>

        <div className="row">
          <table className="table">
            <tr className="title-col">
            <th scope="col">Picture</th>
              <th>First Name</th>
              <th scope="col">Last Name </th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
            </tr>
            {[...this.state.result].map((item) =>
              <EmployeeInfo
              picture={item.picture}
                firstName={item.firstName}
                lastName={item.lastName}
                email={item.email}
                phone={item.phone}
                key={item.key}
              />
            )}

          </table>
        </div>


      </div>
    );
  }
}

export default ListResults;