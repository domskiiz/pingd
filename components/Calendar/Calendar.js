import React, {Component} from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {
    View,
    Text,
} from 'react-native';

export default class PingList extends Component {
    constructor(props){
      super(props);

      this.state = {
        selectedDate: '2018-08-16',
        // The real birthday list dates currently come out as "20180826/r"
        // This can be replaced with appropriate JSON file later
        birthdays: {"0":{"date":"2018-08-23\r","title":"Lauren Bell's birthday\r"},
        "1":{"date":"2018-08-25","title":"Matt Krawczyk's birthday\r"},
        "2":{"date":"2018-08-02","title":"Kevin Huang's birthday\r"},
        "3":{"date":"2018-08-26","title":"Kedar Gupta's birthday\r"},
        "4":{"date":"2018-08-26","title":"Jesse Garrett's birthday\r"},
        "5":{"date":"2018-08-26","title":"Jayendra Jog's birthday\r"}}
      };
    }
    render() {
      const birthday = {key:'birthday', color: 'blue', selectedDotColor: 'white'};
      const social_event = {key:'event', color: 'green', selectedDotColor: 'white'};
        let dates = {};
        let event_details = [];
        for(i = 0; i < Object.keys(this.state.birthdays).length; i ++){
          // Better way: Save by month, so only interate through month's bdays per click...
          bday = this.state.birthdays[i];
          dates[bday.date] = {dots: [birthday], marked:true};

          if(bday.date === this.state.selectedDate){
            event_details.push(bday.title);
          }
        };
        dates['2018-08-17'] = {dots: [social_event]};
        dates['2018-08-18'] = {dots: [social_event], marked: true, dotColor: 'red', activeOpacity: 0};
        dates['2018-08-19'] = {dots: [social_event, birthday], dotColor: 'green'};
        dates[this.state.selectedDate] = {selected: true, selectedColor: 'blue'};

        return (
          <View>
            <View>
            <Calendar
              horizontal = {true}
              paginEnabled = {true}
              markingType={'multi-dot'}
              onDayPress={(day) => { this.setState({selectedDate: day.dateString}) }}
              onDayLongPress={(day) => {console.log('long selected day', day)}}
              // Specify style for calendar container element. Default = {}
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                height: 350
              }}
              markedDates={dates}
              // Specify theme properties to override specific styles for calendar parts. Default = {}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                dotColor: '#00adf5',
                selectedDotColor: '#ffffff',
                arrowColor: 'orange',
                monthTextColor: 'blue',
                textMonthFontWeight: 'bold',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16
              }}
              />
            <Text>{this.state.selectedDate}</Text>
            <Text>{event_details}</Text>
            </View>
          </View>
        );
    }
}
