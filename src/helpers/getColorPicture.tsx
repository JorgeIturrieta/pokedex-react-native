import React from 'react'
import ImageColors from 'react-native-image-colors'

export const  getColorPicture = async (uri:string) => {  

    const colors = await ImageColors.getColors(uri, {fallback:'grey'});
    let color ;     
    if (colors.platform === 'android') {
        color= colors.dominant ;     
    } else {      
        color = colors.background ;   
    }

    return [color]
   
    

}


