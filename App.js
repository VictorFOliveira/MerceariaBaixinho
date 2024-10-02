import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Title from './src/componets/title';
import Login from './src/componets/login';

export default function App() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#F0E68C', '#F0E68C']} style={styles.gradient}>
        <View style={styles.stripe} />
        <View style={[styles.stripe, styles.stripeBottom]} />
      </LinearGradient>
      <Title />
      <Login />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
