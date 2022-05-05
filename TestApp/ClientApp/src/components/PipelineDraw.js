import React, { Component } from 'react';
import './PipelineDraw.css';

export class PipelineDraw extends Component {
    static displayName = PipelineDraw.name;

    render() {
        return (
            <div className="mainContainer">
                <div className="canvasContainer">
                    <canvas id="canvas" width="740" height="425" onMouseDown={e => {
                        let nativeEvent = e.nativeEvent;
                        HandleMouseDown(nativeEvent);
                    }}
                        onMouseUp={e => {
                            let nativeEvent = e.nativeEvent;
                            HandleMouseUp(nativeEvent);
                        }}
                        onMouseMove={e => {
                            let nativeEvent = e.nativeEvent;
                            HandleMouseMove(nativeEvent);
                        }}
                    ></canvas>
                </div>
                <div className="buttonsContainer">
                    <div>
                        <button className="button" onClick={SetAddPointActive}>Добавить узел</button>
                    </div>
                    <div>
                        <button className="button" onClick={DeleteSelectedPoint}>Удалить узел</button>
                    </div>
                    
                </div>
            </div>
        );
    }
}

let AddPointActive = false;
let points = new Array();
let selectedNumber = -1;
let mouseDown = false;
let downOnSelected = false;


function SetAddPointActive() {
    AddPointActive = true;
    console.log("Add active");
}

function HandleMouseDown(event) {
    mouseDown = true;
    if (AddPointActive) {
        var x = event.offsetX;
        var y = event.offsetY;
        AddPoint(x, y);
        DrawPipeline();
        AddPointActive = false;
    }
    else {
        x = event.offsetX;
        y = event.offsetY;
        downOnSelected = TrySelectPoint(x, y);
    }
    
}

function HandleMouseUp() {
    mouseDown = false;
    downOnSelected = false;
}

function HandleMouseMove(event) {
    if (mouseDown) {
        if (downOnSelected) {
            var x = event.offsetX;
            var y = event.offsetY;
            var point = points[selectedNumber];
            point.x = x;
            point.y = y;
            DrawPipeline();
        }
    }  
}

function AddPoint(x, y) {
    var point = { x, y };
    points.push(point);
}

function TrySelectPoint(x, y) {
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        if (x >= point.x - 5 && x <= point.x + 5 && y >= point.y - 5 && y <= point.y + 5) {
            selectedNumber = i;
            DrawPipeline();
            return true;
        }
    }
    return false;
}

function DeleteSelectedPoint() {
    if (selectedNumber !== -1 && selectedNumber === 0 || selectedNumber === points.length - 1) {
        points.splice(selectedNumber, 1);
        selectedNumber = -1;
        DrawPipeline();
    }
        
    
}

function DrawPipeline() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (points.length > 0) {
        DrawLines();
    }
    for (var i = 0; i < points.length; i++) {
        if (i === selectedNumber)
            DrawPoint(points[i].x, points[i].y, "red");
        else
            DrawPoint(points[i].x, points[i].y, "black");
    }
    
}

function DrawPoint(x, y, color) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, getRadians(360));
    ctx.fillStyle = color;
    ctx.moveTo(x, y);
    ctx.fill();
}

function DrawLines() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (var i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
}

function getRadians(degrees) {
    return (Math.PI / 180) * degrees;
}