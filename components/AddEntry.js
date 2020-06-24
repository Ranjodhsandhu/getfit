import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import { getMetricMetaInfo, timeToString} from '../utils/helpers';
import FitSlider from '../components/FitSlider';
import FitStepper from '../components/FitStepper';
import DateHeader from  '../components/DateHeader';

function SubmitBtn({onPress}){
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <Text>SUBMIT</Text>
        </TouchableOpacity>
    )
}
export default class AddEntry extends Component{
    state = {
        run:0,
        bike:0,
        swim:0,
        sleep:0,
        eat:0,

    }
    increment = (metric)=>{
        const {max, step} = getMetricMetaInfo(metric);
        this.setState((state)=>{
            const  count = state[metric] + step;
            return {
                ...state,
                [metric]: count > max ? max : count,
            }
        })
    }
    decrement = (metric)=>{
        this.setState((state)=>{
            const  count = state[metric] - getMetricMetaInfo(metric).step;
            return {
                ...state,
                [metric]: count < 0 ? 0 : count,
            }
        })
    }
    slide = (metric,value)=>{
        this.setState(()=>({
            [metric]:value
        }))
    }
    submit = ()=>{
        const key = timeToString();
        const entry = this.state;

        // update Redux
        this.setState(()=>({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0,
        }))
        // navigate to home


        // save to 'DB'

        // clear the local notification
    }
    render(){
        const metaInfo = getMetricMetaInfo();

        return(
            <View>  
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <DateHeader date={new Date().toLocaleDateString()} />
        <Text>{JSON.stringify(this.state)}</Text>
                {Object.keys(metaInfo).map((key)=>{
                    const {getIcon ,type , ...rest} = metaInfo[key];
                    const value = this.state[key];
                    return(
                        <View key={key}>
                            {getIcon()}
                            {type === 'slider'
                                ? <FitSlider
                                        value={value}
                                        onChange = {(value)=>this.slide(key,value)}
                                        {...rest}
                                    />
                                : <FitStepper
                                    value={value}
                                    onIncrement = {()=>this.increment(key)}
                                    onDecrement = {()=>this.decrement(key)}
                                    {...rest}
                                    />
                            }
                        </View> 
                    )
                })}
                <SubmitBtn onPress={this.submit}/>
            </View>
        )
    }
}