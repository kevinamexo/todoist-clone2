import {timeFilters} from '../constants'

export const getProjectTitle=(projects, projectId)=>{
    projects.find(project=> project.projectId === projectId)
}

export const filterByTime=(projects, key)=>{
    projects.find(project=> project.key=== key)
}

export const timeFiltersExist= selectedProject=>{
    timeFilters.find(tasks=> tasks.key===selectedProject)
}


export const generatePushId = (() => {
    const PUSH_CHARS =
        '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
    
    const lastRandChars = [];
    
    return function() {
        let now = new Date().getTime();
    
        const timeStampChars = new Array(8);
        for (var i = 7; i >= 0; i--) {
        timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
        now = Math.floor(now / 64);
        }
    
        let id = timeStampChars.join('');
    
        for (i = 0; i < 12; i++) {
        id += PUSH_CHARS.charAt(lastRandChars[i]);
        }
    
        return id;
    };
})();


export const generateTaskPushID = (()=> {
    // Modeled after base64 web-safe chars, but ordered by ASCII.
    var PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
  
    // Timestamp of last push, used to prevent local collisions if you push twice in one ms.
    var lastPushTime = 0;
  
    // We generate 72-bits of randomness which get turned into 12 characters and appended to the
    // timestamp to prevent collisions with other clients.  We store the last characters we
    // generated because in the event of a collision, we'll use those same characters except
    // "incremented" by one.
    var lastRandChars = [];
  
    return function() {
      var now = new Date().getTime();
      var duplicateTime = (now === lastPushTime);
      lastPushTime = now;
  
      var timeStampChars = new Array(8);
      for (var i = 7; i >= 0; i--) {
        timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
        // NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
        now = Math.floor(now / 64);
      }
      if (now !== 0) throw new Error('We should have converted the entire timestamp.');
  
      var id = timeStampChars.join('');
  
      if (!duplicateTime) {
        for (i = 0; i < 12; i++) {
          lastRandChars[i] = Math.floor(Math.random() * 64);
        }
      } else {
        // If the timestamp hasn't changed since last push, use the same random number, except incremented by 1.
        for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
          lastRandChars[i] = 0;
        }
        lastRandChars[i]++;
      }
      for (i = 0; i < 12; i++) {
        id += PUSH_CHARS.charAt(lastRandChars[i]);
      }
      if(id.length != 20) throw new Error('Length should be 20.');
  
      return id;
    };
  })();


export const Colors=[ 
  {name:"aliceblue", hex:'#f0f8ff'},{name:"antiquewhite",hex:"#faebd7"},{name:"aqua",hex:"#00ffff"},{name:"aquamarine",hex:"#7fffd4"},{name:"azure",hex:"#f0ffff"},
  {name:"beige", hex:"#f5f5dc"},{name:"bisque", hex:"#ffe4c4"},{name:"black", hex:"#000000"},{name:"blanchedalmond", hex:"#ffebcd"},{name:"blue", hex:"#0000ff"},{name:"blueviolet", hex:"#8a2be2"},{name:"brown", hex:"#a52a2a"},{name:"burlywood", hex:"#deb887"},
  
  
  
  // "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
  // "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
  // "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
  // "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",

]
// export const Colors ={
//     "aliceblue":'#f0f8ff',"antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
//     "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
//     "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
//     "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
//     "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
//     "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
//     "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
//     "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
//     "honeydew":"#f0fff0","hotpink":"#ff69b4",
//     "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
//     "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
//     "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
//     "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
//     "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
//     "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
//     "navajowhite":"#ffdead","navy":"#000080",
//     "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
//     "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
//     "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
//     "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
//     "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
//     "violet":"#ee82ee",
//     "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
//     "yellow":"#ffff00","yellowgreen":"#9acd32"}

export const names= Object.keys(Colors)
export const hexCodes= Object.values(Colors)
