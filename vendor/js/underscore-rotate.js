/**
 * Underscore function to rotate an array
 * See also _.cycle https://gist.github.com/901648
 * 
 * _.rotate([1, 2, 3, 4, 5]);
 * => [2, 3, 4, 5, 1]
 * _.rotate([1, 2, 3, 4, 5], 3);
 * => [4, 5, 1, 2, 3]
 * _.rotate([1, 2, 3, 4, 5], -3);
 * => [3, 4, 5, 1, 2]
 * _.rotate([1, 2, 3, 4, 5], 6);
 * => [2, 3, 4, 5, 1]
*/

_.mixin({
    rotate: function(array, n, guard) {
	var head, tail;
        n = (n == null) || guard ? 1 : n;
        n = n % array.length;
        tail = array.slice(n);
	head = array.slice(0, n);
	return tail.concat(head);
    }
});