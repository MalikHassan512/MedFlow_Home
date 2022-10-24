import React from "react";
import Svg, { G, Rect, Line } from "react-native-svg";

const SCLogo = ({width = 71, height = 94, topStickColor = '#AB2430',bottomStickColor = '#000000'}) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 71 94">
            <G stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
                <G transform="translate(0.5, 0)">
                    <Rect fillOpacity="0.8" fill={topStickColor} x="12.5" y="14" width="47" height="10" />
                    <Rect fillOpacity="0.8" fill={topStickColor} x="12.5" y="50" width="47" height="10" />
                    <Rect fillOpacity="0.8" fill={topStickColor} x="59.5" y="14" width="10" height="46" />
                    <Rect fillOpacity="0.8" fill={topStickColor} x="0.5" y="1" width="12" height="92" />
                    <Rect fill={bottomStickColor} opacity= {bottomStickColor === "#000000" ? "0.339" : "0.9"} x="32.5" y="27" width="6" height="20" />
                    <Rect fill={bottomStickColor} opacity={bottomStickColor === "#000000" ? "0.339" : "0.9"}  transform="translate(29, 37) rotate(90) translate(-29, -37) " x="26" y="33.5" width="6" height="7" />
                    <Rect fill={bottomStickColor} opacity={bottomStickColor === "#000000" ? "0.339" : "0.9"}  transform="translate(42, 37) rotate(90) translate(-42, -37) " x="39" y="33.5" width="6" height="7" />
                    <Line x1="69.5" y1="60" x2="12.5" y2="60" id="Line" stroke="#979797" strokeWidth="2" opacity="0.328297206" strokeLinecap="square" />
                    <Line x1="59.5" y1="50" x2="12.5" y2="50" id="Line" stroke="#979797" strokeWidth="2" opacity="0.328297206" strokeLinecap="square" />
                    <Line x1="12.5" y1="93" x2="0.5" y2="93" id="Line" stroke="#979797" strokeWidth="2" opacity="0.328297206" strokeLinecap="square" />
                    <Line x1="12.5" y1="1" x2="0.5" y2="1" id="Line" stroke="#979797" strokeWidth="2" opacity="0.328297206" strokeLinecap="square" />
                    <Line x1="38.5" y1="27" x2="32.5" y2="27" id="Line" stroke="#979797" opacity="0.328297206" strokeLinecap="square" />
                    <Line x1="38.5" y1="47" x2="32.5" y2="47" id="Line" stroke="#979797" opacity="0.328297206" strokeLinecap="square" />
                    <Line x1="32.5" y1="40" x2="25.5" y2="40" id="Line" stroke="#979797" opacity="0.328297206" strokeLinecap="square" />
                    <Line x1="45.5" y1="40" x2="38.5" y2="40" id="Line" stroke="#979797" opacity="0.328297206" strokeLinecap="square" />
                    <Line x1="45.5" y1="34" x2="38.5" y2="34" id="Line" stroke="#979797" opacity="0.328297206" strokeLinecap="square" />
                    <Line x1="32.5" y1="34" x2="25.5" y2="34" id="Line" stroke="#979797" opacity="0.328297206" strokeLinecap="square" />
                    <Line x1="28.5" y1="37" x2="22.5" y2="37" id="Line" stroke="#979797" opacity="0.328297206" strokeLinecap="square" transform="translate(25.500000, 37) rotate(-90) translate(-25.500000, -37) " />
                    <Line x1="48.5" y1="37" x2="42.5" y2="37" id="Line" stroke="#979797" opacity="0.328297206" strokeLinecap="square" transform="translate(45.500000, 37) rotate(-90) translate(-45.500000, -37) " />
                    <Line x1="42" y1="30.5" x2="35" y2="30.5" id="Line" stroke="#979797" opacity="0.328297206" strokeLinecap="square" transform="translate(38.500000, 30.500000) rotate(-90) translate(-38.500000, -30.500000) " />
                    <Line x1="36" y1="30.5" x2="29" y2="30.5" id="Line" stroke="#979797" opacity="0.328297206" strokeLinecap="square" transform="translate(32.500000, 30.500000) rotate(-90) translate(-32.500000, -30.500000) " />
                    <Line x1="36" y1="43.5" x2="29" y2="43.5" id="Line" stroke="#979797" opacity="0.328297206" strokeLinecap="square" transform="translate(32.500000, 43.500000) rotate(-90) translate(-32.500000, -43.500000) " />
                    <Line x1="42" y1="43.5" x2="35" y2="43.5" id="Line" stroke="#979797" opacity="0.328297206" strokeLinecap="square" transform="translate(38.500000, 43.500000) rotate(-90) translate(-38.500000, -43.500000) " />
                    <Line x1="59.5" y1="24" x2="12.5" y2="24" id="Line" stroke="#979797" strokeWidth="2" opacity="0.328297206" strokeLinecap="square" />
                    <Line x1="69.5" y1="14" x2="12.5" y2="14" id="Line" stroke="#979797" strokeWidth="2" opacity="0.328297206" strokeLinecap="square" />
                    <Line x1="46.5" y1="47" x2="-45.5" y2="47" id="Line" stroke="#979797" strokeWidth="2" opacity="0.328297206" strokeLinecap="square" transform="translate(0.500000, 47) rotate(-90) translate(-0.500000, -47) " />
                    <Line x1="25.5" y1="37" x2="-0.5" y2="37" id="Line" stroke="#979797" strokeWidth="2" opacity="0.328297206" strokeLinecap="square" transform="translate(12.500000, 37) rotate(-90) translate(-12.500000, -37) " />
                    <Line x1="72.5" y1="37" x2="46.5" y2="37" id="Line" stroke="#979797" strokeWidth="2" opacity="0.328297206" strokeLinecap="square" transform="translate(59.500000, 37) rotate(-90) translate(-59.500000, -37) " />
                    <Line x1="19" y1="7.5" x2="6" y2="7.5" id="Line" stroke="#979797" strokeWidth="2" opacity="0.328297206" strokeLinecap="square" transform="translate(12.500000, 7.500000) rotate(-90) translate(-12.500000, -7.500000) " />
                    <Line x1="92.5" y1="37" x2="46.5" y2="37" id="Line" stroke="#979797" strokeWidth="2" opacity="0.328297206" strokeLinecap="square" transform="translate(69.500000, 37) rotate(-90) translate(-69.500000, -37) " />
                    <Line x1="29" y1="76.5" x2="-4" y2="76.5" id="Line" stroke="#979797" strokeWidth="2" opacity="0.328297206" strokeLinecap="square" transform="translate(12.500000, 76.500000) rotate(-90) translate(-12.500000, -76.500000) " />
                </G>
            </G>
        </Svg>
    )
}

export default SCLogo;