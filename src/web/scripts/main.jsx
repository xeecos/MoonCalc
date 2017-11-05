import React from "react";
import { Slider, Input } from "antd";
import $ from "jquery";
export default class Main extends React.Component {
  constructor(...arg) {
    super(...arg);
    this.state = {
      focus: 300,
      distance: 300,
      moon: { top: 0, left: 0, width: 1, height: 1 },
      man: { bottom: 0, left: 0, height: 1 },
      ground: 0
    };
  }
  componentDidMount() {
    this.updateCalc();
    this.forceUpdate();
  }
  updateCalc() {
    const w = $("#canvas").width();
    const h = $("#canvas").width() / 1.5;
    $("#canvas").height(h);
    const d = 43.27;
    const c = 2 * Math.atan(d / 2 / this.state.focus) * 180 / Math.PI;
    const moonH = 0.5 / c * h;
    const manH =
      h / c * 1 * Math.atan(1.7 / this.state.distance) * 180 / Math.PI;
    this.state.moon.width = isNaN(moonH) ? 1 : moonH;
    this.state.moon.height = isNaN(moonH) ? 1 : moonH;
    this.state.moon.top = isNaN(moonH) ? 1 : (h - moonH) / 2;
    this.state.moon.left = isNaN(moonH) ? 1 : (w - moonH) / 2;
    this.state.man.height = isNaN(manH) ? 1 : manH;
    this.state.man.bottom = isNaN(moonH)
      ? 1
      : (150 + this.state.ground) / 480 * h;
    this.state.man.left = isNaN(moonH) ? 1 : (w - $("#man").width()) / 2;
    $(".background-content").height((150 + this.state.ground) / 480 * h);
  }
  render() {
    this.updateCalc();
    return (
      <div className="container">
        <div className="canvas-content" id="canvas">
          <div className="sky-content" />
          <div className="moon-content">
            <img
              id="moon"
              style={{
                width: this.state.moon.width,
                height: this.state.moon.height,
                top: this.state.moon.top,
                left: this.state.moon.left
              }}
              src={require("../assets/500px.png")}
            />
          </div>
          <div className="man-content">
            <img
              id="man"
              style={{
                height: this.state.man.height,
                bottom: this.state.man.bottom,
                left: this.state.man.left
              }}
              src={require("../assets/body.png")}
            />
          </div>
          <div className="background-content" />
        </div>
        <div className="info-content">
          <div className="info-item">
            <span>相机镜头焦距：</span>
            <span id="focus">300</span>
            <span>mm</span>
            <Slider
              tipFormatter={value => {
                return `${value}mm`;
              }}
              marks={{
                100: {
                  style: {
                    color: "#666"
                  },
                  label: <strong>100mm</strong>
                },
                1200: {
                  style: {
                    color: "#666"
                  },
                  label: <strong>1200mm</strong>
                }
              }}
              min={100}
              max={1200}
              defaultValue={300}
              step={20}
              onChange={(v => {
                $("#focus").html(v);
                this.setState({ focus: v });
              }).bind(this)}
            />
          </div>
          <div className="info-item">
            <span>被摄人的距离：</span>
            <span id="distance">300</span>
            <span>m</span>
            <Slider
              tipFormatter={value => {
                return `${value}m`;
              }}
              marks={{
                25: {
                  style: {
                    color: "#666"
                  },
                  label: <strong>25m</strong>
                },
                1200: {
                  style: {
                    color: "#666"
                  },
                  label: <strong>1200m</strong>
                }
              }}
              defaultValue={200}
              min={25}
              max={1200}
              step={25}
              onChange={(v => {
                $("#distance").html(v);
                this.setState({ distance: v });
              }).bind(this)}
            />
          </div>
          <div className="info-item">
            <span>地平线的偏移：</span>
            <span id="ground">0</span>
            <Slider
              tipFormatter={value => {
                return (value >= 50 ? "+" : "") + (value - 50) * 2;
              }}
              marks={{
                0: {
                  style: {
                    color: "#666"
                  },
                  label: <strong>-100</strong>
                },
                100: {
                  style: {
                    color: "#666"
                  },
                  label: <strong>+100</strong>
                }
              }}
              defaultValue={50}
              min={0}
              max={100}
              step={1}
              onChange={(v => {
                $("#ground").html((v >= 50 ? "+" : "") + (v - 50) * 2);
                this.setState({ ground: (v - 50) * 2 });
              }).bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}
