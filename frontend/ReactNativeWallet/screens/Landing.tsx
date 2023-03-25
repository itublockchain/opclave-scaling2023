import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Logo from '../assets/logo.png';
import FaceIdLogo from '../assets/faceid-logo.png';

import {Colors, Fonts} from './style';
import {getAccount, setAccount} from '../chain/accountStore';
import {Enclave, UserOperation} from '../lib';
import axios from 'axios';

const LandingState = {
  Welcome: 0,
  Deployment: 1,
} as const;

type Navigation = {
  navigate: (arg0: string) => void;
};

type WelcomeProps = {
  navigation: Navigation;
  setLandingState: React.Dispatch<React.SetStateAction<number>>;
};

type LandingProps = {
  navigation: Navigation;
};

async function onLandingPress(
  navigation: Navigation,
  setTransferState: React.Dispatch<React.SetStateAction<number>>,
) {
  const account = await getAccount();

  if (account != null) {
    navigation.navigate('Menu');
    return;
  }

  setTransferState(LandingState.Deployment);

  try {
    // const deployOp = {} as UserOperation.Operation;
    // const bundlerResponse: {jobId: string} = await axios
    //   .post('http://localhost:3000/broadcast-txs', {
    //     txs: [deployOp],
    //   })
    //   .then(resp => resp.data);

    // console.log(bundlerResponse);
    // await setAccount(deployOp.sender);
    
    // Trigger the enclave
    await Enclave.getPublicKey();

    // Sleep 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));

    navigation.navigate('Menu');
  } catch (e) {
    console.error(e);
    Alert.alert('Error', 'Failed to deploy wallet');
  }
}

const Deployment = () => {
  return (
    <>
      <View
        style={{
          backgroundColor: Colors.dark.background,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{...styles.bigBold, paddingBottom: 15}}>
          Deploying your account
        </Text>

        <ActivityIndicator color="#e6523e" size="large" />
      </View>
    </>
  );
};

const Welcome = (props: WelcomeProps) => {
  return (
    <>
      <View style={styles.middleSection}>
        <Text style={styles.bigRegular}>Let's set up your wallet</Text>
        <TouchableOpacity
          onPress={() =>
            onLandingPress(props.navigation, props.setLandingState)
          }>
          <View
            style={{
              marginTop: 10,
              backgroundColor: 'white',
              opacity: 0.8,
              borderRadius: 10,
              paddingHorizontal: 5,
              paddingVertical: 5,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={FaceIdLogo}
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
              }}
            />
            <Text
              style={{
                fontSize: 24,
                fontFamily: Fonts.bold,
                color: 'black',
                paddingHorizontal: 10,
              }}>
              Continue
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.lowerSection}>
        <TouchableOpacity onPress={() => Alert.alert('Not available yet!')}>
          <Text style={styles.smallThin}>Already have a wallet?</Text>
          <Text style={styles.smallRegular}>
            Recover wallet using Guardians
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const Landing = (props: LandingProps) => {
  const [landingState, setLandingState] = React.useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.upperSection}>
        <View>
          <Image
            source={Logo}
            style={{width: 120, height: 120, marginBottom: 10}}
          />
          <Text
            style={{
              textAlign: 'center',
              fontFamily: Fonts.bold,
              color: Colors.dark.text,
              fontSize: 24,
            }}>
            OPCLAVE
          </Text>
        </View>
      </View>

      {landingState === 0 && (
        <Welcome
          navigation={props.navigation}
          setLandingState={setLandingState}
        />
      )}
      {landingState === 1 && <Deployment />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {height: '100%', backgroundColor: Colors.dark.background},
  upperSection: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleSection: {
    flex: 2,
    alignItems: 'center',
  },
  lowerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 15,
    backgroundColor: Colors.dark.accent,
    color: Colors.dark.text,
    overflow: 'hidden',
    borderRadius: 3,
    shadowColor: 'white',
  },
  bigBold: {
    color: Colors.dark.text,
    fontSize: 24,
    fontFamily: Fonts.bold,
  },
  bigRegular: {
    color: Colors.dark.text,
    fontSize: 32,
    fontFamily: Fonts.regular,
  },
  bigThin: {
    color: Colors.dark.text,
    fontSize: 24,
    fontFamily: Fonts.thin,
  },
  smallThin: {
    textAlign: 'center',
    color: Colors.dark.text,
    fontSize: 16,
    fontFamily: Fonts.thin,
  },
  smallRegular: {
    textAlign: 'center',
    color: Colors.dark.text,
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
});

export default Landing;
