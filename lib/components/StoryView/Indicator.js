import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Colors } from '../../theme';
import styles from './styles';
const Indicator = (props) => (React.createElement(ActivityIndicator, { style: styles.loaderStyle, pointerEvents: "none", color: Colors.loaderColor, size: 'large', ...props }));
export default Indicator;
//# sourceMappingURL=Indicator.js.map