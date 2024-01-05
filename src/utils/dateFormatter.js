 export const getMaxDate=()=>{
 let year=new Date().getFullYear()
 console.log(year)
 let month=new Date().getMonth()+1
 console.log(month)
 let day=new Date().getDate()<10?"0"+new Date().getDate():new Date().getDate()
 console.log(day)
 console.log(`"${year}-${month}-${day}"`)
 console.log(month)
 return `${year}-${month}-${day}`
}
