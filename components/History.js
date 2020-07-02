import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { connect }  from 'react-redux';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { fetchCalenderResults } from '../utils/api';
import UdaciFitnessCalender from 'udacifitness-calendar-fix';
import { white } from '../utils/colors';
import DateHeader from './DateHeader';
import MetricCard from './MetricCard';
import { AppLoading } from 'expo';

// This component will keep the track data from user's previous submissions in calendar form
// This calendar has an issue with the package from the udacity course so need to add the package as above "udacifitness-calendar-fix";

class History extends Component{
    state ={
        ready:false,
    }
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
        .then(()=>{this.setState(()=>({ready:true}))})
    }
    renderItem = ({today, ...metrics}, formattedDate, key)=>(
        <View style={styles.item}>
        {today
            ? <View>
                <DateHeader date={formattedDate}/>
                <Text style = {styles.noDataText}>
                    {today}
                </Text>   
            </View>
            : <TouchableOpacity onPress={()=> this.props.navigation.navigate(
                'EntryDetail',
                { entryId : key}
            )}>
                    <MetricCard metrics={metrics} date={formattedDate}/>
            </TouchableOpacity>
        }
        </View>
    )
    renderEmptyDate(formattedDate){
        return(
            <View style={styles.item}>
                <DateHeader date={formattedDate}/>
                <Text style={styles.noDataText}>
                    You didn't log any data on this day.
                </Text>
            </View>
        )
    }
    render(){
        const { entries } = this.props;
        const { ready } = this.state;
        if(ready === false){
            return <AppLoading />
        }
        return (
            <UdaciFitnessCalender 
                items={entries}
                renderItem={this.renderItem}
                renderEmptyDate={this.renderEmptyDate}
            />
        )
    }
}

const styles= StyleSheet.create({
    item:{
        backgroundColor:white,
        borderRadius: Platform.OS === 'ios' ? 16:2, 
        padding:20,
        marginLeft:10,
        marginRight:10,
        marginTop:17,
        justifyContent:'center',
        shadowRadius:3,
        shadowOpacity:0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset:{
            width:0,
            height:3,
        }
    },
    noDataText:{
        fontSize:20,
        paddingTop:20,
        paddingBottom:20,
    }
})

function mapStateToProps(entries){
    return {
        entries
    }
}
export default connect(mapStateToProps)(History);