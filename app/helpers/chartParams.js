export const chartOptions = {
	animation: false,
    scaleShowGridLines: true,
    scaleShowVerticalLines: true,
    scaleShowHorizontalLines: true,
    showTooltips: false
};

export function emptyChart(foo,labels) {
	return {
		labels: labels,
		datasets: [
			{
            label: "empty data set",
            fillColor: "rgba(220,220,220,0)",
            strokeColor: "rgba(220,220,220,0)",
            pointColor: "rgba(220,220,220,0)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: foo
    		}
		]
	}
}


export var stockDatasetSkeleton = {
            label: "stock data set",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)"
}