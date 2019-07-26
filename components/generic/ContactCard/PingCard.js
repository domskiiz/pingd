import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';

import addContact from '../../../api/redux/actions/addContact';
import {connect} from 'react-redux';

import BucketSelector from '../../ContactCard/BucketSelector';
import ContactInfo from '../../ContactCard/ContactInfo';
import Theme from '../../Theme';


export default class PingCard extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     flipped: false,
        //     priority: -1,
        // };
        //
        // this.flip = this.flip.bind(this);
        // this.setPriority = this.setPriority.bind(this);
    }

    // flip() {
    //     this.setState({flipped: !this.state.flipped});
    // }

    // setPriority(priority) {
    //     if (priority == this.state.priority) {
    //         this.setState({priority: -1});
    //         return;
    //     }
    //
    //     const contact = {
    //         firstName: this.props.firstName,
    //         lastName: this.props.lastName,
    //         phone: this.props.phoneNumber,
    //     };
    //
    //     var daysUntil = Math.floor(Math.random() * priority) + 1;
    //
    //     this.props.addContact(contact, priority, daysUntil);
    //     this.setState({priority: priority});
    // }

    // // TODO: this might not even be needed, but the default phone numbers
    // // TODO: returned by react-native-contacts are in a weird-ass format
    // formatPhoneNumber(phoneNumber) {
    //     let digits = '';
    //     for (let i = 0; i < phoneNumber.length; i++) {
    //         let ch = phoneNumber[i];
    //         if (ch >= '0' && ch <= '9')
    //             digits += ch;
    //     }
    //
    //     // TODO: this is janky, won't work for longer country codes
    //     if (digits.length === 11) {
    //         let countryCode = digits[0];
    //         let areaCode = digits.slice(1, 4);
    //         let number = `${digits.slice(4, 7)}-${digits.slice(7, 11)}`;
    //         return `+${countryCode} (${areaCode}) ${number}`;
    //     } else if (digits.length === 10) {
    //         let areaCode = digits.slice(0, 3);
    //         let number = `${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    //         return `(${areaCode}) ${number}`;
    //     } else if (digits.length === 7) {
    //         return `${digits.slice(0, 3)}-${digits.slice(3, 7)}`;
    //     } else {
    //         return digits;
    //     }
    // }

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
        let name = `${this.props.firstName} ${this.props.lastName}`;

        return(
          <View style={this.getCardStyle()}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}> {this.getSubtitle()} </Text>
          </View>
        )
        // let phoneNumber = this.props.phoneNumber;  // TODO: format?
        //
        // let card = null;
        // if (this.state.flipped)
        //     card = (
        //         <BucketSelector
        //             priority={this.state.priority}
        //             flip={this.flip}
        //             setPriority={this.setPriority}
        //         />
        //     );
        // else
        //     card = (
        //         <ContactInfo
        //             name={name}
        //             phoneNumber={phoneNumber}
        //             thumbnail={this.props.thumbnail}
        //         />
        //     );
        //
        // let containerStyle = [styles.container];
        // if (!this.state.flipped && this.state.priority >= 0)
        //     containerStyle.push(this.getBorderStyle());
        //
        // return (
        //     <TouchableOpacity style={containerStyle} onPress={this.flip}>
        //         {card}
        //     </TouchableOpacity>
        // );
    }
}

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

// PingCard.propTypes = {
//     firstName: PropTypes.string.isRequired,
//     lastName: PropTypes.string.isRequired,
//     phoneNumber: PropTypes.string.isRequired,
//     thumbnail: PropTypes.string.isRequired,
//     addContact: PropTypes.func,
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         height: 80,
//         marginTop: 10,
//         marginBottom: 10,
//         backgroundColor: Theme.LightBlue,
//         shadowColor: Theme.DarkBlue,
//         shadowOpacity: 0.3,
//         shadowOffset: {width: 0, height: 3},
//         shadowRadius: 6,
//     },
//     title: {
//       padding: 10,
//       paddingBottom: 0,
//       fontSize: 18,
//       height: 44,
//       textAlign: 'center',
//       fontWeight: 'bold',
//     },
//     subtitle: {
//       paddingTop: 2,
//       paddingBottom: 10,
//       fontSize: 9,
//       height: 22,
//       textAlign: 'center',
//     },
// });


// const mapStateToProps = () => {
//     return { };
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         // addContact: (c, p, d) => dispatch(addContact(c, p, d)),
//     };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(PingCard);
