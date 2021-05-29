import React from 'react'
import { useState, useEffect } from "react"
import axios from "axios"
function Form() {
    const [state, setState] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        passwordAgain: "",
    })

    const { name, surname, email, password, passwordAgain } = state
    const [error, setError] = useState("")

    function inputHandler(event) {
        const i = event.target.value
        setState({
            ...state,
            [event.target.name]: i
        })
    }
    function submitHandler(event) {
        event.preventDefault()

        if (password?.length < 6) {
            setError("Sifre en az 6 reqem olmalidir")
        }
        if (password?.length != passwordAgain?.length) {
            setError("Yeniden parolu duzgun daxil edin!")
        }

        fetch(
            "http://40.127.175.214:8001/api/auth/register", //Method POST
            {
                method: "POST",
                body: JSON.stringify({
                    ...state
                }
                ),
                headers: {
                    "content-type": "application/json; charset=UTF-8"
                }
            }
        )
            .then(a => a.json()).then(a => console.log(a))

    }
    return (
        <div>
            <form>
                <div>
                    <label>Name:</label>
                    <input onChange={inputHandler} name="name" placeholder="adinizin daxil edin.." />
                </div>

                <div>
                    <label>Surname:</label>
                    <input onChange={inputHandler} name="surname" placeholder="soyadinizi daxil edin.." />
                </div>

                <div>
                    <label>Email:</label>
                    <input onChange={inputHandler} name="email" placeholder="emaili daxil edin.." />
                </div>

                <div>
                    <label>Password:</label>
                    <input onChange={inputHandler} name="password" placeholder="parolu daxil edin.." />
                </div>

                <div>
                    <label>PasswordAgain:</label>
                    <input onChange={inputHandler} name="passwordAgain" placeholder="parolu yeniden daxil edin.." />
                </div>
                <button onClick={submitHandler} type="submit">Submit</button>
            </form>
            {
                error && <p>{error}</p>
            }
        </div>
    )
}

export default Form
