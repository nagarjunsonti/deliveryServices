export const TOWNS_LIST = ["A", "B", "C", "D", "E", "F"];
export const TOWNS_PATHS_COST = [ 
								{ A: [ {city:"B", cost:1}, {city:"C", cost:4}, {city:"D", cost:10} ] },
	                            { B: [ {city:"E", cost:3}] },
	                            { C: [ {city:"D", cost:4}, {city:"F", cost:2} ] },
	                            { D: [ {city:"E", cost:1} ] },
	                            { E: [ {city:"B", cost:3}, {city:"A", cost:2} ] },
	                            { F: [ {city:"D", cost:1} ] }
                          	];
export const APPLICATION_TITLE = "Delivery​ ​Service";
export const APPLICATION_SUBTITLE = "You define, We construct";
export const NEIGHBOR_TOWN_ERROR_TEXT = "Selected town shouldn't same to neighbor towns";
export const PATH_NOTAVAILABLE_ERROR_TEXT = "Route is not available through selected mid point"
export const DROP_TEXT = "Drop:";
export const EXACT_ROUTE_COST_TEXT = "Cost for exact delivery route: ";
export const BEST_ROUTE_COST_TEXT = "Best cost for selected Route: ";
export const CHEPEAST_ROUTE_COST_TEXT = "The cost of cheapest delivery route";
export const COST_TEXT = "Cost:";
export const MAXIMUM_4STOP_TEXT = "Maximum of 4 stop without using the same route twice in a delivery route.";
export const ALL_POSIBLE_ROUTES = "The number of possible delivery route, without using the same route twice.";
export const POSIBLE_ROUTES_20LESS = "The number of possible delivery route, that delivery cost is less than 20.";


