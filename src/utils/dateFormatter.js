 export const getMaxDate=()=>{
 let year=new Date().getFullYear()
 let month=new Date().getMonth()+1
 let day=new Date().getDay()<10?"0"+new Date().getDay():new Date().getDay()
 console.log(`"${year}-${month}-${day}"`)
 console.log(month)
 return `${year}-${month}-${day}`
}
