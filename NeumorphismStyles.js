import {StyleSheet} from 'react-native';

const NeumorphismStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E0E5EC',
  },
  neuContainer: {
    backgroundColor: '#E0E5EC',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#E0E5EC',
    shadowOffset: {
      width: -6,
      height: -6,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  innerShadow: {
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
});

export default NeumorphismStyles;
