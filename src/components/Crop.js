
import React from 'react';
import { PanResponder, StyleSheet, View, Text, Dimensions, Image, ImageEditor, Button } from 'react-native';

class Crop extends React.Component {
    _position = {style:{left: 0, right: 0, top: this.props.topBoundary, bottom: 0}};
    crop = null;
    widthBoundary = 300;
    heightBoundary = 450;

    _previousLeft = 0;
    _previousTop = 0;
    _previousRight = 0;
    _previousBottom = 0;

    _updateNativeStyles() {
        this.crop && this.crop.setNativeProps(this._position);
    }

    _handleStartShouldSetPanResponder = (event, gestureState) => {
         return true;
    }
    _handleMoveShouldSetPanResponder = (event, gestureState) => {
        return true;
    }
    _handlePanResponderGrant = (event, gestureState) => {
    }
    _handlePanResponderMove = (event, gestureState) => {
        const {dx, dy} = gestureState;
        // console.log('dx, dy', dx, dy)
        let moveX;
        let moveY;
        if (dx === 0 && dy === 0) {
            return;
        }
        const left = this._previousLeft + dx;
        const right = this._previousRight + dx;
        const top = this._previousTop + dy;
        const bottom = this._previousBottom + dy;

        this.setLeft(left);
        this.setRight(right);
        this.setTop(top);
        this.setBottom(bottom);

        this._updateNativeStyles();
    };

    _handlePanResponderEnd = (event, gestureState) => {
        const {dx, dy} = gestureState;
        this._previousLeft += dx;
        this._previousRight += dx;
        this._previousTop += dy;
        this._previousBottom += dy;
    };

    // Top Left functions
    _handleTopLeftPanResponderMove = (event, gestureState) => {
        const left = this._previousLeft + gestureState.dx;
        const top = this._previousTop + gestureState.dy;
        this.setLeft(left);
        this.setTop(top);
       this._updateNativeStyles();
    };

    _handleTopLeftPanResponderEnd = (event, gestureState) => {
        this._previousLeft += gestureState.dx;
        this._previousTop += gestureState.dy;
    };

    // Bottom Left functions
    _handleBottomLeftPanResponderMove = (event, gestureState) => {
       const left = this._previousLeft + gestureState.dx;
       const bottom = this._previousBottom + gestureState.dy;
       this.setLeft(left);
       this.setBottom(bottom);
       this._updateNativeStyles();
    };

    _handleBottomLeftPanResponderEnd = (event, gestureState) => {
        this._previousLeft += gestureState.dx;
        this._previousBottom += gestureState.dy;
    };

    // Top Right functions
    _handleTopRightPanResponderMove = (event, gestureState) => {
       const right = this._previousRight + gestureState.dx;
       const top = this._previousTop + gestureState.dy;
       this.setRight(right);
       this.setTop(top);
       this._updateNativeStyles();
    };

    _handleTopRightPanResponderEnd = (event, gestureState) => {
        this._previousRight += gestureState.dx;
        this._previousTop += gestureState.dy;
    };

    // Bottom Right functions
    _handleBottomRightPanResponderMove = (event, gestureState) => {
       const right = this._previousRight + gestureState.dx;
       const bottom = this._previousBottom + gestureState.dy;
       this.setRight(right);
       this.setBottom(bottom);
       this._updateNativeStyles();
    };

    _handleBottomRightPanResponderEnd = (event, gestureState) => {
        this._previousRight += gestureState.dx;
        this._previousBottom += gestureState.dy;
    };


    _cropBoxPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
        onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
        onPanResponderGrant: this._handlePanResponderGrant,
        onPanResponderMove: this._handlePanResponderMove,
        onPanResponderRelease: this._handlePanResponderEnd,
        onPanResponderTerminate: this._handlePanResponderEnd,
    })

    //  Top Left Responder
    _topLeftPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
        onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
        onPanResponderGrant: this._handlePanResponderGrant,
        onPanResponderMove: this._handleTopLeftPanResponderMove,
        onPanResponderRelease: this._handleTopLeftPanResponderEnd,
        onPanResponderTerminate: this._handleTopLeftPanResponderEnd,
    })

    //  Bottom Left Responder
    _bottomLeftPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
        onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
        onPanResponderGrant: this._handlePanResponderGrant,
        onPanResponderMove: this._handleBottomLeftPanResponderMove,
        onPanResponderRelease: this._handleBottomLeftPanResponderEnd,
        onPanResponderTerminate: this._handleBottomLeftPanResponderEnd,
    })

    //  Top Right Responder
    _topRightPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
        onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
        onPanResponderGrant: this._handlePanResponderGrant,
        onPanResponderMove: this._handleTopRightPanResponderMove,
        onPanResponderRelease: this._handleTopRightPanResponderEnd,
        onPanResponderTerminate: this._handleTopRightPanResponderEnd,
    })

    //  Bottom Right Responder
    _bottomRightPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
        onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
        onPanResponderGrant: this._handlePanResponderGrant,
        onPanResponderMove: this._handleBottomRightPanResponderMove,
        onPanResponderRelease: this._handleBottomRightPanResponderEnd,
        onPanResponderTerminate: this._handleBottomRightPanResponderEnd,
    })

    render() {
        const { style, topBoundary, bottomBoundary, handleCrop, height, width } = this.props;
        console.log('style', style);
        console.log('this.props.bottomBoundary', bottomBoundary)
        return (
            <View style={styles.container}>
                <Button style={styles.cropButton} title="Crop" onPress={() => handleCrop(this._position.style.top, this._position.style.right, this._position.style.bottom, this._position.style.left, width, height)}/>
                <View
                    style={style}
                    ref={crop => {
                        this.crop = crop;
                    }}
                >
                    <View style={styles.cropBox} {...this._cropBoxPanResponder.panHandlers}></View>
                    <View style={styles.topLeftCorner} {...this._topLeftPanResponder.panHandlers}></View>
                    <View style={styles.topRightCorner} {...this._topRightPanResponder.panHandlers}></View>
                    <View style={styles.bottomLeftCorner} {...this._bottomLeftPanResponder.panHandlers}></View>
                    <View style={styles.bottomRightCorner} {...this._bottomRightPanResponder.panHandlers}></View>
                </View>
            </View>
        )
    }


    setLeft(left: number) {
        if (left <= 0) {
            this._position.style.left = 0;
        } else if (left >= (this.widthBoundary - this._position.style.right)) {
            this._position.style.left = this.widthBoundary - this._position.style.right;
        } else {
            this._position.style.left = left;
        }
    }
    setRight(right: number) {
        // console.log('right', -right, 'vs', 100 - this._position.style.left)
        if (right >= 0) {
            this._position.style.right = 0;
        } else if (-right >= this.widthBoundary - this._position.style.left) {
            // console.log('got in?')
            this._position.style.right = this.widthBoundary - this._position.style.left;
        } else {
            this._position.style.right = -right;
        }
    }
    setTop(top: number) {
        if (top <= this.props.topBoundary) {
            this._position.style.top = this.props.topBoundary;
        } else {
            this._position.style.top = top;
        }
    }
    setBottom(bottom: number) {
        if (bottom >= this.props.bottomBoundary) {
            this._position.style.bottom = -this.props.bottomBoundary;
        } else {
            this._position.style.bottom = -bottom;
        }
    }
}


const styles = StyleSheet.create({
  crop: {
    // width: 250,
    // height: 350,
    flex: 1,
    // borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,

    opacity: 1
  },
  cropBox: {
     flex: 1,
     backgroundColor: '#D3D3D350',
     // opacity: .4,
     borderWidth: 1,
     borderColor: 'white',
     position: 'absolute',
     left: 0,
     bottom: 0,
     right: 0,
     top: 0,
  },
  cropButton: {
      position: 'absolute',
      top: 10,
      right: 0
  },
  container: {
    flex: 1,
    // position: 'absolute'
  },
  topLeftCorner: {
      position: 'absolute',
      left: -2,
      top: -2,
      width: 25,
      height: 25,
      borderTopWidth: 2,
      borderLeftWidth: 2,
      borderColor: 'white'
  },
  topRightCorner: {
      position: 'absolute',
      right: -2,
      top: -2,
      width: 25,
      height: 25,
      borderTopWidth: 2,
      borderRightWidth: 2,
      borderColor: 'white'
  },
  bottomLeftCorner: {
      position: 'absolute',
      left: -2,
      bottom: -2,
      width: 25,
      height: 25,
      borderBottomWidth: 2,
      borderLeftWidth: 2,
      borderColor: 'white'
  },
  bottomRightCorner: {
      position: 'absolute',
      right: -2,
      bottom: -2,
      width: 25,
      height: 25,
      borderBottomWidth: 2,
      borderRightWidth: 2,
      borderColor: 'white'
  }
});

export default Crop;
