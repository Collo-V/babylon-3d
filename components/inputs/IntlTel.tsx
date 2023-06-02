import React, {useEffect, useRef, useState} from 'react';
import intlTelInput from "intl-tel-input";
import 'intl-tel-input/build/css/intlTelInput.css'

function IntlTel({value,handleChange,className,id,placeholder}) {
    const input = useRef()
    const [iti,setIti] = useState(undefined)
    const [tempNumber,setTempNumber] = useState('')
    const handleInput = (event)=>{
        let value = event.target.value
        if(value === ''){
            setTempNumber('')
            handleChange('')
            return
        }
        if(!isNaN(value)){
            let code  = iti.getSelectedCountryData().dialCode
            handleChange(`+${code}${value}`)
            setTempNumber(value)
        }else {
            // handleChange('')
            // setTempNumber('')
        }

    }
    const handleValidate = () =>{}
    useEffect(()=>{
        let initialCountry =  "ke"
        if(value && value !== null) {
            let tempInput = document.createElement('input')
            document.body.appendChild(tempInput)
            tempInput.style.display = 'none'
            tempInput.classList.add('hidden')
            let tempI =  intlTelInput(tempInput, {
                initialCountry
            })
            tempI.setNumber(value)
            let country =  tempI.getSelectedCountryData()
            initialCountry = country.iso2
            setTempNumber(value.replace('+'+country.dialCode,''))
            tempI.destroy()
            document.body.removeChild(tempInput)
        }
        let inp = input.current;
        let i= intlTelInput(inp, {
            initialCountry
        })
        setIti(i)
        input.current.addEventListener('countrychange',()=>{
            handleChange(i.getNumber())
        })
        input.current.focus()
        return(()=>{
            i.destroy()
        })
    },[value])
    return (
        <React.Fragment>
            <input className={className}
                   placeholder={placeholder}
                   value={tempNumber}
                   onChange={handleInput}
                   onBlur={handleValidate}
                   id={id}
                   ref={input}
            />
        </React.Fragment>
    );
}

export default IntlTel;
