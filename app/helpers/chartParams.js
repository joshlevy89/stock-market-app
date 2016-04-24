var colormap = require('colormap');
var options = {
  colormap: 'jet',   // pick a builtin colormap or add your own 
  nshades: 15,       // how many divisions 
  format: 'rgbaString'     // "hex" or "rgb" or "rgbaString" 
}
var mycolormap = colormap(options)

function getColor(num) {
    if (num > 10) num--;
    var ind = (num % 10) * 2;
    return mycolormap[ind]
}


export const chartOptions = {
	animation: false,
    scaleShowGridLines: true,
    scaleShowVerticalLines: true,
    scaleShowHorizontalLines: true,
    showTooltips: true,
    pointDot: false,
    scaleLabel: function (valuePayload) {
    return Number(valuePayload.value) + '%';
    }
};

export function emptyChart(foo,labels) {
	return {
		labels: labels,
		datasets: [
			{
            label: "empty data set",
            fillColor: "rgba(0,0,0,0)",
            strokeColor: "rgb(150,150,180)",
            pointColor: "rgb(150,150,180)",
            pointStrokeColor: "rgb(150,150,180)",
            pointHighlightFill: "rgb(150,150,180)",
            pointHighlightStroke: "rgb(150,150,180)",
            data: foo
    		}
		]
	}
}


export function stockDatasetSkeleton(num) {
    return {
    label: "",
    fillColor: "rgba(0,0,0,0)",
    strokeColor: getColor(num),
    pointColor: getColor(num),
    pointStrokeColor: getColor(num),
    pointHighlightFill: getColor(num),
    pointHighlightStroke: getColor(num),
    }
}