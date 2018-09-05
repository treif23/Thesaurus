import React, { Component } from 'react';


export class Adjective extends React.Component {

    render() {
        let adj = this.props.adj;
console.log(adj, 'ADJ COMP');
        if (adj.length > 1) {
            return (
                <div id='adj'>
                <strong>Adjective : {adj}</strong>
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