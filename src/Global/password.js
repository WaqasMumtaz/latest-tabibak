const hasNumber = value => {
    return new RegExp(/[0-9]/).test(value);
 }
 const hasMixed = value => {
    return new RegExp(/[a-z]/).test(value) &&
             new RegExp(/[A-Z]/).test(value);
 }
 const hasSpecial = value => {
    return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
 }
 const hasValidLength=value=>{
     console.log('HasLength >>>>>', value.length)
     if(value.length < 8 )
     return false

     else
     return true
 }
 export {
     hasNumber,
     hasMixed,
     hasSpecial,
     hasValidLength
 }