/* As expected, 
   the JavaScript language, gives us the posibility of 
   locating and acquiring (deep nested) property values or indexed values.
   1. For the arrays, having in mind that they are INDEXED data structures, the way of acquiring an array member
      is by finding it by its index. 
      NEVER FORGET: Arrays are zero indexed data structures.
   2. As for the Objects, since they are key-value pairs, the acquiring of a member is by using the keys.
      There are two syntax options: 
       - dot-notation and 
       - bracket-notation.
*/

/* Acquire the second element of the array myVarsArray and assign it to the variable with name myVar */
const myVarsArray = ["var_1", "var_2", "var_3", "var_4"];
const myVar = myVarsArray[1];
//Output: "var_2"

/* Acquire the second elemtn of the nested object objNames of the object myVarsObj and assign it to the variable with name myObjVar */
const myVarsObj = {
  objNames: ["name_1", "name_2", "name_3"],
};
const myObjVar = myVarsObj.objNames[1];
//Output: "name_2"