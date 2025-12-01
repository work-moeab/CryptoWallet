import loader from '@src/assets/loader'
import LottieView from 'lottie-react-native'
import * as React from 'react'
import { View } from 'react-native'
import styles from './styles'

const SplashScreen: React.FC<ISplashScreenProps> = ({ onAnimationEnd }) => {
  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        source={loader.LOADER_JSON}
        loop
        style={styles.animation}
        resizeMode="cover"
        onAnimationFinish={onAnimationEnd}
      />
    </View>
  )
}

export default SplashScreen
