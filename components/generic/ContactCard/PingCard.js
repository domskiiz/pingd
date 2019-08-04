import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import changeDays from '../../../api/redux/actions/changeContact';

import BucketSelector from '../../ContactCard/BucketSelector';
import ContactInfo from '../../ContactCard/ContactInfo';
import Theme from '../../Theme';
import SendSMS from 'react-native-sms';
import Swipeable from 'react-native-swipeable-row';


class PingCard extends Component {
    constructor(props) {
        super(props);

        swipeable = null;
    }

    sendText(phoneNumber){
      // console.log(phoneNumber);
      console.log(SendSMS); // It DEFINITELY EXISTS!!
      // console.log(typeof SendSMS)

    //   SendSMS.send({
    //     body: 'The default body of the SMS!',
    //     recipients: ['0123456789', '9876543210'],
    //     successTypes: ['sent', 'queued'],
    //     allowAndroidSendWithoutReadPermission: true
    // }, (completed, cancelled, error) => {
    //
    //     console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
    //
    // });

    }

    handleUserBeganScrollingParentView() {
      this.swipeable.recenter();
    }

    getSubtitle(){
      var subtitle = `${this.props.daysUntil} days until ping`;

      if (this.props.daysUntil == 1){
        subtitle = `Tomorrow's ping`;
      }
      else if (this.props.daysUntil == 0){
        subtitle = `Today's ping`;
      }
      else if (this.props.daysUntil < 0){
        days = Math.abs(this.props.daysUntil);
        subtitle = `${days} days overdue...`;
      }

      return subtitle;
    }

    getSwipeStyle(color){
      var style = {
          marginBottom: 10,
          backgroundColor: color,
          flex:1,
          justifyContent: 'center',
      };

      return style;
    }

    changeDaysUntil(type){

      console.log('Function Called!');
      this.props.changeDays(this.props.phone,type)
    }

    getCardStyle() {

      var grey = 24;
      if (this.props.index < 100) grey = 224 - 2*this.props.index;
      var color = `rgb(${grey},${grey},${grey})`;

        var style = {
            borderColor: '',
            borderWidth: 4,
            marginBottom: 10,
            backgroundColor: color
        };

        if (this.props.priority === 30) style.borderColor = Theme.Green;
        else if (this.props.priority === 90) style.borderColor = Theme.Blue;
        else if (this.props.priority === 360) style.borderColor = Theme.Purple;

        if (this.props.daysUntil < 10) {
          style.borderColor = '#C7070F';

        }



        return style;
    }

    render() {
        const leftContent = <View style={this.getSwipeStyle('#53d769')}>
                                  <Text style={{textAlign:'right'}}>We{"\n"}Connected!</Text></View>;
        const rightContent = <View style={this.getSwipeStyle('#fd9426')}>
                                  <Text>Snooze{"\n"}Ping</Text></View>;
        let name = `${this.props.firstName} ${this.props.lastName}`;

        return(
            <Swipeable onRef={ref => this.swipeable = ref}
                       leftContent={leftContent}
                       onLeftActionRelease={() => this.changeDaysUntil('pingd')}
                       rightContent={rightContent}
                       onRightActionRelease={() => this.changeDaysUntil('snooze')}>
              <TouchableOpacity style={this.getCardStyle()}
                                onLongPress={() => this.sendText(this.props.phone)}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.subtitle}> {this.getSubtitle()} </Text>
              </TouchableOpacity>
            </Swipeable>
        )
    }
}

PingCard.propTypes = {
    changeDays: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bdc3c7',
        margin: 10,
        flex: 1,
        paddingTop: 22
    },
    card:{
      borderWidth: 4,
      marginBottom: 10,
    },
    title: {
      padding: 10,
      paddingBottom: 0,
      fontSize: 18,
      height: 44,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    subtitle: {
      paddingTop: 2,
      paddingBottom: 10,
      fontSize: 9,
      height: 22,
      textAlign: 'center',
    },
});

const mapStateToProps = () => {
    return { };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeDays: (phone, type) => dispatch(changeDays(phone, type)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PingCard);
