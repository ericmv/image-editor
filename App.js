import React, {useState, useEffect} from 'react';
import { StyleSheet, View} from 'react-native';

import ImagePicker from './src/components/ImagePicker';
import Crop from './src/components/Crop';
import Picture from './src/components/Picture';

const handleCrop = (croppedImage) => {
    console.log(croppedImage);
}

export default function App() {
    const [image, setImage] = useState(null);

    const handleClose = () => {
        setImage(null);
    }

    return image ?
        <View style={styles.sampleContainer}>
            <Crop
                uri={image.uri}
                width={image.width}
                height={image.height}
                scaleX={5}
                scaleY={7}
                onCrop={handleCrop}
                onClose={handleClose}
            />
        </View> :
        <ImagePicker onConfirm={setImage}/>

}

const styles = StyleSheet.create({
    sampleContainer: {
        // flex: 1,
        alignSelf: 'center',
        width: 250,
        height: 350,
        backgroundColor: 'grey',
    },
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'blue'
    },
    top: {
        flex: 1,
        backgroundColor: 'green',
    },
    bottom: {
        flex: 2,
        backgroundColor: 'red'
    }
})
//

// return image ?
//     <View style={styles.sampleContainer}>
//         <Crop
//             uri={image.uri}
//             width={image.width}
//             height={image.height}
//             scaleX={5}
//             scaleY={7}
//             onCrop={handleCrop}
//             onClose={handleClose}
//         />
//     </View> :
//     <ImagePicker onConfirm={setImage}/>
