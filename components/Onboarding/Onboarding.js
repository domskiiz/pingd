import React, {Component} from 'react';
import {
    View,
    Text,
    Button,
} from 'react-native';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import * as appActions from '../../api/redux/actions/appActions/changeRoot';

class Onboarding extends Component {
    constructor(props) {
        super(props);
    }

    _startApp = () => {
        this.props.startApp();
    }

    render() {
        return (
            <View>
                <Text>
                    Onboarding
                </Text>
                <Button
                    title="Get started"
                    onPress={() => this._startApp()}
                />
            </View>
        );
    }
}

Onboarding.propTypes = {
    startApp: PropTypes.function,
};


const mapStateToProps = () => {
    return { };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startApp: () => dispatch(appActions.login()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
