import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect }  from 'react-redux';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { fetchCalenderResults } from '../utils/api';
import UdaciFitnessCalender from 'udacifitness-calendar-fix';

// This component will keep the track data from user's previous submissions in calendar form
// This calendar has an issue with the package from the udacity course so need to add the package as above "udacifitness-calendar-fix";

class History extends Component{
    componentDidMount(){
        const { dispatch } = this.props;
        fetchCalenderResults()
        .then((entries)=>dispatch(receiveEntries(entries)))
        .then(({entries})=>{
            if(!entries[timeToString()]){
                dispatch(addEntry({
                    [timeToString]: getDailyReminderValue()
                }))
            }
        })
    }
    renderItem = ({today, ...metrics}, formattedDate, key)=>(
        <View>
        {today
            ? <Text>{JSON.stringify(today)}</Text>
            : <Text>{JSON.stringify(metrics)}</Text>
        }
        </View>
    )
    renderEmptyDate(formattedDate){
        return(
            <View>
                <Text>No Data for this day</Text>
            </View>
        )
    }
    render(){
        const { entries } = this.props;
        return (
            <UdaciFitnessCalender 
                items={entries}
                renderItem={this.renderItem}
                renderEmptyDate={this.renderEmptyDate}
            />
        )
    }
}

function mapStateToProps(entries){
    return {
        entries
    }
}
export default connect(mapStateToProps)(History);