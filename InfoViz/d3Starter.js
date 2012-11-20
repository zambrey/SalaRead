/**
 * @author Ameya
 */
function starter() {
	var margin = {
		top : 40,
		right : 40,
		bottom : 40,
		left : 40
	}, width = 960, height = 500;
	
	d3.csv("salaryTech2011.csv", function(data) {
		data = data.filter(function(d) {
			return d.Title = "PROFESSOR";
		});
		data.forEach(function(d) {
			d.Salary = parseFloat(d.Salary.substr(2, d.Salary.length - 2).replace(',', ''));

		})
		/*var area = d3.svg.area().x(function(d) {
			return x(d.Title);
		}).y0(y.range()[0]).y1(function(d) {
			return y(d.Salary);
		});*/
		var x = d3.scale.ordinal().range([0, width - margin.left - margin.right]);

		var y = d3.scale.linear().domain([0, d3.max(data, function(d) {
			return d.Salary;
		})]).nice().range([height - margin.top - margin.bottom, 0]);

		var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(8);

		var yAxis = d3.svg.axis().scale(y).orient("right").tickPadding(8);

		//x.domain(d3.extent(data, function(d) {return d.Title;}));
		
		var svg = d3.select("body").append("svg").datum(data).attr("width", width).attr("height", height).attr("class", "time chart").append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + y.range()[0] + ")").call(xAxis);

		svg.append("g").attr("class", "y axis").attr("transform", "translate(" + x.range()[1] + ")").call(yAxis);

		//svg.append("path").attr("class", "area").attr("d", area);
		//data.sort(function(a,b) {return b.Salary-a.Salary;});
		/*data.forEach(function(d) {
		d3.select("#viz").append("p").text(d.Name + "         " +d.Title+"		"+d.Salary.toString());
		})*/
		//d3.select("#viz").append("p").text("Data loaded");
	})
}
