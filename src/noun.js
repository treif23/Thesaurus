import React, { Component } from 'react';


export class Noun extends React.Component {

    render() {
        let noun = this.props.noun;
        if (noun.length > 1) {
            return (
                <div id='adj'>
                <strong>Noun : {noun}</strong>
            </div>
            )
        }
        else {
            return (
                <div>
                
                </div>
            );
        }
    }


}