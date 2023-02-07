/*
    error handling for withTreble higher-order component
*/

// import {IWithTreble} from '../interfaces';

// const errorHandling: IWithTreble = (Component, options) => {
    
//     try{
//         //does component prop exist
//         if(!(Component)){
//             throw new Error('withTreble Component parameter is missing.');
//         }
        
//         //check component type
//         if(typeof Component !== 'function'){
//             throw new TypeError('withTreble Component parameter must be a function');
//         }

//         //check if option parameter exists
//         if(options){

//             //check option type
//             if(typeof options !== 'object'){
//                 throw new TypeError('withTreble options parameter must be an object.')
//             }
            
//             //make sure options parameter props are legitimate
//             let optionsList = ['store']
//             Object.keys(options).forEach((key) => {
//                 if (optionsList.includes(key) !== true) {
//                     throw new Error(`withTreble options property ${key} is not a valid property.`);
//                 }
//             });

//             //check options.store prop type
//             if(options.store !== undefined){
//                 if(typeof options.store !== 'object'){
//                     throw new Error('withTreble options.store property must be an Array')
//                 }
//             }
//         }
//     }catch(error){
//         throw error
//     }
// }
// export default errorHandling;