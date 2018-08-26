import React from 'react';
import {
    Button,
    StyleSheet,
    View,
} from 'react-native';
import {PropTypes} from 'prop-types';


const FRIEND       = 0;
const ACQUAINTANCE = 1;
const TOUCHPOINT   = 2;

const BucketSelector = (props) => {
    return (
        <View style={styles.container}>
            <Button
                onClick={props.setPriority.bind(FRIEND)}
                title="1"
                color="#2980b9"
            />
            <Button
                onClick={props.setPriority.bind(ACQUAINTANCE)}
                title="2"
                color="#27ae60"
            />
            <Button
                onClick={props.setPriority.bind(TOUCHPOINT)}
                title="3"
                color="#16a085"
            />
        </View>
    );
};

BucketSelector.propTypes = {
    setPriority: PropTypes.function,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default BucketSelector;