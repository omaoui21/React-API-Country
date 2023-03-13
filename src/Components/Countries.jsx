import axios from 'axios'
import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export const Countries = () => {
    const [countries,setCountries] = useState([])
    const search = useRef("")

    const GetAllCountries = async() => {
        const response = await axios.get("https://restcountries.com/v3.1/all")

        try {
            setCountries(response.data)
        } catch (error) {
            console.log(error)
        }

    }

    const SearchCountries = async(e) => {
        e.preventDefault();
        const searching = search.current.value;
        const response = await axios.get(`https://restcountries.com/v3.1/name/${searching}`)

        try {
            setCountries(response.data)
        } 
        catch (error) {
            console.log(error)
        }

    }

    const reset = async(e) => {
        e.preventDefault();
        const response = await axios.get("https://restcountries.com/v3.1/all")

        try {
            setCountries(response.data)
            search.current.value=""
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(()=>{
        GetAllCountries()
    },[])
  return (
    <>

    <div className="container my-5">
        <div className="row">
            <div className="col-md-6">
            <h1>Lists Countries</h1>
            </div>
            <div className="col-md-6">
            <form className="d-flex" onSubmit={SearchCountries}>
                <input ref={search} className="form-control me-sm-2" type="search" placeholder="Search" required/>
                <button className="btn btn-primary my-2 my-sm-0" type="submit">Search</button>
                <button onClick={reset} className="btn btn-primary my-2 my-sm-0 ms-2" type="reset">Reset</button>
            </form>
            </div>
        </div>
        <div className="row my-5">
            {countries.map((country,index)=>(
                <div key={index} className="col-md-4">
                <div className="card">
                    <img className="card-img-top" src={country.flags.png} alt=""/>
                    <div className="card-body">
                        <h4 className="card-title">{country.name.official}</h4>
                        <p className="card-text">{country.capital}</p>
                    </div>
                </div>
                </div>
            ))}
            
        </div>
    </div>
    
    </>
  )
}
