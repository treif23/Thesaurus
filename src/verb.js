import React, { Component } from 'react';


export class Verb extends React.Component {

    render() {
        let verb = this.props.verb;
        if (verb.length > 1) {
            return (
                <div id='adj'>
                <strong>Verb : {verb}</strong>
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