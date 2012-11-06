/**
 * @author Ameya
 */
function starter(){
	d3.csv("salaryTech2011.csv",function(data){
                     data = data.filter(function(d) {
                        return d.Title == "PROFESSOR";
                    });
                     data.forEach(function(d){
                        d3.select("#viz").append("p").text(d.Name+"         "+d.Salary.substr(2,d.Salary.length-2));})
                    }
                )
}
